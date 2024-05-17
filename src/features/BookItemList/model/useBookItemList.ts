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
                           newItemName: string
    ) => {
        db.bookItems.add({
            bookId: bookId,
            worldId: worldId,
            parentId: parentId,
            name: newItemName,
            title: newItemTitle,
            description: '',
        })
    }

    return {
        bookItemList,
        onSaveNewItem
    }
}
