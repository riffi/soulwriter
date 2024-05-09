export interface IInlineSelectorItem{
    value: string,
    label: string
}

export enum ViewMode{
    READ = 'READ',
    WRITE = 'WRITE'
}
export interface IInlineSelectorProps{
    selectedItemValue?: string
    onChange?: (val?: string) => void
    items: IInlineSelectorItem[]
}
