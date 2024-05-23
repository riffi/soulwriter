import {useSearchParams} from "react-router-dom";
import {BookViewForm} from "@widgets/BookVewForm";

export const BookCard = () => {
    const [searchParams] = useSearchParams();
    const bookId = Number(searchParams.get('id'))
    return (
        <>
            <BookViewForm bookId={bookId}/>
        </>
    )
}
