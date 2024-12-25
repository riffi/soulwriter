import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {NeedSelectBook} from "@features/book/NeedSelectBook";
import {Card} from "antd-mobile";
import {SceneStateDict} from "@features/scene/SceneStateDict/ui/SceneStateDict.tsx";

export const SceneStatusesDict = () => {
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return (
        <Card>
            <SceneStateDict
                bookId = {currentBook.id}
            />
        </Card>
    )
}