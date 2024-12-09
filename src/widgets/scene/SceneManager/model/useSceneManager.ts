import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {useNavigate} from "react-router-dom";
import {IChapter, IScene} from "@entities/Scene";
import {ISceneShiftDirection} from "./types.ts";

export const useSceneManager = (bookId: number) => {

    const navigate = useNavigate()

    const sceneList = useLiveQuery(() => db.scenes
        .where("bookId")
        .equals(bookId)
        .sortBy("sortOrderId")
        , [bookId])

    const chapters = useLiveQuery(() => db.chapters
        .where({bookId})
        .sortBy("sortOrderId")
        , [bookId])

    const sceneStates = useLiveQuery(() => {

        return db.sceneStates
        .where("bookId")
        .equals(bookId)
        .sortBy("sortOrderId")
    }, [bookId])


    const sceneIds = useLiveQuery(() => sceneList?.map(s => s.id!), [sceneList])

    const sceneCharacters = useLiveQuery(async () => {
        if (!sceneIds) return
        return db.sceneCharacters
            .where("sceneId")
            .anyOf(sceneIds)
            .toArray()
    }, [sceneList, sceneIds]
    )

    const sceneNotes = useLiveQuery(async () => {
            if (!sceneIds) return
            return db.sceneNotes
            .where("sceneId")
            .anyOf(sceneIds)
            .toArray()
        }, [sceneList, sceneIds]
    )

    const bookSymbolCount = useLiveQuery(async () => {
        const scenes = await db.scenes
            .where("bookId")
            .equals(bookId)
            .toArray()
        let count = 0
        scenes.forEach((scene) => count += scene.symbolCount ? scene.symbolCount : 0)
        return count
    }, [bookId])


    const sceneChecks = useLiveQuery(() =>{
        return db.sceneChecks
        .where({bookId: bookId})
        .sortBy("sortOrderId")
    }, [bookId])

    const sceneCheckStates = useLiveQuery(() => db.sceneCheckStates
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

    const changeChapterTitle = (chapterId: number, title: string) => {
        db.chapters.update(chapterId, {title})
    }

    const appendChapter = async () => {
        const count = await db.chapters
        .where("bookId")
        .equals(bookId)
        .count()

        await db.chapters.add({
            bookId: bookId,
            title: 'Новая глава',
            sortOrderId: count + 1
        })
    }

    const appendSceneToChapter = async (scene: IScene, chapter: IChapter) => {
        await db.scenes.update(scene.id, {chapterId: chapter.id})
    }

    const removeSceneFromChapter = async (scene: IScene) => {
        await db.scenes.update(scene.id, {chapterId: undefined})
    }

    return {
        sceneList,
        chapters,
        sceneCharacters,
        shiftScene,
        bookSymbolCount,
        sceneStates,
        onCreateNewScene,
        sceneChecks,
        sceneCheckStates,
        sceneNotes,
        changeChapterTitle,
        appendChapter,
        appendSceneToChapter,
        removeSceneFromChapter
    }

}
