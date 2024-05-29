import {IStoryLineItem} from "@entities/StoryLine/models/types.ts";

export interface ISceneStoryLineItemsProps{
    bookId: number
    sceneId: number
    onSelect?: (item: IStoryLineItem) => void
    onDelete?: (item: IStoryLineItem) => void
}