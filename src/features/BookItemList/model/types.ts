export enum BookItemListMode{
    CHILDREN = 'CHILDREN',
    SEARCH = 'SEARCH'
}
export interface IBookItemListProps{
    parentId: number
    bookId: number
    header: string
    mode: BookItemListMode,
    searchStr?: string
}
