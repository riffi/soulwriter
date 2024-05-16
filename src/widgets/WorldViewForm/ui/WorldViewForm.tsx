import {IWorldViewFormProps} from "../model/types.ts";
import {useWorldViewForm} from "../model/useWorldViewForm.ts";
import {List} from "antd-mobile";
import {InlineEdit} from "../../../shared/ui/InlineEdit";
import {InlineTextArea} from "../../../shared/ui/InlineTextArea/ui/InlineTextArea.tsx";

export const WorldViewForm = (props: IWorldViewFormProps) => {
    const {
        world,
        changeBaseAttributeValue
    } = useWorldViewForm(props.worldId, props.bookId)

    return (
        <List style={{"--border-top": "none", "--border-bottom": "none", "--font-size": "14px"}}>
            <List.Item title={"Название"} key={"name"}>
                <InlineEdit
                    value={world?.title}
                    onChange={(val) => changeBaseAttributeValue("title", val, world)}
                />
            </List.Item>
            <List.Item title={"Описание"} key={"description"}>
                <InlineTextArea
                    value={world?.description}
                    onChange={(val) => changeBaseAttributeValue("description", val, world)}
                />
            </List.Item>
        </List>
    )
}
