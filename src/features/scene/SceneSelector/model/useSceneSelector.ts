import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";

export const useSceneSelector = (bookId: number) => {
  const scenes = useLiveQuery(() => db.scenes.where({bookId}).sortBy("sortOrderId"), [bookId])

  return {
    scenes
  }
}
