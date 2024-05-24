import {IBookItem} from "../../BookItem";
import {ICharacterLink} from "@entities/Character";

export interface IScene{
    id?: number
    title: string
    description: string
    body: string
    bookId: number
    sortOrderId: number
    symbolCount?: number
    dayStart?: number
    dayEnd?: number
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
    title: string
    bookItemData?: IBookItem
    sceneData?: IScene,
    characterLinks?: ICharacterLink[]
}
