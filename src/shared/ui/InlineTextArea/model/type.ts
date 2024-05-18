import {ReactNode} from "react";

export interface IInlineTextAreaProps{
    value?: string
    onChange?: (val?: string) => void
    prefix?: ReactNode
}


