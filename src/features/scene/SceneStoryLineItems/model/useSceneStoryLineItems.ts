import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {IStoryLineItem} from "@entities/StoryLine/models/types.ts";

export const useSceneStoryLineItems = (bookId: number, sceneId: number) => {


    const storyLineItems = useLiveQuery(async () => {
             return db.storyLineItems
            .where('sceneId')
            .equals(sceneId)
            .toArray()
    }, [sceneId])

    const addItem = (storyLineItem: IStoryLineItem) => {
        db.storyLineItems.update(storyLineItem.id, {sceneId: sceneId})
    }

    const removeItem = (storyLineItem: IStoryLineItem) => {
        db.storyLineItems.update(storyLineItem.id, {sceneId: undefined})
    }

    return {
        storyLineItems,
        addItem,
        removeItem
    }
}