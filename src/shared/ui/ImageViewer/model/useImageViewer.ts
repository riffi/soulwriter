import {useLiveQuery} from "dexie-react-hooks";
import {fileDb} from "@entities/Db/model/fileDb.ts";

export const useImageViewer = (guid?: string) => {
    const file = useLiveQuery(() => {
        if (!guid) return

        return fileDb.files
                .where('guid')
                .equals(guid)
                .first()
        }, [guid]
    )

    return {
        file
    }
}
