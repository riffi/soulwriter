import {IStoryLine, IStoryLineItem} from "@entities/StoryLine/models/types.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {IStoryLineSortKind} from "@features/storyLine/StoryLineItems";

export const useStoryLineItems = (storyLine: IStoryLine, sortKind: IStoryLineSortKind) => {
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

        if (sortKind === IStoryLineSortKind.BY_DATE) {
            return [...storyLineItems].sort((a,b) => {
                return a.sceneData?.dayStart - b.sceneData?.dayStart
            })
        }
        else{
            return [...storyLineItems].sort((a,b) => {
                return a.sceneData?.sortOrderId - b.sceneData?.sortOrderId
            })
        }

    }, [storyLine, sortKind])

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
