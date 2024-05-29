import {IStoryLineViewFormProps} from "@widgets/StoryLineViewForm/model/types.ts";
import {useStoryLineViewForm} from "@widgets/StoryLineViewForm/model/useStoryLineViewForm.ts";
import {List, Tabs} from "antd-mobile";
import {InlineEdit} from "@shared/ui/InlineEdit";
import {InlineTextArea} from "@shared/ui/InlineTextArea";
import {StoryLineCharacters} from "@features/storyLine/StoryLineCharacters/ui/StoryLineCharacters.tsx";
import {StoryLineItems} from "@features/storyLine/StoryLineItems";

export const StoryLineViewForm = (props: IStoryLineViewFormProps) => {
    const {
        storyLine,
        changeAttributeValue
    } = useStoryLineViewForm(props.storyLineId)

    if (!storyLine) return

    return (
        <>
            <List>
                <List.Item title={"Название"}>
                    <InlineEdit
                        value={storyLine?.title}
                        onChange={(val) => changeAttributeValue("title", val)}/>
                </List.Item>
                <List.Item title={"Описание"}>
                    <InlineTextArea
                        value={storyLine?.description}
                        onChange={(val) => changeAttributeValue("description", val)}/>
                </List.Item>
            </List>
            <Tabs defaultActiveKey={"items"}>
                <Tabs.Tab title={"События"} key={"items"}>
                    <StoryLineItems storyLine={storyLine} />
                </Tabs.Tab>
                <Tabs.Tab title={"Персонажи"} key={"characters"}>
                    <StoryLineCharacters storyLine={storyLine} />
                </Tabs.Tab>
            </Tabs>

        </>


    )
}
