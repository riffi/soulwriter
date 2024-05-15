import {ReactNode} from "react";

export interface IInlineEditProps{
    value?: string
    onChange?: (val?: string) => void
    prefix?: ReactNode
}


