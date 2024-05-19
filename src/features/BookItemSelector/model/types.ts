
export interface BookItemSelectorProps{
    bookId: number
    parentBookItemId: number
    title?: string
    actionTitle?: string
    onSelect: (bookItemId: number) => void
}