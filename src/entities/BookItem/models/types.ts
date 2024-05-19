export interface IBookItem{
    id?: number
    bookId: number
    title: string
    description: string
    parentId: number
    type: string
    childCount?: number
}
