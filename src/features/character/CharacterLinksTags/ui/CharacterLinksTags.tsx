import {ICharacterLinksTagsProps} from "@features/character/CharacterLinksTags/model/types.ts";
import {Space, Tag} from "antd-mobile";
import {TeamFill} from "antd-mobile-icons";

export const CharacterLinksTags = (props: ICharacterLinksTagsProps) => {
    if (!props.characterLinks || props.characterLinks.length === 0) return
    return (
        <Space direction={"horizontal"} wrap={true} style={{lineHeight: 'normal', "--gap-vertical": '2px'}}>
            <TeamFill style={{color: '#888888', marginTop: '4px'}}/>
            {props.characterLinks?.map((charLink) =>
                <Tag
                    key={charLink.id}
                    style={{cursor: 'pointer', backgroundColor: '#AAAAAA', borderColor: '#999999'}}
                    color={"default"}
                >
                    {charLink.character?.name}
                </Tag>
            )}
        </Space>
    )
}
