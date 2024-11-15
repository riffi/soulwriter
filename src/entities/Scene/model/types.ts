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
    stateId?: number
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


export interface ISceneState{
    id?: number
    bookId: number
    title: string
    isDefault: number
    sortOrderId: number
    color: string
}

export interface ISceneCheck{
    id?: number
    bookId: number
    title: string
    sortOrderId: number
    color: string
}

export interface ISceneCheckState{
    id?: number
    sceneCheckId: number
    sceneId: number
    bookId: number
}


export interface ISceneNote{
    id?: number
    sceneId: number
    text: string
}
