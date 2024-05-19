import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../entities/Db/model/Db.ts";

export const useBookItemList = (parentId: number, bookId: number) => {

    const bookItemList = useLiveQuery(() => db.bookItems
        .where("bookId")
        .equals(bookId)
        .and((bookItem) => bookItem.parentId === parentId)
        .toArray(), [parentId]
    )

    const onSaveNewItem = (newItemTitle: string,
                           newItemType: string
    ) => {
        db.bookItems.add({
            bookId: bookId,
            parentId: parentId,
            type: newItemType,
            title: newItemTitle,
            description: '',
        })
    }

    return {
        bookItemList,
        onSaveNewItem
    }
}
