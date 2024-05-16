export interface IBookItem{
    id?: number
    bookId: number
    title: string
    description: string
    parentId: number
    name: string
    isGroup: boolean
    worldId: number
    childrenHeader: string
}
