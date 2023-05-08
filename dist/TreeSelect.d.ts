import { SxProps } from "@mui/material";
import React, { ReactNode } from "react";
interface TreeSelectConfig {
    id?: string | number;
    labelId?: string | number;
    childrenId?: string | number;
    FolderICON?: ReactNode;
    CheckPartICON?: ReactNode;
    CheckAllICON?: ReactNode;
    ExpandICON?: ReactNode;
    RetractICON?: ReactNode;
    labelRender?: (label: string | number) => ReactNode;
    checkIconDict?: {
        all: ReactNode;
        part: ReactNode;
        null: ReactNode;
    };
}
interface TreeSelectProps extends TreeSelectConfig {
    onChange?: (checkedIds: any[], checkedItems?: any[]) => void;
    data: any[];
    checkedDataIds: (string | number)[];
    sx?: SxProps;
}
export declare const deepForEach: (data: any[], action: (item: any) => void, childrenId: string | number) => void;
export default function TreeSelect(props: TreeSelectProps): React.JSX.Element;
export {};
