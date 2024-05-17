import {db} from "../../../entities/Db/model/Db.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {IBookItem} from "../../../entities/BookItem";

export const useBookItemViewForm = (bookId: number, bookItemId: number) => {
    const bookItem = useLiveQuery(() => db.bookItems.get(bookItemId), [bookItemId])

    const world = useLiveQuery(
        () => {
            if (bookItem?.worldId){
                return db.worlds.get(bookItem?.worldId)
            }
            else{
                return undefined
            }
        },
        [bookItem?.worldId]
    )

    const childCount = useLiveQuery(() => db.bookItems
        .where("parentId")
        .equals(bookItemId)
        .count()
        , [bookItemId]
    )

    const breadCrumbsFiller = async () => {
        const result: IBookItem[] = []
        if (!bookItem) return  result
        let current = bookItem
        while (current?.parentId != -1){
            const parent = await db.bookItems.get(current?.parentId)
            if (parent){
                result.push(parent)
                current = parent
            }

        }

        return result.reverse()
    }

    const breadcrumbs = useLiveQuery(() => {
        return breadCrumbsFiller()
    }, [bookItem, bookItemId])

    const changeBaseAttributeValue = (attributeName: string, newValue: string, bookItem?: IBookItem) => {
        if (bookItem){
            bookItem[attributeName] = newValue
            db.bookItems.update(bookItemId, {...bookItem})
        }
    }

    return {
        bookItem,
        childCount,
        world,
        breadcrumbs,
        changeBaseAttributeValue
    }
}
