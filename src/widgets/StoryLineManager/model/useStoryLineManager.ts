import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {IStoryLine} from "@entities/StoryLine/models/types.ts";

export const useStoryLineManager = (bookId: number) => {
    const storyLines = useLiveQuery(() => db.storyLines
        .where("bookId")
        .equals(bookId)
        .toArray(), [bookId]
    )

    const onSaveNewStoryLine = (title: string) => {
        const storyLine: IStoryLine = {
            title: title,
            bookId: bookId,
            description: ''
        }
        db.storyLines.add(storyLine)
    }

    return {
        storyLines,
        onSaveNewStoryLine
    }
}
