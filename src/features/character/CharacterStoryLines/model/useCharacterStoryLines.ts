import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {IStoryLine} from "@entities/StoryLine/models/types.ts";

export const useCharacterStoryLines = (characterId: number) => {

    const storyLines = useLiveQuery(async () => {

        const storyLineChars = await db.storyLineCharacters
            .where("characterId")
            .equals(characterId)
            .toArray()

        const storyLineIds = storyLineChars.map(s => s.storyLineId)

        const storyLines  =  await db.storyLines
            .where("id")
            .anyOf(storyLineIds)
            .toArray();

        // Добавляем информацию по персонажам
        return Promise.all(storyLines?.map(async storyLine => {
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


    }, [characterId])


    return {
        storyLines
    }
}
