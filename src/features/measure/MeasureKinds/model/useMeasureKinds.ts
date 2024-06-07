import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";

export const useMeasureKinds = (bookId: number) => {

    const measureKinds = useLiveQuery(() => db.measureKinds
        .where('bookId')
        .equals(bookId)
        .toArray(), [bookId]
    )

    const addMeasureKind = (title: string) => {
        db.measureKinds.add({
            bookId: bookId,
            title: title
        })
    }

    return {
        measureKinds,
        addMeasureKind
    }
}
