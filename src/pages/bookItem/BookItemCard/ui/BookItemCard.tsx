import {useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {NeedSelectBook} from "@features/book/NeedSelectBook";
import {BookItemViewForm} from "@widgets/BookItemViewForm/ui/BookItemViewForm.tsx";
export const BookItemCard = () => {
    const [searchParams] = useSearchParams();
    const bookItemId = Number(searchParams.get('id'))
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>
    return (
        <>
            <BookItemViewForm bookItemId={bookItemId} bookId={currentBook.id}/>
        </>
    )
}
