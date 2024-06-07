import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {NeedSelectBook} from "@features/book/NeedSelectBook";
import {MeasureKindViewForm} from "@widgets/measure/MeasureKindViewForm";

export const MeasureKindCard = () => {
    const [searchParams] = useSearchParams();
    const measureKindId = Number(searchParams.get('id'))
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return (
        <>
            <MeasureKindViewForm measureKindId={measureKindId}/>
        </>
    )

}
