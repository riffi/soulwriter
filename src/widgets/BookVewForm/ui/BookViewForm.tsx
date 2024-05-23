import {IBookViewFormProps} from "../model/types.ts";
import {Card, List} from "antd-mobile";
import {useBookViewForm} from "../model/useBookViewForm.ts";
import {InlineEdit} from "../../../shared/ui/InlineEdit";
import {InlineTextArea} from "../../../shared/ui/InlineTextArea/ui/InlineTextArea.tsx";
import {InlineStepper} from "../../../shared/ui/InlineStepper";

export const BookViewForm = (props: IBookViewFormProps) => {
    const {
        book,
        changeAttributeValue
    } = useBookViewForm(props.bookId)

     if (!book) return

    return (
        <Card>
            <List>
                <List.Item title={"Название"}>
                    <InlineEdit
                        value={book.title}
                        onChange={(val) => changeAttributeValue("title", val)}
                    />
                </List.Item>
                <List.Item title={"Автор"}>
                    <InlineEdit
                        value={book.author}
                        onChange={(val) => changeAttributeValue("author", val)}
                    />
                </List.Item>
                <List.Item title={"Описание"}>
                    <InlineTextArea
                        value={book.description}
                        onChange={(val) => changeAttributeValue("description", val)}
                    />
                </List.Item>

                <List.Item title={"Ожидаемое количество символов"}>
                    <InlineStepper
                        value={book.targetSymbolCount}
                        onChange={(val) => changeAttributeValue("targetSymbolCount", val)}
                    />
                </List.Item>
            </List>
        </Card>
    )
}
