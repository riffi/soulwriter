import {IStoryLineViewFormProps} from "@widgets/StoryLineViewForm/model/types.ts";
import {useStoryLineViewForm} from "@widgets/StoryLineViewForm/model/useStoryLineViewForm.ts";
import {List} from "antd-mobile";
import {InlineEdit} from "@shared/ui/InlineEdit";

export const StoryLineViewForm = (props: IStoryLineViewFormProps) => {
    const {
        storyLine,
        changeAttributeValue
    } = useStoryLineViewForm(props.storyLineId)

    if (!storyLine) return

    return (
        <List>
            <List.Item title={"Название"}>
                <InlineEdit
                    value={storyLine?.title}
                    onChange={(val) => changeAttributeValue("title", val)}/>
            </List.Item>
        </List>
    )
}
