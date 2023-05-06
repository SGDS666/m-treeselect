import { Checkbox, Collapse, List, Stack, SxProps, Typography, useTheme } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";


interface TreeBase {
    fieId: string | number,
    label: string | number,
    sx?: SxProps
}
interface TreeItemProps extends TreeBase {
    checked: boolean,
    onChange?: (id: string | number, value: boolean, other: any) => void
}
const TreeItem: React.FC<TreeItemProps> = (
    {
        fieId,
        label,
        checked,
        sx,
        onChange
    }
) => {
    return (
        <Stack direction="row" sx={sx} alignItems="center">
            <Checkbox checked={checked} onChange={
                (e, checked) => {

                    onChange?.(fieId, checked, {})

                }
            } />
            <Typography>{label}</Typography>
        </Stack>
    )
}
interface TreeFolderProps extends TreeBase {
    checked: "part" | "all" | "null",
    children: {
        [key: string | number]: any
    }[]
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
    checkedDataIds?: any[],
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
            if (checkedDataIds?.includes?.(item[id])) {
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
        children,
        sx,
        onChange,
        onChildChange,
    }
) => {
    const { id, labelId, childrenId, checkIconDict, ExpandICON, RetractICON, FolderICON } = useContext(TreeSelectContext)
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
                    onChange={
                        (e, checked) => {
                            if (checked) { //全选
                                onChange?.(fieId, "all", { children })
                            } else {
                                onChange?.(fieId, "null", { children })
                            }

                        }
                    } />
                <Typography>{label}</Typography>


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
    checkIconDict?: {
        all: ReactNode,
        part: ReactNode,
        null: ReactNode
    }
}

interface TreeSelectProps extends TreeSelectConfig {
    onChange?: (checkedIds: any[]) => void,
    data: any[],
    checkedDataIds: (string | number)[],
    sx?: SxProps
}

const deepForEach = (data: any[], action: (item: any) => void, childrenId: string | number) => {
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
        ExpandICON, RetractICON
    } = props
    const TreeData = createTreeData(data, {
        id,
        labelId,
        childrenId,
        checkedDataIds
    })
    const checkIconDict = useMemo(() => {
        return {
            "all": CheckAllICON ?? <CheckBoxIcon />,
            "part": CheckPartICON ?? <IndeterminateCheckBoxIcon />,
            "null": <CheckBoxOutlineBlankIcon />
        }
    }, [CheckAllICON, CheckPartICON])

    const theme = useTheme()
    return (
        <TreeSelectContext.Provider value={{
            id, labelId, childrenId,
            FolderICON, CheckPartICON, CheckAllICON,
            ExpandICON, RetractICON, checkIconDict
        }}>

            <List sx={{
                bgcolor: theme.palette.background.default,
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
                                        onChange?.([...new Set([...checkedDataIds, ...newChecked])])
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
                                            onChange?.(newChecked)
                                        }, childrenId)
                                    }


                                }}
                                onChildChange={(cid, checked, other) => {

                                    if (checked === true) {
                                        onChange?.([...checkedDataIds, cid])
                                    } else {
                                        const newChecked = [...checkedDataIds]
                                        const index = newChecked.indexOf(cid)
                                        newChecked.splice(index, 1)
                                        onChange?.(newChecked)

                                    }
                                }}
                            />
                        } else {
                            return <TreeItem
                                key={item[id]}
                                fieId={item[id]}
                                label={item[labelId]}
                                checked={item.checked}
                                sx={{ pl: 3 }}
                                onChange={(cid, checked, other) => {
                                    // console.log(cid, checked, other)
                                    if (checked === true) {
                                        onChange?.([...checkedDataIds, cid])
                                    } else {
                                        const newChecked = [...checkedDataIds]
                                        const index = newChecked.indexOf(cid)
                                        newChecked.splice(index, 1)
                                        onChange?.(newChecked)
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
