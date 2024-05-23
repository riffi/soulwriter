import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {setCurrentBook} from "@features/BookContext/bookContextSlice.ts";

export const useBookViewForm = (bookId: number) => {

    const book = useLiveQuery(() => db.books.get(bookId), [bookId])

    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)
    const dispatch = useDispatch()

    const changeAttributeValue = <T> (attributeName: string, newValue: T) => {
        if (book){
            book[attributeName] = newValue
            db.books.update(bookId, {...book})
            if (bookId === currentBook?.id){
                dispatch(setCurrentBook(book))
            }
        }
    }


    return {
        book,
        changeAttributeValue
    }
}
