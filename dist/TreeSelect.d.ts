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
    checkIconDict?: {
        all: ReactNode;
        part: ReactNode;
        null: ReactNode;
    };
}
interface TreeSelectProps extends TreeSelectConfig {
    onChange?: (checkedIds: any[]) => void;
    data: any[];
    checkedDataIds: (string | number)[];
    sx?: SxProps;
}
export default function TreeSelect(props: TreeSelectProps): React.JSX.Element;
export {};
