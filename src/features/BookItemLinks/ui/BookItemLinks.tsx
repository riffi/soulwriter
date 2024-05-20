import {IBookItemLinksProps} from "../model/types.ts";
import {List} from "antd-mobile";
import {useBookItemLinks} from "../model/useBookItemLinks.ts";
import {useNavigate} from "react-router-dom";

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
                    {link.title}
                </List.Item>
            )}
        </List>
    )
}
