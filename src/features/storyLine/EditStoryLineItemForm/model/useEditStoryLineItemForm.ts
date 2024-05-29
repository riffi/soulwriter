import {IStoryLineItem} from "@entities/StoryLine/models/types.ts";
import {db} from "@entities/Db/model/Db.ts";
import {useLiveQuery} from "dexie-react-hooks";

export const useEditStoryLineItemForm = (storyLineItem: IStoryLineItem, bookId: number) => {

    const sceneList = useLiveQuery(() => db.scenes
        .where('bookId')
        .equals(bookId)
        .toArray()
    )

    return {
        sceneList
    }
}