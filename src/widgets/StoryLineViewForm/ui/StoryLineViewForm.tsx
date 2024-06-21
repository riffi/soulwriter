import {List, Tabs} from "antd-mobile";

import {InlineEdit} from "@shared/ui/InlineEdit";
import {InlineTextArea} from "@shared/ui/InlineTextArea";

import {StoryLineCharacters} from "@features/storyLine/StoryLineCharacters";
import {StoryLineItems} from "@features/storyLine/StoryLineItems";

import {IStoryLineViewFormProps} from "../model/types.ts";
import {useStoryLineViewForm} from "../model/useStoryLineViewForm.ts";


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
