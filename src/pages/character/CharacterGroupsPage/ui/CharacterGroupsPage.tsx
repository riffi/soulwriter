import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {NeedSelectBook} from "@features/book/NeedSelectBook";
import {CharacterGroupManager} from "@widgets/CharacterGroupManager";
import {Card} from "antd-mobile";

export const CharacterGroupsPage = () => {
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return (
        <Card>
            <CharacterGroupManager
                bookId = {currentBook.id}
            />
        </Card>
    )
}