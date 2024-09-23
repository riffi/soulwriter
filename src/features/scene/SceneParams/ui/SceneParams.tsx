import {ISceneParamsProps} from "../model/types.ts";
import {List, Radio, Space, Tag} from "antd-mobile";
import {useSceneParams} from "../model/useSceneParams.ts";
import {InlineStepper} from "@shared/ui/InlineStepper";
import {getAbsoluteDate, humanizeDayValue} from "@shared/lib/DateUtils.ts";

export const SceneParams = (props: ISceneParamsProps) => {
    const {
        sceneData,
        changeNumberAttributeValue,
        sceneStates
    } = useSceneParams(props.sceneId)

    const dayStartStr = humanizeDayValue(sceneData?.dayStart)
    const dayEndStr = humanizeDayValue(sceneData?.dayEnd)
    let dayStartAbsoluteStr = ''
    let dayEndAbsoluteStr = ''
    if (props.book.dateStart){
        if (sceneData?.dayStart)  dayStartAbsoluteStr = getAbsoluteDate(props.book.dateStart, sceneData?.dayStart)
        if (sceneData?.dayEnd)  dayEndAbsoluteStr = getAbsoluteDate(props.book.dateStart, sceneData?.dayEnd)
    }


    return (
        <List header={"Параметры сцены"}>
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
    )
}
