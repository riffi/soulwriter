import {db} from "../../../../entities/Db/model/Db.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {IScene} from "../../../../entities/Scene";

export const useSceneViewForm = (bookId: number, sceneId: number) =>{

    const scene = useLiveQuery(() => db.scenes
        .get(sceneId), [sceneId])

    const characterCount = useLiveQuery(() => db.sceneCharacters
        .where("sceneId")
        .equals(sceneId)
        .count(), [sceneId]
    )

    const nextScene = useLiveQuery(() => db.scenes
        .where("bookId")
        .equals(bookId)
        .and(s => scene? (s.sortOrderId == scene.sortOrderId + 1) : false)
        .first(), [scene]
    )

    const prevScene = useLiveQuery(() => db.scenes
        .where("bookId")
        .equals(bookId)
        .and(s => scene? (s.sortOrderId == scene.sortOrderId -1) : false)
        .first(), [scene]
    )


    const changeAttributeValue = (attributeName: string, newValue: string, scene?: IScene) => {
        if (scene){
            scene[attributeName] = newValue
            db.scenes.update(sceneId, {...scene})
        }
    }

    return {
        scene,
        nextScene,
        prevScene,
        characterCount,
        changeAttributeValue
    }
}
