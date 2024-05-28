import {ReactNode} from "react";
import {ViewMode} from "@shared/model/types.ts";

export interface IInlineDatePickerProps{
    value?: string
    onChange?: (val?: string) => void
    prefix?: ReactNode,
    defaultMode?: ViewMode
}


