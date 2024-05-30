import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {IStoryLineItem} from "@entities/StoryLine/models/types.ts";

export const useSceneStoryLineItems = (bookId: number, sceneId: number) => {


    const storyLineItems = useLiveQuery(async () => {
        const items = await db.storyLineItems
            .where('sceneId')
            .equals(sceneId)
            .toArray()

        // Добавляем информацию по линиям сюжета
        await Promise.all (items?.map (async item => {
            if (item.sceneId){
                item.storyLineData = await db.storyLines.get(item.storyLineId)

                if (item.storyLineData){
                    const storyLineChars = await db.storyLineCharacters
                        .where('storyLineId')
                        .equals(item.storyLineData.id!)
                        .toArray()
                    const storyLineCharsIds = storyLineChars.map((c) => c.characterId)


                    item.storyLineData.characters = await db.characters
                        .where("id")
                        .anyOf(storyLineCharsIds)
                        .toArray()
                }
            }
        }))

        return items

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
