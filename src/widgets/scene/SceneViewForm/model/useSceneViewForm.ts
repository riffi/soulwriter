import {db} from "../../../../entities/Db/model/Db.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {IScene} from "../../../../entities/Scene";

export const useSceneViewForm = (bookId: number, sceneId: number) =>{
    const scene = useLiveQuery(() => db.scenes
        .get(sceneId))


    const changeAttributeValue = (attributeName: string, newValue: string, scene?: IScene) => {
        if (scene){
            scene[attributeName] = newValue
            db.scenes.update(sceneId, {...scene})
        }
    }

    return {
        scene,
        changeAttributeValue
    }
}
