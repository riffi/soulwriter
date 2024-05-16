import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../entities/Db/model/Db.ts";

export const useBookItemList = (parentId: number, worldId: number, bookId: number) => {

    const bookItemList = useLiveQuery(() => db.bookItems
        .where("worldId")
        .equals(worldId)
        .and((bookItem) => bookItem.parentId === parentId)
        .toArray(), [parentId]
    )

    const onSaveNewItem = (newItemTitle: string,
                           newItemName: string,
                           newChildrenHeader: string,
                           newIsGroup: boolean
    ) => {
        db.bookItems.add({
            bookId: bookId,
            worldId: worldId,
            parentId: parentId,
            name: newItemName,
            title: newItemTitle,
            description: '',
            isGroup: newIsGroup,
            childrenHeader: newChildrenHeader
        })
    }

    return {
        bookItemList,
        onSaveNewItem
    }
}
