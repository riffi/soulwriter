import Dexie, {Table} from 'dexie'
import {IFile} from "@entities/File";


export class FileDbAdapter extends Dexie {

    files!: Table<IFile>


    static currentDbSchema: { [tableName: string]: string | null } =  {
        files: '++id, guid',
    }

    static currentVersion = 1

    constructor() {
        super('soulwriterFiles');
        this.version(FileDbAdapter.currentVersion).stores(FileDbAdapter.currentDbSchema)

    }
}


export const fileDb = new FileDbAdapter();
