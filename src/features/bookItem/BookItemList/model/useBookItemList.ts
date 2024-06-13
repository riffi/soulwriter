import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {BookItemListMode} from "./types.ts";
import {IBookItem, IBookItemShiftDirection} from "@entities/BookItem";

export const useBookItemList = (parentId: number,
                                bookId: number,
                                mode: BookItemListMode,
                                searchStr?: string,
                                needMention: boolean) => {

    const bookItemList = useLiveQuery(async () => {
            const searchStrClean = searchStr ? searchStr?.toLowerCase().trim() : ''

            if (mode === BookItemListMode.CHILDREN){
                return db.bookItems
                    .where("bookId")
                    .equals(bookId)
                    .and((bookItem) => bookItem.parentId === parentId)
                    .sortBy("sortOrderId")
            }
            else{
                return db.bookItems
                    .where("bookId")
                    .equals(bookId)
                    .and((bookItem) => {
                        if (!searchStr && !needMention) return true
                        const searchStrOverlap = (bookItem.title.toLowerCase().indexOf(searchStrClean) != -1)
                            || (bookItem.type.toLowerCase().indexOf(searchStrClean) != -1)

                        const needMentionOverlap = !needMention || bookItem.needMention
                        return searchStrOverlap && needMentionOverlap
                    }
                    )
                    .sortBy("title")

            }
        },
        [parentId, mode, searchStr, needMention]
    )

    const shiftItem = async (itemToShift: IBookItem, direction: IBookItemShiftDirection) => {
        const bookItems: IBookItem[] = [...bookItemList]
        if (!itemToShift.sortOrderId){
            bookItems.forEach((item, index) => {
                item.sortOrderId = index + 1
            })
        }


        let newSortOrderId = itemToShift.sortOrderId
        if (direction === IBookItemShiftDirection.DOWN){
            newSortOrderId = itemToShift.sortOrderId + 1
        }
        else{
            newSortOrderId = itemToShift.sortOrderId - 1
        }

        bookItems.splice(itemToShift.sortOrderId - 1, 1)
        bookItems.splice(newSortOrderId - 1, 0, itemToShift)
        bookItems.forEach((item, index) => {
            db.bookItems.update(item.id, {sortOrderId: index + 1})
        })
    }

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
        shiftItem,
        onSaveNewItem
    }
}
