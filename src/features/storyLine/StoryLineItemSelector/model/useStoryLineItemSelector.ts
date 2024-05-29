import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {IStoryLine} from "@entities/StoryLine/models/types.ts";

export const useStoryLineItemSelector = (bookId: number, selectedStoryLine?: IStoryLine, excludeItemIds: number[]) => {

    const storyLines = useLiveQuery(() => db.storyLines
        .where('bookId')
        .equals(bookId)
        .toArray()
    , [bookId])


    const storyLineItems = useLiveQuery(async () => {
        if (!selectedStoryLine || !selectedStoryLine.id) return

        const storyLineItems=  await db.storyLineItems
            .where('storyLineId')
            .equals(selectedStoryLine.id)
            .and((item)=> excludeItemIds ? excludeItemIds.indexOf(item.id!) === -1 : true)
            .toArray()

        // Добавляем информацию по сценам
        await Promise.all (storyLineItems?.map (async item => {
            if (item.sceneId){
                [item.sceneData] = await Promise.all([
                    db.scenes.get(item.sceneId)
                ]);
            }
        }))

        return storyLineItems


    }, [selectedStoryLine])



    return {
        storyLines,
        storyLineItems
    }
}