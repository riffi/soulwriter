import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../entities/Db/model/Db.ts";

export const useBookItemSelector = (parentBookItemId: number, bookId: number) => {
    const bookItemList = useLiveQuery(async () => {
        if (!parentBookItemId) return  []

        const bookItems = await db.bookItems
            .where("parentId")
            .equals(parentBookItemId)
            .and((bookItem) => bookItem?.bookId === bookId).toArray()

        await Promise.all (bookItems?.map (async bookItem => {
            [bookItem.childCount] = await Promise.all([
                db.bookItems.where('parentId').equals(bookItem.id).count()
            ]);
        }))

        return bookItems

        }, [parentBookItemId, bookId]
    )


    return {
        bookItemList
    }


}