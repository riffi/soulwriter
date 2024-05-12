import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../entities/Db/model/Db";
import {ICharacterManagerProps} from "./types.ts";

export const useCharactersManager= (bookId: number) => {

    const characterGroupList = useLiveQuery(() => db.characterGroups
        .where("bookId")
        .equals(bookId)
        .toArray(), [bookId])

    return {
        characterGroupList
    }
}
