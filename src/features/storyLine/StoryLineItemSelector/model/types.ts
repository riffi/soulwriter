import {IStoryLineItem} from "@entities/StoryLine/models/types.ts";

export interface IStoryLineItemsSelectorProps{
    bookId: number
    onSelect?: (item: IStoryLineItem) => void
    excludeItemIds?: number[]
    onClose?: () => void
    sceneId: number
}

