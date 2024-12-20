import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {ISceneNote} from "@entities/Scene";
import {Dialog} from "antd-mobile";

export const useBookNotesManager = (bookId: number) => {
  const notes = useLiveQuery(() => db.sceneNotes.toArray(), [bookId])

  const scenes = useLiveQuery(() => db.scenes.orderBy("sortOrderId").toArray(), [bookId])

  const removeNote = (sceneNote: ISceneNote) => {
    Dialog.alert({
      content: `Удалить заметку?`,
      title: `Подтверждение`,
      closeOnMaskClick: true,
      onConfirm: () => {
        db.sceneNotes.delete(sceneNote.id)
      }
    })
  }

  const saveNote = (sceneNote: ISceneNote) => {
    const dataToSave = {...sceneNote}
    if (dataToSave.id){
      db.sceneNotes.update(dataToSave.id, {...dataToSave})
    }
    else{
      db.sceneNotes.add(dataToSave)
    }
  }

  return {
    notes,
    scenes,
    removeNote,
    saveNote
  }
}
