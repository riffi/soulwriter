import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../entities/Db/model/Db";

export const useCharactersByGroup = (characterGroupId: number) => {

    const characterList = useLiveQuery(async () => db.characters
        .where('groupId')
        .equals(characterGroupId)
        .toArray(),
        [characterGroupId]
    )

    return {
        characterList
    }
}
