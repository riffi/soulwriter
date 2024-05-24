import {CharacterAttributeSection, ICharacter} from "@entities/Character";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";

export const useCharacterAttributeList = (bookId: number, character: ICharacter, section: CharacterAttributeSection) => {
    const characterAttributeDict = useLiveQuery(() => db.characterAttributeDict
        .where("bookId")
        .equals(bookId)
        .and((attr) => (attr.section === section))
        .toArray(), [bookId, character])

    return {
        characterAttributeDict
    }
}
