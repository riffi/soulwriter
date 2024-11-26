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

export enum VerityType{
    TRUE = 'TRUE',
    FALSE = 'FALSE'
}


export interface IKnowledge {
    id: number
    bookItemId: number
    title: string
    verity: VerityType
}

export interface IKnowledgeLink {
    id: number
    knowledgeId: number
    title: string
    sceneId: number
    characterId: number
}
