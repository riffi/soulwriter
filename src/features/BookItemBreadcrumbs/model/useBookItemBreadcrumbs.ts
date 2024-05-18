import {IBookItem} from "../../../entities/BookItem";
import {db} from "../../../entities/Db/model/Db.ts";
import {useLiveQuery} from "dexie-react-hooks";

export const useBookItemBreadcrumbs = (bookItem: IBookItem) => {

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
    }, [bookItem])

    return {
        breadcrumbs
    }
}