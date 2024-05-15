export interface IInlineSelectorItem{
    value: string,
    label: string
}

export interface IInlineSelectorProps{
    selectedItemValue?: string
    onChange?: (val?: string) => void
    items: IInlineSelectorItem[]
}
