import {AutoCenter, Button, Input, List, Popup} from "antd-mobile"
import {ISceneStateDictProps} from "../model/types.ts"
import {useSceneStateDict} from "@features/scene/SceneStateDict/model/useSceneStateDict.ts";
import {AddCircleOutline, CheckOutline} from "antd-mobile-icons";
import {ISceneState} from "@entities/Scene";
import {useState} from "react";
import { CheckCircleFill } from 'antd-mobile-icons'
import {InlineEdit} from "@shared/ui/InlineEdit";

export const SceneStateDict = (props: ISceneStateDictProps) => {

  const {
    sceneStates,
    saveState
  } = useSceneStateDict(props)

  const getInitialState = (): ISceneState => {
    return {
      title: "",
      isDefault: false,
      bookId: props.bookId,
    }
  }

  const [newState, setNewState] = useState<ISceneState>(getInitialState())
  const [sceneEditPopupVisible, setSceneEditPopupVisible] = useState(false)

  return (
      <>
      <List>
        {sceneStates?.map(state =>
          <List.Item
              key={state.id}
              extra={
                <Button
                  fill={!state.isDefault? "none" :"solid"}
                  color={"primary"}
                  onClick = {() => {
                    saveState({...state, isDefault: !state.isDefault})
                  }}
                >
                    <CheckOutline />
                </Button>
              }
          >
            <InlineEdit value={state.title} onChange={(val) =>{
              saveState({...state, title: val})
            }}/>
          </List.Item>
        )}
        <List.Item title={""} key={"add"}>
          <AutoCenter>
            <Button size='large' fill={'none'}  onClick={async  () => {
              setNewState(getInitialState())
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
                        value={newState.title}
                        onChange={(val) => setNewState({...newState, title: val})}
                 />
               </List.Item>
               <List.Item>
                 <Button color={'primary'}  onClick={() => {
                   saveState(newState)
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
