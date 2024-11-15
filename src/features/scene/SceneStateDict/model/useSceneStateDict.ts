import {ISceneStateDictProps, ISceneStateShiftDirection} from "../model/types.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {IScene, ISceneState} from "@entities/Scene";
import {ISceneShiftDirection} from "@widgets/scene/SceneManager";
import {Dialog} from "antd-mobile";

export const useSceneStateDict = (props: ISceneStateDictProps) => {
  const sceneStates = useLiveQuery(() =>{
    return db.sceneStates
    .where({bookId: props.bookId})
    .sortBy("sortOrderId")
  }, [props.bookId])

  // Сохранение состояния
  const saveState = async (sceneState: ISceneState) => {
    const saveData = {...sceneState}


    if (!saveData.id){
      return db.sceneStates.add(saveData)
    }
    else{
      return db.sceneStates.update(saveData.id, {...saveData})
    }
  }

  // Изменение порядка состояний
  const shiftState = (stateStateToShift: ISceneState, direction: ISceneStateShiftDirection) => {
    const states: ISceneState[] = [...sceneStates]
    let newSortOrderId = stateStateToShift.sortOrderId
    if (direction === ISceneStateShiftDirection.DOWN){
      newSortOrderId = stateStateToShift.sortOrderId + 1
    }
    else{
      newSortOrderId = stateStateToShift.sortOrderId - 1
    }

    states.splice(stateStateToShift.sortOrderId - 1, 1)
    states.splice(newSortOrderId - 1, 0, stateStateToShift)
    states.forEach((scene, index) => {
      db.sceneStates.update(scene.id, {sortOrderId: index + 1})
    })
  }

  // Удаление состояния
  const deleteState =  (state: ISceneState) => {
    Dialog.alert({
      content: `Удалить статус "${state.title}"?`,
      title: `Подтверждение`,
      closeOnMaskClick: true,
      onConfirm: async () => {
        const defaultState = await db.sceneStates.where(
            {
              bookId: props.bookId,
              isDefault: 1
            }).first()

        if (!defaultState){
          await Dialog.alert("Перед удалением статуса необходимо установить статус по умолчанию")
          return
        }

        db.transaction('rw', db.sceneStates, db.scenes, async () => {
          db.sceneStates.delete(state.id)
          db.scenes.where({stateId: state.id}).each(scene => {
            db.scenes.update(scene.id, {stateId: defaultState.id})
          })
        })

      }
    })
  }


  return {
    sceneStates,
    saveState,
    shiftState,
    deleteState
  }
}
