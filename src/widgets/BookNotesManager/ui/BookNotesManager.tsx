import {IBookNotesManagerProps} from "@widgets/BookNotesManager/model/types.ts";
import {useBookNotesManager} from "@widgets/BookNotesManager/model/useBookNotesManager.ts";
import {AutoCenter, Button, List, Popup, Space, TextArea} from "antd-mobile";
import {IScene, ISceneNote} from "@entities/Scene";
import {AddCircleOutline, DeleteOutline, EditFill} from "antd-mobile-icons";
import React from "react";
import {SceneSelector} from "@features/scene/SceneSelector";
import {useNavigate} from "react-router-dom";

interface ISceneWithNotes{
  scene?: IScene,
  notes: ISceneNote[]
}

const NO_SCENE_ID = -1

const getNoteScene = (note: ISceneNote, scenes: IScene[]) => {
  if (!note) return undefined
  return scenes.find(scene => scene.id === note.sceneId)
}

const appendToSceneWithNotes = (scenesWithNotes: ISceneWithNotes[], note: ISceneNote, scene?: IScene) => {
  const sceneWithNotes = scenesWithNotes.find(sceneWithNotes => sceneWithNotes.scene?.id === scene.id)
  if (!sceneWithNotes) {
    scenesWithNotes.push({
      scene,
      notes: [note]
    })
  }
  else {
    sceneWithNotes.notes.push(note)
  }
}


const getScenesWithNotes = (scenes?: IScene[], notes?: ISceneNote[]): ISceneWithNotes[] => {
  if (!scenes || !notes) return []
  const scenesWithEmptyElement = [
      ...scenes,
      {title: "Без привязки к сцене", sortOrderId: 0, id: NO_SCENE_ID}
  ]
  const scenesWithNotes: ISceneWithNotes[] = []
  notes?.forEach(note => {
    const noteScene = getNoteScene(note, scenesWithEmptyElement)
    appendToSceneWithNotes(scenesWithNotes, note, noteScene)
  })
  return scenesWithNotes.sort((a, b) => a.scene?.sortOrderId - b.scene?.sortOrderId)
}


export const BookNotesManager = (props: IBookNotesManagerProps) => {
  const {
    notes,
    scenes,
    removeNote,
    saveNote
  } = useBookNotesManager(props.bookId)

  const scenesWithNotes = getScenesWithNotes(scenes, notes)

  const [isNotePopupVisible, setIsNotePopupVisible] = React.useState(false)
  const [isSceneSelectPopupVisible, setIsSceneSelectPopupVisible] = React.useState(false)

  const [selectedNote, setSelectedNote]  = React.useState<ISceneNote>()

  const scenesWithEmptyElement = scenes?  [
    ...scenes,
    {title: "Без привязки к сцене", sortOrderId: 0, id: NO_SCENE_ID}
  ] : []

  const selectedScene = getNoteScene(selectedNote, scenesWithEmptyElement)

  const navigate = useNavigate()

  return (
      <>
        <List
        >
          {scenesWithNotes?.map(sceneWithNote => (
              <List.Item
                  key={sceneWithNote.scene?.id}
                  title={sceneWithNote.scene?.id === NO_SCENE_ID ? "[Без привязки к сцене]" : `Сцена ${sceneWithNote.scene?.sortOrderId}. ${sceneWithNote.scene?.title}`}
              >
                <List>
                  {sceneWithNote.notes.map(note => (
                      <List.Item
                          key={note.id}
                          clickable={false}
                          onClick={() => {
                            if (note.sceneId !== NO_SCENE_ID) {
                              navigate(`/scene/card?id=${note.sceneId}`)
                            }
                          }}
                          extra={
                          <>
                            <div>
                              <Button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedNote(note)
                                    setIsNotePopupVisible(true)
                                  }}

                                  fill={"none"}
                                  size={"small"}
                              >
                                <EditFill />
                              </Button>
                              <Button
                                  onClick={(e) =>{
                                    e.stopPropagation()
                                    removeNote(note)}
                                  }
                                  fill={"none"}
                                  size={"small"}
                              >
                                <DeleteOutline />
                              </Button>

                            </div>
                          </>
                          }
                      >
                        <div style={{position: "relative"}}>
                          {note.text}
                        </div>
                      </List.Item>
                  ))}
                </List>
              </List.Item>
          ))}
          <List.Item title={""}>
            <AutoCenter>
              <Button size='large' fill={'none'}  onClick={() => {
                setIsNotePopupVisible(true)
                setSelectedNote({sceneId: NO_SCENE_ID, text: ""})
              }}>
                <AddCircleOutline />

              </Button>
            </AutoCenter>
          </List.Item>
        </List>
        {isNotePopupVisible && <>
          <Popup
              visible={true}
              bodyStyle={{overflow: "auto", height: "100dvh"}}
              showCloseButton={true}
              onClose={() => setIsNotePopupVisible(false)}
          >
            <List
                mode={"card"}
                header={"Добавить заметку"}
            >
              <List.Item
                  title={"Сцена"}

              >
                {selectedScene && (selectedScene.id !== NO_SCENE_ID) && <>
                  <div>
                    {selectedScene?.sortOrderId}. {selectedScene?.title}
                    <Button
                        fill={"none"}
                        size={"small"}
                        onClick={() => setSelectedNote({...selectedNote, sceneId: NO_SCENE_ID})}
                    >
                      <DeleteOutline />
                    </Button>
                  </div>
                </>
                }
                {(!selectedScene || (selectedScene.id === NO_SCENE_ID)) && <>
                  <div style={{color: "gray"}}>
                    [Без привязки к сцене]
                  </div>
                </>}
                <Button
                    onClick={() => setIsSceneSelectPopupVisible(true)}
                    size={"small"}
                >
                  Выбрать сцену
                </Button>

              </List.Item>
              <List.Item title={"Текст"}>
                <TextArea
                    value={selectedNote?.text ?? ""}
                    onChange={(val) => setSelectedNote({...selectedNote, text: val})}
                    autoSize={{minRows: 1, maxRows: 10}}
                ></TextArea>
              </List.Item>
              <List.Item>
                <Button
                    color={"primary"}
                    onClick={() => {
                        saveNote(selectedNote)
                        setIsNotePopupVisible(false)
                    }}
                >
                  Сохранить
                </Button>
              </List.Item>
            </List>
          </Popup>
        </>
        }
        {isSceneSelectPopupVisible && <>
          <Popup
              visible={true}
              bodyStyle={{overflow: "auto", height: "100dvh"}}
              showCloseButton={true}
              onClose={() => setIsSceneSelectPopupVisible(false)}
          >
            <SceneSelector bookId={props.bookId} onSelect={(scene) => {
              setSelectedNote({...selectedNote, sceneId: scene.id})
              setIsSceneSelectPopupVisible(false)
            }}/>
          </Popup>
        </>
        }
      </>
  )
}
