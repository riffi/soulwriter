
import {Space, Tag} from "antd-mobile";
import {TeamFill} from "antd-mobile-icons";
import {ITagListProps} from "@shared/ui/TagList";

export const TagList = (props: ITagListProps) => {
    if (!props.tags || props.tags.length === 0) return
    return (
        <Space direction={"horizontal"} wrap={true} style={{lineHeight: 'normal', "--gap-vertical": '2px'}}>
            <TeamFill style={{color: '#888888', marginTop: '4px'}}/>
            {props.tags?.map((tag) =>
                <Tag
                    key={tag.id}
                    style={{cursor: 'pointer', backgroundColor: '#AAAAAA', borderColor: '#999999'}}
                    color={"default"}
                >
                    {tag.value}
                </Tag>
            )}
        </Space>
    )
}
