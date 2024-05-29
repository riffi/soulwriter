import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {IStoryLine} from "@entities/StoryLine/models/types.ts";

export const useSceneStoryLineItems = (bookId: number, sceneId: number, selectedStoryLine?: IStoryLine) => {

    const storyLines = useLiveQuery(() => db.storyLines
        .where('bookId')
        .equals(bookId)
        .toArray()
    , [bookId])


    const storyLineItems = useLiveQuery(async () => {
        if (!selectedStoryLine || !selectedStoryLine.id) return

        return db.storyLineItems
            .where('storyLineId')
            .equals(selectedStoryLine.id)
            .toArray()
    }, [selectedStoryLine])

    return {
        storyLines,
        storyLineItems
    }
}