import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../../entities/Db/model/Db.ts";
import {useNavigate} from "react-router-dom";

export const useSceneManager = (bookId: number) => {

    const navigate = useNavigate()

    const sceneList = useLiveQuery(() => db.scenes
        .where("bookId")
        .equals(bookId)
        .toArray(), [bookId])


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
        onCreateNewScene
    }

}
