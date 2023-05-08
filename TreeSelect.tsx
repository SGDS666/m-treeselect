import { Checkbox, Collapse, List, Stack, SxProps, Typography, useTheme } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

interface TreeBase {
    fieId: string | number,
    label: string | number,

    sx?: SxProps
}
interface TreeItemProps extends TreeBase {
    checked: boolean,
    disable?: boolean
    onChange?: (id: string | number, value: boolean, other: any) => void
}
const TreeItem: React.FC<TreeItemProps> = (
    {
        fieId,
        label,
        checked,
        disable,
        sx,
        onChange
    }
) => {
    const { labelRender } = useContext(TreeSelectContext)
    return (
        <Stack direction="row" sx={sx} alignItems="center">
            <Checkbox disabled={disable} checked={checked} onChange={
                (e, checked) => {

                    onChange?.(fieId, checked, {})

                }
            } />
            {labelRender ? labelRender(label) : <Typography>{label}</Typography>}

        </Stack>
    )
}
interface TreeFolderProps extends TreeBase {
    checked: "part" | "all" | "null",
    children: {
        [key: string | number]: any
    }[],
    disable?: boolean,
    onChange?: (id: string | number, value: TreeFolderProps["checked"], other: any) => void
    onChildChange?: (id: string | number, value: boolean, other: any) => void
}



// const createFolder = (children: any[]) => {
//   const newFolder: any[] = []
//   children.forEach(item => {

//     if (item[childrenId]) {
//       const newChildren = createFolder(item[childrenId])
//       newFolder.push({ ...item, children: newChildren, checked: "part" })
//     } else {
//       newFolder.push({ ...item, checked: false })
//     }
//   })
//   return newFolder
// }
const createTreeData = (datalist: any[], config: {
    id: string | number
    labelId: string | number
    childrenId: string | number
    checkedDataIds?: (string | number)[],
    selectAll?: boolean
}) => {
    const { id, labelId, childrenId, checkedDataIds, selectAll } = config
    const TreeData: any[] = []
    datalist.forEach(item => {

        if (item[childrenId]?.length) {
            const newfolder = createTreeData(item[childrenId], { id, labelId, childrenId, checkedDataIds, selectAll })
            let selectType: any = undefined

            deepForEach(newfolder, (item) => {
                if (selectType === undefined) { //第一次存储
                    if (typeof item.checked === "boolean") {
                        selectType = item.checked
                    }
                } else {
                    if (typeof item.checked === "boolean") {
                        if (item.checked !== selectType) {
                            selectType = "part"
                        }
                    }
                }


            }, childrenId)

            if (selectType === true) { //全选
                TreeData.push({ ...item, [childrenId]: newfolder, checked: "all" })
            }
            else if (selectType === false) { //全取消
                TreeData.push({ ...item, [childrenId]: newfolder, checked: "null" })
            }
            else {
                TreeData.push({ ...item, [childrenId]: newfolder, checked: "part" })
            }
        }
        else {
            if (checkedDataIds?.includes(item[id])) {
                TreeData.push({ ...item, checked: true })

            } else {
                TreeData.push({ ...item, checked: selectAll ? true : false })
            }

        }
    }
    )
    return TreeData
}
const TreeFolder: React.FC<TreeFolderProps> = (
    {
        label,
        fieId,
        checked,
        disable,
        children,
        sx,
        onChange,
        onChildChange,
    }
) => {
    const {
        id, labelId, childrenId,
        checkIconDict, ExpandICON, RetractICON,
        FolderICON, labelRender } = useContext(TreeSelectContext)
    const [collapse, setCollapse] = useState(false)
    // console.log({ checkIconDict, checked, children, fieId })
    return (
        <Stack sx={sx} >
            <Stack direction="row" alignItems="center" >
                {<div
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={() => setCollapse(!collapse)}>
                    {collapse ? RetractICON ?? <ExpandLess /> : ExpandICON ?? <ExpandMore />}
                </div>}
                <Checkbox
                    checked={checked === "null" ? false : true}
                    icon={FolderICON}
                    checkedIcon={
                        checkIconDict?.[checked]
                    }
                    disabled={disable}
                    onChange={
                        (e, checked) => {
                            if (checked) { //全选
                                onChange?.(fieId, "all", { children })
                            } else {
                                onChange?.(fieId, "null", { children })
                            }

                        }
                    } />
                {labelRender ? labelRender(label) : <Typography>{label}</Typography>}



            </Stack>

            <Collapse in={collapse} timeout="auto" unmountOnExit sx={{ pl: 8, display: "felx", height: "36" }}>
                <div>
                    {
                        children?.map(item => {
                            if (item[childrenId as string | number]?.length) {
                                // console.log({ item })
                                return (
                                    <TreeFolder
                                        key={item[id as string | number]}
                                        fieId={item[id as string | number]}
                                        label={item[labelId as string | number]}
                                        checked={item.checked as "all" | "part" | "null"}
                                        children={item[childrenId as string | number]}
                                        onChange={onChange}
                                        disable={item.disable}
                                        onChildChange={onChildChange}

                                    />
                                )
                            } else {

                                return (
                                    <TreeItem
                                        key={item[id as string | number]}
                                        fieId={item[id as string | number]}
                                        label={item[labelId as string | number]}
                                        checked={item.checked as boolean}
                                        disable={item.disable}
                                        onChange={onChildChange}
                                    />
                                )
                            }
                        })
                    }
                </div>
            </Collapse>
        </Stack>
    )
}

