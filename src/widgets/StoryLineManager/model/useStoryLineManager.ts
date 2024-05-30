import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {IStoryLine} from "@entities/StoryLine/models/types.ts";

export const useStoryLineManager = (bookId: number) => {
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
