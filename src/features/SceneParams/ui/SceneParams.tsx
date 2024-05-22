import {ISceneParamsProps} from "../model/types.ts";
import {List} from "antd-mobile";
import {useSceneParams} from "../model/useSceneParams.ts";
import {InlineStepper} from "../../../shared/ui/InlineStepper";

export const SceneParams = (props: ISceneParamsProps) => {
    const {
        sceneData,
        changeNumberAttributeValue
    } = useSceneParams(props.sceneId)

    return (
        <List header={"Параметры сцены"}>
            <List.Item
                key={"dayStart"}
                title={"День начала сцены"}
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
            >
                <InlineStepper
                    value={sceneData?.dayEnd}
                    onChange={(val) => changeNumberAttributeValue("dayEnd", val)}
                />
            </List.Item>
        </List>
    )
}
