import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../../entities/Db/model/Db.ts";
import {useNavigate} from "react-router-dom";
import {IScene} from "../../../../entities/Scene";
import {ISceneShiftDirection} from "./types.ts";

export const useSceneManager = (bookId: number) => {

    const navigate = useNavigate()

    const sceneList = useLiveQuery(() => db.scenes
        .where("bookId")
        .equals(bookId)
        .sortBy("sortOrderId")
        , [bookId])


    const shiftScene = (sceneToShift: IScene, direction: ISceneShiftDirection) => {
        const scenes: IScene[] = [...sceneList]
        let newSortOrderId = sceneToShift.sortOrderId
        if (direction === ISceneShiftDirection.DOWN){
             newSortOrderId = sceneToShift.sortOrderId + 1
        }
        else{
            newSortOrderId = sceneToShift.sortOrderId - 1
        }

        scenes.splice(sceneToShift.sortOrderId - 1, 1)
        scenes.splice(newSortOrderId - 1, 0, sceneToShift)
        scenes.forEach((scene, index) => {
            db.scenes.update(scene.id, {sortOrderId: index + 1})
        })
    }

    const onCreateNewScene = async () => {
        const count = await db.scenes
            .where("bookId")
            .equals(bookId)
            .count()

        const newSceneId = await db.scenes.add({
                bookId: bookId,
                title: 'Новая сцена',
                description: '',
                body: '',
                sortOrderId: count + 1
            })
        navigate(`/scene/card?id=${newSceneId}`)

}

    return {
        sceneList,
        shiftScene,
        onCreateNewScene
    }

}