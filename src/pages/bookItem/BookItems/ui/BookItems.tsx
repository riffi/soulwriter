import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {NeedSelectBook} from "@features/NeedSelectBook";
import {BookItemManager} from "@widgets/BookItemManager";


export const BookItems = () => {
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return (
        <>
            <BookItemManager/>
        </>
    )
}
