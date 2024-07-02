import {IStoryLine} from "@entities/StoryLine/models/types.ts";

export interface IStoryLineItemsProps{
    storyLine: IStoryLine
}

export enum IStoryLineSortKind{
    BY_DATE = 'BY_DATE',
    BY_SORT_ORDER = 'BY_SORT_ORDER',
}
