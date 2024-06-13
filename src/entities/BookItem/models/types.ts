export interface IBookItem{
    id?: number
    bookId: number
    title: string
    description: string
    parentId: number
    type: string
    sortOrderId?: number
    childCount?: number
    iconName?: string
    needMention?: boolean,
    image?: string
}

export enum IBookItemShiftDirection{
    UP = 'UP',
    DOWN = 'DOWN'
}
