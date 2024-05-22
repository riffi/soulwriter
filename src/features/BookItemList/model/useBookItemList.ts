import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../entities/Db/model/Db.ts";
import {BookItemListMode} from "./types.ts";

export const useBookItemList = (parentId: number, bookId: number, mode: BookItemListMode, searchStr?: string) => {

    const bookItemList = useLiveQuery(() => {
            const searchStrClean = searchStr ? searchStr?.toLowerCase().trim() : ''

            if (mode === BookItemListMode.CHILDREN){
                return db.bookItems
                    .where("bookId")
                    .equals(bookId)
                    .and((bookItem) => bookItem.parentId === parentId)
                    .toArray()
            }
            else{
                return db.bookItems
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
        },
        [parentId, mode, searchStr]
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
