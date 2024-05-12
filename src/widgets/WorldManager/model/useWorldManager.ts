import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../entities/Db/model/Db.ts";
import {IWorld} from "../../../entities/World";
import {IBook} from "../../../entities/Book";

export const useWorldManager = (book: IBook) => {
    const worldList = useLiveQuery(() => db.worlds
        .where("bookId")
        .equals(book.id)
        .toArray())

    const onSaveNewWorld = (title: string) => {
        const world: IWorld = {
            bookId: book?.id,
            title,
            description: ''
        }
        db.worlds.add(world)
    }

    return {
        worldList,
        onSaveNewWorld
    }
}