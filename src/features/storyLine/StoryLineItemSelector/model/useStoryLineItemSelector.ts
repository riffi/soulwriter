import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {IStoryLine, IStoryLineItem} from "@entities/StoryLine/models/types.ts";

export const useStoryLineItemSelector = (bookId: number, selectedStoryLine?: IStoryLine, excludeItemIds: number[]) => {

    const storyLines = useLiveQuery(async () =>{
        const storyLines = await db.storyLines
            .where("bookId")
            .equals(bookId)
            .toArray()

        // Добавляем информацию по сценам
        await Promise.all (storyLines?.map (async storyLine => {
            const storyLineCharacters = await db.storyLineCharacters
                .where("storyLineId")
                .equals(storyLine.id!)
                .toArray()

            const storyLineCharactersIds = storyLineCharacters.map((c) => c.characterId)


            storyLine.characters = await db.characters
                .where("id")
                .anyOf(storyLineCharactersIds)
                .toArray()

            return storyLine
        }))

        return storyLines
    } , [bookId])


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
        storyLines,
        storyLineItems,
        save
    }
}
