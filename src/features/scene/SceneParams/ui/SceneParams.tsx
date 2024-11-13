import {ISceneParamsProps} from "../model/types.ts";
import {AutoCenter, Button, List, Radio, Space, Switch, Tabs, Tag} from "antd-mobile";
import {useSceneParams} from "../model/useSceneParams.ts";
import {InlineStepper} from "@shared/ui/InlineStepper";
import {getAbsoluteDate, humanizeDayValue} from "@shared/lib/DateUtils.ts";
import {InlineTextArea} from "@shared/ui/InlineTextArea";
import {AddCircleOutline, DeleteOutline} from "antd-mobile-icons";


export const SceneParams = (props: ISceneParamsProps) => {
    const {
        sceneData,
        changeNumberAttributeValue,
        sceneStates,
        sceneNotes,
        saveSceneNote,
        removeSceneNote,
        sceneChecks,
        sceneCheckStates,
        toggleSceneCheckState
    } = useSceneParams(props.sceneId, props.book.id)

    const dayStartStr = humanizeDayValue(sceneData?.dayStart)
    const dayEndStr = humanizeDayValue(sceneData?.dayEnd)
    let dayStartAbsoluteStr = ''
    let dayEndAbsoluteStr = ''
    if (props.book.dateStart){
        if (sceneData?.dayStart)  dayStartAbsoluteStr = getAbsoluteDate(props.book.dateStart, sceneData?.dayStart)
        if (sceneData?.dayEnd)  dayEndAbsoluteStr = getAbsoluteDate(props.book.dateStart, sceneData?.dayEnd)
    }


    return (
        <Tabs
            style={{"--title-font-size": "14px", "paddingTop":"10px"}}
            defaultActiveKey={"main"}
        >
              <Tabs.Tab
                  key={"main"}
                  title={"Общее"}
              >
                <List>
                  <List.Item
                      key={"dayStart"}
                      title={"День начала сцены"}
                      description={`Отображаемое значение: ${dayStartStr}; ${dayStartAbsoluteStr}`}
                  >

                    <InlineStepper
                        value={sceneData?.dayStart}
                        onChange={(val) => {
                          changeNumberAttributeValue("dayStart", val)
                          if (!sceneData?.dayEnd){
                            changeNumberAttributeValue("dayEnd", val)
                          }
                        }}
                    />
                  </List.Item>
                  <List.Item
                      key={"dayEnd"}
                      title={"День окончания сцены"}
                      description={`Отображаемое значение: ${dayEndStr}; ${dayEndAbsoluteStr}`}
                  >
                    <InlineStepper
                        value={sceneData?.dayEnd}
                        onChange={(val) => changeNumberAttributeValue("dayEnd", val)}
                    />
                  </List.Item>
                  <List.Item
                      key={"state"}
                      title={"Статус сцены"}
                  >
                    <Space direction="vertical">
                      {sceneStates?.map((state) =>
                          <Radio
                              value={state.id}
                              key={state.id}
                              checked={state.id === sceneData?.stateId || (sceneData?.stateId === undefined && state.isDefault)}
                              onChange={(val) => changeNumberAttributeValue("stateId", state.id!)}
                          >
                            <Tag color={state.color}>
                              {state.title}
                            </Tag>

                          </Radio>
                      )}
                    </Space>
                  </List.Item>
                </List>
              </Tabs.Tab>
          <Tabs.Tab
              key={"notes"}
              title={"Заметки"}
          >
            <List>
              {sceneNotes?.map((note) =>
                <List.Item
                    key={note.id}
                    extra={
                      <Button
                          onClick={() => removeSceneNote(note)}
                          fill={"none"}
                      >
                        <DeleteOutline />
                      </Button>
                    }
                >
                  <div style={{position: "relative"}}>
                    <InlineTextArea
                        value={note.text}
                        onChange={(val) => saveSceneNote({...note, text: val})}
                        iconStyle={{right: "-10px", marginTop: "3px", fontSize: "18px"}}
                    />
                  </div>
                </List.Item>
              )}
              <List.Item title={""}>
                <AutoCenter>
                    <Button size='large' fill={'none'}  onClick={() => {
                      saveSceneNote({
                        sceneId: props.sceneId,
                        text: "Новая заметка",
                      })
                    }}>
                      <AddCircleOutline />

                    </Button>
                </AutoCenter>
              </List.Item>
            </List>
          </Tabs.Tab>
          <Tabs.Tab
              key={"checklist"}
              title={"Чек-лист"}
          >
            <List>
              {sceneChecks?.map((check) =>
                  <List.Item
                      key={check.id}
                      title={check.title}
                      prefix={
                        <Switch
                            checked={sceneCheckStates?.find(s => s.sceneCheckId === check.id) !== undefined}
                            onChange={(val) => {
                              toggleSceneCheckState(check.id, val)
                            }}
                        />
                  }
                  >
                  </List.Item>
              )}
            </List>
          </Tabs.Tab>
        </Tabs>
    )
}
