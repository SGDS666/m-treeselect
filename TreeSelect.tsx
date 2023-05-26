import { Checkbox, Collapse, List, Stack, SxProps, Typography, useTheme } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface TreeBase {
    field: string | number,
    label: string | number,

    sx?: SxProps
}
interface TreeItemProps extends TreeBase {
    checked: boolean,
    disabled?: boolean
    onChange?: (id: string | number, value: boolean, other: any) => void
}

const TreeItem: React.FC<TreeItemProps> = (
    {
        field,
        label,
        checked,
        disabled,
        sx,
        onChange
    }
) => {
    const { labelRender } = useContext(TreeSelectContext)
    return (
        <Stack direction="row" sx={sx} alignItems="center">
            <ExpandLess sx={{ contentVisibility: "hidden" }} />
            <Checkbox size="small" disabled={disabled} checked={checked} onChange={
                (e, checked) => {

                    onChange?.(field, checked, {})

                }
            } />
            {labelRender ? labelRender({
                field,
                label,
                checked,
                disabled,
            }) : <Typography>{label}</Typography>}

        </Stack>
    )
}
interface TreeFolderProps extends TreeBase {
    checked: "part" | "all" | "null",
    children: {
        [key: string | number]: any
    }[],
    disabled?: boolean,
    onChange?: (id: string | number, value: TreeFolderProps["checked"], other: any) => void
    onChildChange?: (id: string | number, value: boolean, other: any) => void
}

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

        if (item[childrenId]?.length > 0) {
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
        field,
        checked,
        disabled,
        children,
        sx,
        onChange,
        onChildChange,
    }
) => {
    const {
        id, labelId, childrenId, autoExpand, defaultExpandAll,
        checkIconDict, ExpandICON, RetractICON,
        FolderICON, labelRender } = useContext(TreeSelectContext)
    const [collapse, setCollapse] = useState(defaultExpandAll ?? false)
    // console.log({ checkIconDict, checked, children, field })
    useEffect(() => {
        if (autoExpand) {
            if (checked !== "null") {
                setCollapse(true)
            }
        }

    }, [autoExpand, checked])
    return (
        <Stack sx={sx} >
            <Stack direction="row" alignItems="center" >
                {<div
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={() => setCollapse(!collapse)}>
                    {collapse ? RetractICON ?? <ExpandLess /> : ExpandICON ?? <ExpandMore />}
                </div>}
                <Checkbox
                    size="small"
                    checked={checked === "all" ? true : false}
                    icon={FolderICON}
                    checkedIcon={
                        checkIconDict?.[checked]
                    }
                    disabled={disabled || children.length <= 1}
                    onChange={
                        (e, checked) => {
                            if (checked) { //全选
                                onChange?.(field, "all", { children })
                            } else {
                                onChange?.(field, "null", { children })
                            }

                        }
                    } />
                {labelRender ? labelRender({
                    field,
                    label,
                    checked: checked == "null" ? false : true,
                    disabled
                }) : <Typography>{label}</Typography>}



            </Stack>

            <Collapse in={collapse} sx={{ pl: 2, display: "felx", height: "36", }}>
                <div>
                    {
                        children?.map(item => {
                            if (item[childrenId as string | number]?.length) {
                                // console.log({ item })
                                return (
                                    <TreeFolder
                                        key={item[id as string | number]}
                                        field={item[id as string | number]}
                                        label={item[labelId as string | number]}
                                        checked={item.checked as "all" | "part" | "null"}
                                        children={item[childrenId as string | number]}
                                        onChange={onChange}
                                        disabled={item.disabled}
                                        onChildChange={onChildChange}

                                    />
                                )
                            } else {

                                return (
                                    <TreeItem
                                        key={item[id as string | number]}
                                        field={item[id as string | number]}
                                        label={item[labelId as string | number]}
                                        checked={item.checked as boolean}
                                        disabled={item.disabled}
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

export interface TreeSelectConfig {
    id?: string | number
    labelId?: string | number,
    childrenId?: string | number,
    autoExpand?: true,
    defaultExpandAll?: true,
    FolderICON?: ReactNode,
    CheckPartICON?: ReactNode,
    CheckAllICON?: ReactNode,
    ExpandICON?: ReactNode,
    RetractICON?: ReactNode,
    labelRender?: ({
        field,
        label,
        checked,
        disabled, }: {
            field: string | number,
            label: string | number,
            checked: boolean,
            disabled?: boolean,
        }) => ReactNode
    checkIconDict?: {
        all: ReactNode,
        part: ReactNode,
        null: ReactNode
    }
}

export interface TreeSelectProps extends TreeSelectConfig {
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
        FolderICON, CheckPartICON, CheckAllICON, autoExpand,
        ExpandICON, RetractICON, labelRender, defaultExpandAll
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
                checkedItems.push({ [id]: item[id], [labelId]: item[labelId], extra: item.extra })
            }
        }, childrenId)
        { onChange?.(checkedids, checkedItems) }
    }, [TreeData, childrenId, id, labelId, onChange])

    return (
        <TreeSelectContext.Provider value={{
            id, labelId, childrenId, autoExpand,
            FolderICON, CheckPartICON, CheckAllICON, defaultExpandAll,
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
                                field={item[id]}
                                label={item[labelId]}
                                children={item[childrenId]}
                                checked={item.checked}
                                disabled={item.disabled}
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

                                        }, childrenId)
                                        onChangeHandle?.(newChecked)
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
                                field={item[id]}
                                label={item[labelId]}
                                checked={item.checked}
                                disabled={item.disabled}

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


export const flatDataFormatter = (list: any[],
    config: {
        isFolder: (item: any) => boolean,
        isItParent: (Claimant: any, child: any) => boolean,
        isHaveParents: (item: any) => boolean
    }
) => {
    const { isFolder, isItParent, isHaveParents } = config

    if (!list.length) {
        return
    }
    //扁平化数据转嵌套数据
    const folders: any = []
    const items: any = []
    list.forEach(item => {
        if (isFolder(item)) {
            folders.push({ ...item, children: [] })
        } else {
            items.push(item)
        }
    })
    folders.forEach((folder: any) => {
        items.forEach((item: any) => {
            if (isItParent(folder, item)) {
                folder.children.push(item)
            }
        })
    })
    const folderarr: any[] = [...folders]
    const checkfolder = (folderArr: any[] = folderarr) => {
        folderArr.forEach(folder1 => {
            folderArr.forEach(folder2 => {
                if (isItParent(folder1, folder2)) {
                    folder1.children.push(folder2)
                }

            })
        })

    }
    checkfolder(folderarr)
    const Treelist: any[] = []
    folderarr.forEach(folder => {
        if (!isHaveParents(folder)) {
            Treelist.push(folder)
        }
    })
    items.forEach((item: any) => {
        if (!isHaveParents(item)) {
            Treelist.push(item)
        }
    })
    console.log({ Treelist })
    return Treelist




}