export interface IInlineEditProps{
    value?: string
    onChange?: (val?: string) => void
}

export enum ViewMode{
    READ = 'READ',
    WRITE = 'WRITE'
}


