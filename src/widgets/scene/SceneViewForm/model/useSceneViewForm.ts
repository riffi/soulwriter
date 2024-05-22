import {db} from "../../../../entities/Db/model/Db.ts";
import {dbSynonyms} from "../../../../entities/Db/model/Synonym.ts";

import {useLiveQuery} from "dexie-react-hooks";
import {IScene} from "../../../../entities/Scene";

export const useSceneViewForm = (bookId: number, sceneId: number) =>{

    const s = useLiveQuery(() => dbSynonyms.dict.get(4))

    const scene = useLiveQuery(() => db.scenes
        .get(sceneId), [sceneId])


    const characterCount = useLiveQuery(() => db.sceneCharacters
        .where("sceneId")
        .equals(sceneId)
        .count(), [sceneId]
    )

    const sceneLinkCount = useLiveQuery(() => db.sceneLinks
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


    const changeAttributeValue = (attributeName: string, newValue: number, scene?: IScene) => {
        if (scene){
            scene[attributeName] = newValue
            db.scenes.update(sceneId, {...scene})
        }
    }

    const updateSymbolCount = (count: number) => {
        if (scene){
            db.scenes.update(sceneId, {symbolCount: count})
        }
    }

    return {
        scene,
        nextScene,
        prevScene,
        characterCount,
        sceneLinkCount,
        changeAttributeValue,
        updateSymbolCount
    }
}
