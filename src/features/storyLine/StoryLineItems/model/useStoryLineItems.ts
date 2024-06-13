import {IStoryLine, IStoryLineItem} from "@entities/StoryLine/models/types.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";

export const useStoryLineItems = (storyLine: IStoryLine) => {
    const storyLineItemsFull = useLiveQuery(async () => {

        const storyLineItems = await db.storyLineItems
            .where('storyLineId')
            .equals(storyLine.id!)
            .toArray()

        // Добавляем информацию по сценам
        await Promise.all (storyLineItems?.map (async item => {
            if (item.sceneId){
                [item.sceneData] = await Promise.all([
                    db.scenes.get(item.sceneId)
                ]);
            }
        }))

        return storyLineItems.sort((a,b) => {
            return a.sceneData?.dayStart - b.sceneData?.dayStart
        })

    }, [storyLine])

    const save = async (storyLineItemData: IStoryLineItem) => {
        const dataToSave = {...storyLineItemData}

        dataToSave.sceneData = undefined

        if (dataToSave.id){
            return db.storyLineItems.update(dataToSave.id, {...dataToSave})
        }
        else{
            return db.storyLineItems.add(dataToSave);
        }
    }


    return {
        storyLineItemsFull,
        save
    }
}
