import {IStoryLine} from "@entities/StoryLine/models/types.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {ICharacter} from "@entities/Character";

export const useStoryLineCharacters = (storyLine: IStoryLine) => {
    const storyLineCharacters = useLiveQuery(() => db.storyLineCharacters
        .where("storyLineId")
        .equals(storyLine.id!).toArray(), [storyLine]
    )

    const storyLineCharactersIds = useLiveQuery(() => {
        if (!storyLineCharacters) return
        return storyLineCharacters?.map(c => c.characterId)
    }, [storyLineCharacters])

    const characterList = useLiveQuery(() => {
        if (!storyLineCharactersIds) return
        return db.characters
            .where("id")
            .anyOf(storyLineCharactersIds)
            .toArray()
    }, [storyLineCharactersIds])

    const addCharacter = (character: ICharacter) => {
        db.storyLineCharacters.add({
            characterId: character.id,
            storyLineId: storyLine.id!
        })
    }

    const removeCharacter = (character: ICharacter) => {
        db.storyLineCharacters
            .where("storyLineId")
            .equals(storyLine.id!)
            .and((sc) => sc.characterId === character.id)
            .delete()
    }

    return {
        storyLineCharactersIds,
        characterList,
        removeCharacter,
        addCharacter
    }
}