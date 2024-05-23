import {IBookItem} from "@entities/BookItem";
import {db} from "@entities/Db/model/Db.ts";
import {useLiveQuery} from "dexie-react-hooks";

export const useBookItemBreadcrumbs = (bookItemId: number) => {

    const breadCrumbsFiller = async () => {
        const result: IBookItem[] = []
        if (!bookItemId || bookItemId === -1) return  result
        let current = await db.bookItems.get(bookItemId)
        if (current){
            result.push(current)
        }
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
    }, [bookItemId])

    return {
        breadcrumbs
    }
}
