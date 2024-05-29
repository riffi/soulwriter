import {IBookItemLinksProps} from "../model/types.ts";
import {List} from "antd-mobile";
import {useBookItemLinks} from "../model/useBookItemLinks.ts";
import {useNavigate} from "react-router-dom";
import {CharacterLinksTags} from "@features/character/CharacterLinksTags";

export const BookItemLinks = (props: IBookItemLinksProps) => {

    const {bookItemLinkList} = useBookItemLinks(props.bookItemId)

    const navigate = useNavigate()

    return (
        <List>
            {bookItemLinkList?.map((link) =>
                <List.Item
                    title={
                        `Сцена ${link?.sceneData?.sortOrderId}`
                    }
                    description={link?.sceneData?.title}
                    clickable={true}
                    onClick={() => navigate(`/scene/card?id=${link?.sceneId}`)}
                >
                    <div>{link.title}</div>
                    <CharacterLinksTags characterLinks={link.characterLinks}/>
                </List.Item>
            )}
        </List>
    )
}
