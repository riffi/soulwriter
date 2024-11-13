import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {ISceneNote} from "@entities/Scene";
import {IMeasureRadio} from "@entities/Measure";
import {Dialog} from "antd-mobile";

export const useSceneParams = (sceneId: number, bookId: number) => {

    const sceneData = useLiveQuery(() => db.scenes.get(sceneId), [sceneId])

    const sceneStates = useLiveQuery(() => {
        if (!sceneData) return []

        return db.sceneStates
            .where("bookId")
            .equals(sceneData?.bookId)
            .sortBy("sortOrderId")
    }, [sceneData])

    const sceneNotes = useLiveQuery(() =>{
        return db.sceneNotes.where("sceneId").equals(sceneId).toArray()
    },[sceneId])

    const changeNumberAttributeValue = (attributeName: string, newValue: number) => {
        if (sceneData){
            sceneData[attributeName] = newValue
            db.scenes.update(sceneId, {...sceneData})
        }
    }

    const saveSceneNote = (sceneNote: ISceneNote) => {
        const dataToSave = {...sceneNote}
        if (dataToSave.id){
            db.sceneNotes.update(dataToSave.id, {...dataToSave})
        }
        else{
            db.sceneNotes.add(dataToSave)
        }
    }

    const removeSceneNote = (sceneNote: ISceneNote) => {
        Dialog.alert({
            content: `Удалить заметку?`,
            title: `Подтверждение`,
            closeOnMaskClick: true,
            onConfirm: () => {
                db.sceneNotes.delete(sceneNote.id)
            }
        })
    }

    const sceneChecks = useLiveQuery(() =>{
        return db.sceneChecks
        .where({bookId: bookId})
        .sortBy("sortOrderId")
    }, [bookId])

    const sceneCheckStates = useLiveQuery(() =>{
        return db.sceneCheckStates
        .where({sceneId: sceneId}).toArray()
    }, [sceneId])

    const toggleSceneCheckState = (checkId: number, newState: boolean) =>{
        if (checkId){
            if (newState){
                db.sceneCheckStates.add({
                    sceneCheckId: checkId,
                    sceneId,
                    bookId
                })
            }
            else{
                db.sceneCheckStates.where({sceneId, sceneCheckId: checkId}).delete()
            }
        }
    }



    return {
        sceneData,
        sceneStates,
        sceneNotes,
        saveSceneNote,
        removeSceneNote,
        changeNumberAttributeValue,
        sceneChecks,
        sceneCheckStates,
        toggleSceneCheckState
    }
}
