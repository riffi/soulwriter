import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../entities/Db/model/Db.ts";
import {BookItemListMode} from "../../BookItemList";

export const useBookItemSelector = (parentBookItemId: number, bookId: number, mode: BookItemListMode, searchStr?: string) => {
    const bookItemList = useLiveQuery(async () => {
        const searchStrClean = searchStr ? searchStr?.toLowerCase().trim() : ''
        let bookItems = []

        if (mode === BookItemListMode.CHILDREN) {

            if (!parentBookItemId) return []

            bookItems = await db.bookItems
                .where("parentId")
                .equals(parentBookItemId)
                .and((bookItem) => bookItem?.bookId === bookId).toArray()

        }

        else{
            bookItems = await db.bookItems
                .where("bookId")
                .equals(bookId)
                .and((bookItem) => {
                        if (!searchStr) return true
                        return (bookItem.title.toLowerCase().indexOf(searchStrClean) != -1)
                            || (bookItem.type.toLowerCase().indexOf(searchStrClean) != -1)
                    }
                )
                .sortBy("title")
        }

        await Promise.all (bookItems?.map (async bookItem => {
            [bookItem.childCount] = await Promise.all([
                db.bookItems.where('parentId').equals(bookItem.id).count()
            ]);
        }))

        return bookItems
        }, [parentBookItemId, bookId, mode, searchStr]
    )


    return {
        bookItemList
    }


}
