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

    const shiftItem = async (itemToShift: IBookItem, direction: IBookItemShiftDirection, currentIndex: number) => {
        const bookItems: IBookItem[] = [...bookItemList]

        let newSortOrderId = currentIndex
        if (direction === IBookItemShiftDirection.DOWN){
            newSortOrderId = currentIndex + 1
        }
        else{
            newSortOrderId = currentIndex - 1
        }

        bookItems.splice(currentIndex, 1)
        bookItems.splice(newSortOrderId, 0, itemToShift)
        bookItems.forEach((item, index) => {
            db.bookItems.update(item.id, {sortOrderId: index})
        })
    }

    const onSaveNewItem = (newItemTitle: string,
                           newItemType: string
    ) => {
        if (!bookItemList) return

        db.bookItems.add({
            bookId: bookId,
            parentId: parentId,
            type: newItemType,
            title: newItemTitle,
            description: '',
            sortOrderId: bookItemList.length + 1
        })
    }

    return {
        bookItemList,
        shiftItem,
        onSaveNewItem
    }
}
