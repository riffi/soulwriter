import {useLiveQuery} from "dexie-react-hooks";
import {dbSynonyms} from "../../../entities/Db/model/Synonym.ts";

export const useSynonymSearch = (text: string) => {
    const dictItems = useLiveQuery(() => dbSynonyms.dict
        .where("name")
        .startsWithIgnoreCase(text)
        .toArray(), [text]
    )

    return {
        dictItems
    }
}
