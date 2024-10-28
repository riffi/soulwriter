import React, {ReactNode} from "react";
import {ViewMode} from "@shared/model/types.ts";

export interface IInlineTextAreaProps{
    value?: string
    onChange?: (val?: string) => void
    prefix?: ReactNode
    defaultMode?: ViewMode,
    iconStyle?: React.CSSProperties
}


