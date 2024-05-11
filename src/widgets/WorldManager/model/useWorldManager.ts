import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../entities/Db/model/Db.ts";
import {ICharacterDictAttribute} from "../../../entities/Character";
import {IWorld} from "../../../entities/World";

export const useWorldManager = () => {
    const worldList = useLiveQuery(() => db.worlds.toArray())

    const onSaveNewWorld = (title: string) => {
        const world: IWorld = {
            title,
            description: ''
        }
        db.worlds.add(world)
    }

    return {
        worldList,
        onSaveNewWorld
    }
}