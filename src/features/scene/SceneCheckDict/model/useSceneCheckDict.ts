import {ISceneCheckDictProps, ISceneCheckDictShiftDirection} from "../model/types.ts"
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {ISceneCheck} from "@entities/Scene";
import {Dialog} from "antd-mobile";

export const useSceneCheckDict = (props: ISceneCheckDictProps) => {
  const sceneChecks = useLiveQuery(() =>{
    return db.sceneChecks
    .where({bookId: props.bookId})
    .sortBy("sortOrderId")
  }, [props.bookId])

  const saveCheck = async (sceneCheck: ISceneCheck) => {
    const saveData = {...sceneCheck}


    if (!saveData.id){
      return db.sceneChecks.add(saveData)
    }
    else{
      return db.sceneChecks.update(saveData.id, {...saveData})
    }
  }

  const shiftCheck = (checkToShift: ISceneCheck, direction: ISceneCheckDictShiftDirection) => {
    const checks: ISceneCheck[] = [...sceneChecks]
    let newSortOrderId = checkToShift.sortOrderId
    if (direction === ISceneCheckDictShiftDirection.DOWN){
      newSortOrderId = checkToShift.sortOrderId + 1
    }
    else{
      newSortOrderId = checkToShift.sortOrderId - 1
    }

    checks.splice(checkToShift.sortOrderId - 1, 1)
    checks.splice(newSortOrderId - 1, 0, checkToShift)
    checks.forEach((scene, index) => {
      db.sceneChecks.update(scene.id, {sortOrderId: index + 1})
    })
  }

  const deleteCheck = (checkToDelete: ISceneCheck) => {
    Dialog.alert({
      content: `Удалить проверку "${checkToDelete.title}" из чек-листа?`,
      title: `Подтверждение`,
      closeOnMaskClick: true,
      onConfirm: () => {
        db.sceneCheckStates.where({sceneCheckId: checkToDelete.id}).delete()
        db.sceneChecks.delete(checkToDelete.id)
      }
    })
  }

  return {
    sceneChecks,
    saveCheck,
    shiftCheck,
    deleteCheck
  }
}
