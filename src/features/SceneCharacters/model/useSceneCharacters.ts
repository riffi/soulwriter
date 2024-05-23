import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {ICharacter} from "@entities/Character";
import {ISceneCharacters} from "@entities/Scene";

export const useSceneCharacters = (sceneId: number, bookId: number) => {

    console.log('bookId ' + bookId)
    const allCharacters = useLiveQuery(() => db.characters
        .where("bookId")
        .equals(bookId)
        .toArray(), [bookId]
    )

    const sceneCharacters = useLiveQuery(() => db.sceneCharacters
        .where("sceneId")
        .equals(sceneId)
        .toArray(), [sceneId]
    )

    const getSceneCharacterIds = (): number[] => {
        if (sceneCharacters) {
            return sceneCharacters.map(char => char.characterId)
        }
        else return []
    }

    const getSceneCharactersFull = (): ICharacter[] => {
        if (allCharacters && sceneCharacters){
            const charIds = getSceneCharacterIds()
            return allCharacters.filter((char) => charIds.indexOf(char.id) != -1)
        }
        else
            return []
    }

    const onAddCharacterToScene = (sceneCharacter: ISceneCharacters) => {
        db.sceneCharacters.add(sceneCharacter)
    }

    const onRemoveCharacterFromScene = (character: ICharacter) => {
        db.sceneCharacters
            .where("sceneId")
            .equals(sceneId)
            .and((c) => c.characterId === character.id)
            .delete()
    }

    return {
        sceneCharacters,
        allCharacters,
        getSceneCharactersFull,
        onAddCharacterToScene,
        onRemoveCharacterFromScene,
        getSceneCharacterIds
    }
}
