import {
  ISceneCheckDictProps,
  ISceneCheckDictShiftDirection,
  ISceneCheckDictViewMode
} from "../model/types.ts";
import {useSceneCheckDict} from "../model/useSceneCheckDict.ts";
import {useState} from "react";
import {ISceneCheck} from "@entities/Scene";
import {AutoCenter, Button, Input, List, Popup, Space, Tag} from "antd-mobile";
import {
  AddCircleOutline, CheckCircleFill,
  DownOutline,
  EditSOutline,
  FingerdownOutline,
  UpOutline
} from "antd-mobile-icons";
import {CirclePicker} from "react-color";

export const SceneCheckDict = (props: ISceneCheckDictProps) => {

  const {
    sceneChecks,
    shiftCheck,
    saveCheck,
    deleteCheck
  } = useSceneCheckDict(props);

  const [mode, setMode] = useState<ISceneCheckDictViewMode>(ISceneCheckDictViewMode.BASIC)


  const getInitialCheckValue = (): ISceneCheck => {

    return {
      title: "",
      color: "#000000",
      sortOrderId: (sceneChecks && sceneChecks.length > 0) ? sceneChecks?.[sceneChecks.length - 1].sortOrderId + 1 : 1,
      bookId: props.bookId,
    }
  }

  const [editedCheck, setEditedCheck] = useState<ISceneCheck>(getInitialCheckValue())

  const [editPopupVisible, setEditPopupVisible] = useState(false)

  return (
      <>
        <Space
            justify={"center"}
            direction={"horizontal"}
            style={{marginTop: '10px'}}
        >
          <Button
              size={"small"}
              style={{marginBottom: '10px'}}
              color={(mode === ISceneCheckDictViewMode.REORDER) ?  'warning' : 'default'}
              onClick={() => {
                if (mode === ISceneCheckDictViewMode.BASIC){
                  setMode(ISceneCheckDictViewMode.REORDER)
                }
                else{
                  setMode(ISceneCheckDictViewMode.BASIC)
                }

              }}
          >
            <FingerdownOutline /> Переставить
          </Button>
        </Space>
        <List>
          {sceneChecks?.map(check =>
              <List.Item
                  key={check.id}
                  prefix={<CheckCircleFill />}
                  extra={mode === ISceneCheckDictViewMode.REORDER &&
                      <>
                        {(check.sortOrderId > 1) && <Button
                            onClick={() => {
                              shiftCheck(check, ISceneCheckDictShiftDirection.UP)
                            }}
                        >
                          <UpOutline />
                        </Button>
                        }
                        {(check.sortOrderId < sceneChecks?.length) &&
                            <Button
                                onClick={() => {
                                  shiftCheck(check, ISceneCheckDictShiftDirection.DOWN)
                                }}
                            >
                              <DownOutline />
                            </Button>
                        }
                      </>
                  }
                  clickable={false}

              >
                {check.title}
                <Button
                    fill={"none"}
                    color={"primary"}
                    onClick = {() => {
                      setEditedCheck(check)
                      setEditPopupVisible(true)
                    }}
                >
                  <EditSOutline />
                </Button>

              </List.Item>
          )}
          <List.Item title={""} key={"add"}>
            <AutoCenter>
              <Button size='large' fill={'none'}  onClick={async  () => {
                setEditedCheck(getInitialCheckValue())
                setEditPopupVisible(true)
              }}>
                <AddCircleOutline/>

              </Button>
            </AutoCenter>
          </List.Item>
        </List>

        {editPopupVisible &&
            <Popup
                onClose={() => setEditPopupVisible(false)}
                showCloseButton={true}
                visible={true}
                onMaskClick={() => setEditPopupVisible(false)}
                style={{overflowY: "scroll"}}
                bodyStyle={{overflow: "auto", height: "90dvh", paddingTop: "10px"}}
            >
              <List header={"Добавление нового эелемента чек-листа"}>
                <List.Item title={"Название проверки"}>
                  <Input placeholder={"Введите название"}
                         value={editedCheck.title}
                         onChange={(val) => setEditedCheck({...editedCheck, title: val})}
                  />
                </List.Item>
                <List.Item title={"Цвет"}>
                  <CirclePicker
                      color={ editedCheck.color }
                      onChange={(val) => setEditedCheck({...editedCheck, color: val.hex})}
                  />
                </List.Item>
                <List.Item>
                  <Button color={'primary'}  onClick={() => {
                    saveCheck(editedCheck)
                    setEditPopupVisible(false)
                  }}>
                    Сохранить
                  </Button>
                </List.Item>
                <List.Item>
                  <Button color={'danger'}  onClick={() => {
                    deleteCheck(editedCheck)
                    setEditPopupVisible(false)
                  }}>
                    Удалить
                  </Button>
                </List.Item>
              </List>
            </Popup>
        }
      </>
  )

}
