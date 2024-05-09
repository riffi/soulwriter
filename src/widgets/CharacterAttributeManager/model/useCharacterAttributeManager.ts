import {ICharacterDictAttribute} from "../../../entities/Character";
import {db} from "../../../entities/Db/model/Db";
import {useLiveQuery} from "dexie-react-hooks";

export const useCharacterAttributeManager = () => {

    const characterAttributeDict = useLiveQuery(() => db.characterAttributeDict.toArray())

    const onSaveNewAttribute = (title: string) => {
        const characterDistAttribute: ICharacterDictAttribute = {
            title
        }
        db.characterAttributeDict.add(characterDistAttribute)
    }

    return {
        characterAttributeDict,
        onSaveNewAttribute
    }
}
