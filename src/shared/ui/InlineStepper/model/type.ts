import {ReactNode} from "react";

export interface IInlineStepperProps{
    value?: number
    onChange?: (val: number) => void
    prefix?: ReactNode
}


