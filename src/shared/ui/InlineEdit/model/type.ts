import {ReactNode} from "react";

export interface IInlineEditProps{
    value?: string
    onChange?: (val?: string) => void
    prefix?: ReactNode
}

export enum ViewMode{
    READ = 'READ',
    WRITE = 'WRITE'
}


