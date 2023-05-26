import { SxProps } from "@mui/material";
import React, { ReactNode } from "react";
export interface TreeSelectConfig {
    id?: string | number;
    labelId?: string | number;
    childrenId?: string | number;
    autoExpand?: true;
    defaultExpandAll?: true;
    FolderICON?: ReactNode;
    CheckPartICON?: ReactNode;
    CheckAllICON?: ReactNode;
    ExpandICON?: ReactNode;
    RetractICON?: ReactNode;
    labelRender?: ({ field, label, checked, disabled, }: {
        field: string | number;
        label: string | number;
        checked: boolean;
        disabled?: boolean;
    }) => ReactNode;
    checkIconDict?: {
        all: ReactNode;
        part: ReactNode;
        null: ReactNode;
    };
}
export interface TreeSelectProps extends TreeSelectConfig {
    onChange?: (checkedIds: any[], checkedItems?: any[]) => void;
    data: any[];
    checkedDataIds: (string | number)[];
    sx?: SxProps;
}
export declare const deepForEach: (data: any[], action: (item: any) => void, childrenId: string | number) => void;
export default function TreeSelect(props: TreeSelectProps): React.JSX.Element;
export declare const flatDataFormatter: (list: any[], config: {
    isFolder: (item: any) => boolean;
    isItParent: (Claimant: any, child: any) => boolean;
    isHaveParents: (item: any) => boolean;
}) => any[];
