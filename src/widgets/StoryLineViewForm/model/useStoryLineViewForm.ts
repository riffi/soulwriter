import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";


export const useStoryLineViewForm = (storyLineId: number) => {
    const storyLine = useLiveQuery(() => db.storyLines.get(storyLineId), [storyLineId])

    const changeAttributeValue = (attributeName: string, newValue: string) => {
        if (storyLine){
            storyLine[attributeName] = newValue
            db.storyLines.update(storyLineId, {...storyLine})
        }
    }

    return {
        storyLine,
        changeAttributeValue
    }
}
