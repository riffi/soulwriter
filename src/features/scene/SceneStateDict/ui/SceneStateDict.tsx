import {AutoCenter, Button, Checkbox, Input, List, Popup, Space, Tag} from "antd-mobile"
import {
  ISceneStateDictProps,
  ISceneStateShiftDirection,
  ISceneStateViewMode
} from "../model/types.ts"
import {useSceneStateDict} from "@features/scene/SceneStateDict/model/useSceneStateDict.ts";
import {
  AddCircleOutline,
  CheckOutline,
  DownOutline,
  EditSOutline,
  FingerdownOutline,
  UpOutline
} from "antd-mobile-icons";
import {ISceneState} from "@entities/Scene";
import {useState} from "react";
import {CirclePicker} from "react-color";

export const SceneStateDict = (props: ISceneStateDictProps) => {

  const {
    sceneStates,
    saveState,
    shiftState
  } = useSceneStateDict(props)

  const [mode, setMode] = useState<ISceneStateViewMode>(ISceneStateViewMode.BASIC)

  const getInitialState = (): ISceneState => {

    return {
      title: "",
      color: "#000000",
      sortOrderId: (sceneStates && sceneStates.length > 0) ? sceneStates?.[sceneStates.length - 1].sortOrderId + 1 : 1,
      isDefault: false,
      bookId: props.bookId,
    }
  }

  const [editedState, setEditedState] = useState<ISceneState>(getInitialState())
  const [sceneEditPopupVisible, setSceneEditPopupVisible] = useState(false)

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
              color={(mode === ISceneStateViewMode.REORDER) ?  'warning' : 'default'}
              onClick={() => {
                if (mode === ISceneStateViewMode.BASIC){
                  setMode(ISceneStateViewMode.REORDER)
                }
                else{
                  setMode(ISceneStateViewMode.BASIC)
                }

              }}
          >
            <FingerdownOutline /> Переставить
          </Button>
        </Space>
      <List>
        {sceneStates?.map(state =>
          <List.Item
              key={state.id}
              prefix={state.isDefault? <CheckOutline /> :""}
              extra={mode === ISceneStateViewMode.REORDER &&
                  <>
                    {(state.sortOrderId > 1) && <Button
                        onClick={() => {
                          shiftState(state, ISceneStateShiftDirection.UP)
                        }}
                    >
                      <UpOutline />
                    </Button>
                    }
                    {(state.sortOrderId < sceneStates?.length) &&
                        <Button
                            onClick={() => {
                             shiftState(state, ISceneStateShiftDirection.DOWN)
                            }}
                        >
                          <DownOutline />
                        </Button>
                    }
                  </>
              }
              clickable={false}

          >
            <Tag
              color={state.color}
            >
              {state.title}
            </Tag >
            <Button
                fill={"none"}
                color={"primary"}
                onClick = {() => {
                  setEditedState(state)
                  setSceneEditPopupVisible(true)
                }}
            >
              <EditSOutline />
            </Button>

          </List.Item>
        )}
        <List.Item title={""} key={"add"}>
          <AutoCenter>
            <Button size='large' fill={'none'}  onClick={async  () => {
              setEditedState(getInitialState())
              setSceneEditPopupVisible(true)
            }}>
              <AddCircleOutline/>

            </Button>
          </AutoCenter>
        </List.Item>
      </List>

        {sceneEditPopupVisible &&
            <Popup
                onClose={() => setSceneEditPopupVisible(false)}
                showCloseButton={true}
                visible={true}
                onMaskClick={() => setSceneEditPopupVisible(false)}
                style={{overflowY: "scroll"}}
                bodyStyle={{overflow: "auto", height: "90dvh", paddingTop: "10px"}}
            >
             <List header={"Добавление нового статуса"}>
               <List.Item title={"Название статуса"}>
                 <Input placeholder={"Введите название"}
                        value={editedState.title}
                        onChange={(val) => setEditedState({...editedState, title: val})}
                 />
               </List.Item>
               <List.Item title={"Цвет"}>
                 <CirclePicker
                     color={ editedState.color }
                     onChange={(val) => setEditedState({...editedState, color: val.hex})}
                 />
               </List.Item>
               <List.Item title={"По-умолчанию"}>
                 <Checkbox
                     checked={editedState.isDefault}
                     onChange={(val) => setEditedState({...editedState, isDefault: val})}
                 />
               </List.Item>

               <List.Item>
                 <Button color={'primary'}  onClick={() => {
                   saveState(editedState)
                   setSceneEditPopupVisible(false)
                 }}>
                   Сохранить
                 </Button>
               </List.Item>
             </List>
            </Popup>
        }
      </>
  )
}
