import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {NeedSelectBook} from "@features/book/NeedSelectBook";
import {Card} from "antd-mobile";
import {CharacterAttributeManager} from "@widgets/CharacterAttributeManager";

export const CharacterAttributesPage = () => {
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return (
        <Card>
            <CharacterAttributeManager
                bookId = {currentBook.id}
            />
        </Card>
    )
}