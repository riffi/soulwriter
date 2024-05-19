import {IBookItem} from "../../BookItem";

export interface IScene{
    id?: number
    title: string
    description: string
    body: string
    bookId: number
    sortOrderId: number
}


export interface ISceneCharacters{
    sceneId: number
    characterId: number
    description: string
}



export interface ISceneLink{
    id?: number
    sceneId: number
    bookId: number
    bookItemId?: number
    type: string
    title: string
    bookItemData?: IBookItem
}