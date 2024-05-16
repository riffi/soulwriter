import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../entities/Db/model/Db.ts";
import {IWorld} from "../../../entities/World";

export const useWorldViewForm = (worldId: number, bookId: number) => {
    const world = useLiveQuery(() => db.worlds.get(worldId), [worldId])

    const changeBaseAttributeValue = (attributeName: string, newValue: string, world?: IWorld) => {
        if (world){
            world[attributeName] = newValue
            db.worlds.update(worldId, {...world})
        }
    }
    return {
        world,
        changeBaseAttributeValue
    }
}
