import {ReactNode} from "react";
import {ViewMode} from "@shared/model/types.ts";

export interface IInlineEditProps{
    value?: string
    onChange?: (val?: string) => void
    prefix?: ReactNode,
    defaultMode?: ViewMode
}


