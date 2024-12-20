import {IBookNotesManagerProps} from "@widgets/BookNotesManager/model/types.ts";
import {useBookNotesManager} from "@widgets/BookNotesManager/model/useBookNotesManager.ts";
import {AutoCenter, Button, List, Popup, TextArea} from "antd-mobile";
import {IScene, ISceneNote} from "@entities/Scene";
import {AddCircleOutline, DeleteOutline} from "antd-mobile-icons";
import {InlineTextArea} from "@shared/ui/InlineTextArea";
import React from "react";
import {SceneSelector} from "@features/scene/SceneSelector";

interface ISceneWithNotes{
  scene?: IScene,
  notes: ISceneNote[]
}

const NO_SCENE_ID = -1

const getNoteScene = (note: ISceneNote, scenes: IScene[]) => {
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

  const [selectedScene, setSelectedScene] = React.useState<IScene>()
  const [editedNoteText, setEditedNoteText] = React.useState<string>("")

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
                          clickable
                          extra={
                            <Button
                                onClick={() => removeNote(note)}
                                fill={"none"}
                            >
                              <DeleteOutline />
                            </Button>
                          }
                      >
                        <div style={{position: "relative"}}>
                          <InlineTextArea
                              value={note.text}
                              onChange={(val) => saveNote({...note, text: val})}
                              iconStyle={{right: "-10px", marginTop: "3px", fontSize: "18px"}}
                          />
                        </div>
                      </List.Item>
                  ))}
                </List>
              </List.Item>
          ))}
          <List.Item title={""}>
            <AutoCenter>
              <Button size='large' fill={'none'}  onClick={() => {
                setSelectedScene(undefined)
                setIsNotePopupVisible(true)
                setEditedNoteText("")
              }}>
                <AddCircleOutline />

              </Button>
            </AutoCenter>
          </List.Item>
        </List>
        {isNotePopupVisible && <>
          <Popup
              visible={true}
              bodyStyle={{overflow: "auto", height: "90dvh"}}
              showCloseButton={true}
              onClose={() => setIsNotePopupVisible(false)}
          >
            <List mode={"card"}>
              <List.Item
                  title={"Сцена"}

              >
                {selectedScene && <>
                  <div>
                    {selectedScene.sortOrderId}. {selectedScene.title}
                    <Button
                        fill={"none"}
                        size={"small"}
                        onClick={() => setSelectedScene(undefined)}
                    >
                      <DeleteOutline />
                    </Button>
                  </div>
                </>
                }
                {!selectedScene && <>
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
                    value={editedNoteText}
                    onChange={(val) => setEditedNoteText(val)}
                    autoSize={{minRows: 1, maxRows: 10}}
                ></TextArea>
              </List.Item>
              <List.Item>
                <Button
                    color={"primary"}
                    onClick={() => {
                      saveNote({
                          sceneId: selectedScene?.id ?? NO_SCENE_ID,
                          text: editedNoteText
                        })
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
              setSelectedScene(scene)
              setIsSceneSelectPopupVisible(false)
            }}/>
          </Popup>
        </>
        }
      </>
  )
}
