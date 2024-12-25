import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {NeedSelectBook} from "@features/book/NeedSelectBook";
import {Card} from "antd-mobile";
import {SceneCheckDict} from "@features/scene/SceneCheckDict";

export const CheckListDict = () => {
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return (
        <Card>
            <SceneCheckDict
                bookId = {currentBook.id}
            />
        </Card>
    )
}