import {IWorldViewFormProps} from "../model/types.ts";
import {useWorldViewForm} from "../model/useWorldViewForm.ts";
import {List, Tabs} from "antd-mobile";
import {InlineEdit} from "../../../shared/ui/InlineEdit";
import {InlineTextArea} from "../../../shared/ui/InlineTextArea/ui/InlineTextArea.tsx";
import {BookItemList} from "../../../features/BookItemList";

export const WorldViewForm = (props: IWorldViewFormProps) => {
    const {
        world,
        changeBaseAttributeValue
    } = useWorldViewForm(props.worldId, props.bookId)

    return (
        <>
        <List>
            <List.Item title={"Название"} key={"name"}>
                <InlineEdit
                    value={world?.title}
                    onChange={(val) => changeBaseAttributeValue("title", val, world)}
                />
            </List.Item>
        </List>
        <Tabs>
            <Tabs.Tab
                key={"children"}
                title={"Детали"}
            >
                <BookItemList
                    parentId={-1}
                    worldId={props.worldId}
                    bookId={props.bookId}
                    header={"Описание мира"}
                />
            </Tabs.Tab>
            <Tabs.Tab title={"Описание"}  key={"description"}>
                <List>
                    <List.Item title={"Описание"} key={"description"}>
                        <InlineTextArea
                            value={world?.description}
                            onChange={(val) => changeBaseAttributeValue("description", val, world)}
                        />
                    </List.Item>
                </List>
            </Tabs.Tab>
        </Tabs>

        </>
    )
}
