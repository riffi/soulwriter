import {useSearchParams} from "react-router-dom";
import {WorldViewForm} from "../../../../widgets/WorldViewForm"
import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {NeedSelectBook} from "../../../../features/NeedSelectBook";
export const WorldCard = () => {
    const [searchParams] = useSearchParams();
    const worldId = Number(searchParams.get('id'))
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>
    return (
        <>
            <WorldViewForm worldId={worldId} bookId={currentBook.id}/>
        </>
    )
}