interface TreeSelectConfig {
    id?: string | number
    labelId?: string | number,
    childrenId?: string | number,
    FolderICON?: ReactNode,
    CheckPartICON?: ReactNode,
    CheckAllICON?: ReactNode,
    ExpandICON?: ReactNode,
    RetractICON?: ReactNode,
    labelRender?: (label: string | number) => ReactNode
    checkIconDict?: {
        all: ReactNode,
        part: ReactNode,
        null: ReactNode
    }
}

interface TreeSelectProps extends TreeSelectConfig {
    onChange?: (checkedIds: any[], checkedItems?: any[]) => void,
    data: any[],
    checkedDataIds: (string | number)[],

    sx?: SxProps
}

export const deepForEach = (data: any[], action: (item: any) => void, childrenId: string | number) => {
    data.forEach(item => {
        if (item[childrenId]?.length) {
            deepForEach(item[childrenId], action, childrenId)
        } else {
            action(item)
        }

    })
}

const TreeSelectContext = createContext<TreeSelectConfig>({
    id: "id",
    labelId: "label",
    childrenId: "children",

})
export default function TreeSelect(props: TreeSelectProps) {
    const {
        id = "id", labelId = "label", childrenId = "children", data, checkedDataIds, onChange, sx,
        FolderICON, CheckPartICON, CheckAllICON,
        ExpandICON, RetractICON, labelRender
    } = props
    const TreeData = useMemo(() => {
        return createTreeData(data, {
            id,
            labelId,
            childrenId,
            checkedDataIds
        })
    }, [checkedDataIds, childrenId, data, id, labelId])
    const checkIconDict = useMemo(() => {
        return {
            "all": CheckAllICON ?? <CheckBoxIcon />,
            "part": CheckPartICON ?? <IndeterminateCheckBoxIcon />,
            "null": <CheckBoxOutlineBlankIcon />
        }
    }, [CheckAllICON, CheckPartICON])

    const theme = useTheme()

    const onChangeHandle = useCallback((checkedids: (string | number)[]) => {
        const checkedItems: any[] = []
        deepForEach(TreeData, (item) => {
            if (checkedids.includes(item[id])) {
                checkedItems.push(item)
            }
        }, childrenId)
        onChange?.(checkedids, checkedItems)
    }, [TreeData, childrenId, id, onChange])

    return (
        <TreeSelectContext.Provider value={{
            id, labelId, childrenId,
            FolderICON, CheckPartICON, CheckAllICON,
            ExpandICON, RetractICON, checkIconDict, labelRender
        }}>

            <List sx={{
                bgcolor: theme.palette.background.paper,
                minWidth: 300,
                p: 2,
                borderRadius: 2,
                ...sx
            }}>
                {
                    TreeData.map(item => {
                        if (item[childrenId]) {
                            return <TreeFolder
                                key={item[id]}
                                fieId={item[id]}
                                label={item[labelId]}
                                children={item[childrenId]}
                                checked={item.checked}
                                disable={item.disable}
                                onChange={(cid, checked, other) => {
                                    const { children } = other

                                    if (checked === "all") {
                                        const newChildren = createTreeData(children, {
                                            id,
                                            labelId,
                                            childrenId,
                                            selectAll: true
                                        })
                                        const newChecked: any[] = []

                                        deepForEach(newChildren, (item) => {
                                            if (item.checked === true) {
                                                newChecked.push(item[id])

                                            }
                                        }, childrenId)
                                        onChangeHandle?.([...new Set([...checkedDataIds, ...newChecked])])
                                    } else {
                                        const newChildren = createTreeData(children, {
                                            id,
                                            labelId,
                                            childrenId,
                                        })
                                        const newChecked = [...checkedDataIds]
                                        deepForEach(newChildren, (item) => {
                                            if (newChecked.includes(item[id])) {
                                                const index = newChecked.indexOf(item[id])
                                                newChecked.splice(index, 1)
                                            }
                                            onChangeHandle?.(newChecked)
                                        }, childrenId)
                                    }


                                }}
                                onChildChange={(cid, checked, other) => {

                                    if (checked === true) {
                                        onChangeHandle?.([...checkedDataIds, cid])
                                    } else {
                                        const newChecked = [...checkedDataIds]
                                        const index = newChecked.indexOf(cid)
                                        newChecked.splice(index, 1)
                                        onChangeHandle?.(newChecked)

                                    }
                                }}
                            />
                        } else {
                            ``
                            return <TreeItem
                                key={item[id]}
                                fieId={item[id]}
                                label={item[labelId]}
                                checked={item.checked}
                                disable={item.disable}
                                sx={{ pl: 3 }}
                                onChange={(cid, checked, other) => {
                                    // console.log(cid, checked, other)
                                    if (checked === true) {
                                        onChangeHandle?.([...checkedDataIds, cid])
                                    } else {
                                        const newChecked = [...checkedDataIds]
                                        const index = newChecked.indexOf(cid)
                                        newChecked.splice(index, 1)
                                        onChangeHandle?.(newChecked)
                                    }
                                }}
                            />
                        }
                    })
                }
            </List>
        </TreeSelectContext.Provider>
    )
}
