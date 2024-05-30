import {IEnumerable} from "@shared/model/types.ts";
import {IScene} from "@entities/Scene";
import {ICharacter} from "@entities/Character";


export interface IStoryLine extends IEnumerable{
    id?: number
    bookId: number
    title: string
    description: string,
    characters?: ICharacter[]
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
    sceneData?: IScene,
    storyLineData?: IStoryLine
}

