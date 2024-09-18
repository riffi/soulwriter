import {ISceneStateDictProps} from "../model/types.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {ISceneState} from "@entities/Scene";

export const useSceneStateDict = (props: ISceneStateDictProps) => {
  const sceneStates = useLiveQuery(() =>{
    return db.sceneStates.where({bookId: props.bookId}).toArray();
  }, [props.bookId])

  const saveState = async (sceneState: ISceneState) => {
    const saveData = {...sceneState}


    if (!saveData.id){
      return db.sceneStates.add(saveData)
    }
    else{
      return db.sceneStates.update(saveData.id, {...saveData})
    }
  }

  return {
    sceneStates,
    saveState,
  }
}
