import Dexie, {Table} from "dexie";
import {ISynonymDictItem, ISynonymDictJson} from "../../Synonym";
import dictJson from "../data/dictionary.json"

export class SynonymDbAdapter extends Dexie {

    dict!: Table<ISynonymDictItem>


    static currentDbSchema: { [tableName: string]: string | null } =  {
        dict: '++id, name',
    }

    static currentVersion = 1

    constructor() {
        super('synonyms');
        this.version(SynonymDbAdapter.currentVersion)
            .stores(SynonymDbAdapter.currentDbSchema)
        this.dict.count().then((count)=>{
            if (count === 0){
                const dictJsonStruct: ISynonymDictJson = dictJson
                return this.dict.bulkAdd(
                    dictJsonStruct.wordlist
                )
            }
        })

    }
}


export const dbSynonyms = new SynonymDbAdapter();
