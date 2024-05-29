import {IStoryLineItem} from "@entities/StoryLine/models/types.ts";

export interface IEditStoryLineItemFormProps{
    bookId: number
    storyLineItem: IStoryLineItem,
    onCancel: () => void
    onDelete: (item: IStoryLineItem) => void
    onSave: (item: IStoryLineItem) => Promise<void>
}