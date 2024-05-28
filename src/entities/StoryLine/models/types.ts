import {IEnumerable} from "@shared/model/types.ts";

export interface IStoryLine extends IEnumerable{
    id?: number
    bookId: number
    title: string
    description: string
}

export interface IStoryLineItems{
    id?: number
    storyLineId: number
    title: string
    bookItemId?: number
}
