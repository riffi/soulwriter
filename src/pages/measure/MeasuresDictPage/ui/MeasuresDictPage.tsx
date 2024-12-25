import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {NeedSelectBook} from "@features/book/NeedSelectBook";
import {Card} from "antd-mobile";
import {MeasureKinds} from "@features/measure/MeasureKinds";

export const MeasuresDictPage = () => {
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return (
        <Card>
            <MeasureKinds bookId={currentBook.id}/>
        </Card>
    )
}