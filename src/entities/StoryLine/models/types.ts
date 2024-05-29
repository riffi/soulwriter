import {IEnumerable} from "@shared/model/types.ts";
import {IScene} from "@entities/Scene";


export interface IStoryLine extends IEnumerable{
    id?: number
    bookId: number
    title: string
    description: string
}

export interface IStoryLineCharacter{
    storyLineId: number
    characterId: number,
}

export interface IStoryLineItem{
    id?: number
    storyLineId: number
    title: string
    sceneId?: number
    sceneData?: IScene
}

