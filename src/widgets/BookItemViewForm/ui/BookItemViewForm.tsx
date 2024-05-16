import {IBookItemViewFormProps} from "../model/types.ts";
import {useBookItemViewForm} from "../model/useBookItemViewForm.ts";
import {List} from "antd-mobile";
import {InlineEdit} from "../../../shared/ui/InlineEdit";
import {InlineTextArea} from "../../../shared/ui/InlineTextArea/ui/InlineTextArea.tsx";
import {BookItemList} from "../../../features/BookItemList";
import {BookItemGroupList} from "../../../features/BookItemList/ui/BookItemGroupList.tsx";

export const BookItemViewForm = (props: IBookItemViewFormProps) => {
    const {
        bookItem,
        changeBaseAttributeValue
    } = useBookItemViewForm(props.bookId, props.bookItemId)
    if (!bookItem) return
    return (
        <>
            <List style={{"--border-top": "none", "--border-bottom": "none", "--font-size": "14px"}}>
                <List.Item title={bookItem.name} key={"name"}>
                    <InlineEdit
                        value={bookItem?.title}
                        onChange={(val) => changeBaseAttributeValue("title", val, bookItem)}
                    />
                </List.Item>
                <List.Item title={"Описание"} key={"description"}>
                    <InlineTextArea
                        value={bookItem?.description}
                        onChange={(val) => changeBaseAttributeValue("description", val, bookItem)}
                    />
                </List.Item>
            </List>

            <BookItemGroupList
                parentId={bookItem?.id}
                worldId={bookItem?.worldId}
                bookId={props.bookId}
                header={bookItem?.childrenHeader}
            />

        </>
    )
}
