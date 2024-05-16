import {db} from "../../../entities/Db/model/Db.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {IBookItem} from "../../../entities/BookItem";

export const useBookItemViewForm = (bookId: number, bookItemId: number) => {
    const bookItem = useLiveQuery(() => db.bookItems.get(bookItemId), [bookItemId])

    const changeBaseAttributeValue = (attributeName: string, newValue: string, bookItem?: IBookItem) => {
        if (bookItem){
            bookItem[attributeName] = newValue
            db.bookItems.update(bookItemId, {...bookItem})
        }
    }

    return {
        bookItem,
        changeBaseAttributeValue
    }
}
