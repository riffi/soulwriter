import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";

export const useSceneParams = (sceneId: number) => {

    const sceneData = useLiveQuery(() => db.scenes.get(sceneId), [sceneId])

    const sceneStates = useLiveQuery(() => {
        if (!sceneData) return []

        return db.sceneStates
            .where("bookId")
            .equals(sceneData?.bookId)
            .sortBy("sortOrderId")
    }, [sceneData])

    const changeNumberAttributeValue = (attributeName: string, newValue: number) => {
        if (sceneData){
            sceneData[attributeName] = newValue
            db.scenes.update(sceneId, {...sceneData})
        }
    }


    return {
        sceneData,
        sceneStates,
        changeNumberAttributeValue
    }
}
