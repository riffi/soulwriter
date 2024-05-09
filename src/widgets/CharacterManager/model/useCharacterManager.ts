import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../entities/Db/model/Db";

export const useCharactersManager= () => {

    const characterGroupList = useLiveQuery(() => db.characterGroups.toArray())

    return {
        characterGroupList
    }
}
