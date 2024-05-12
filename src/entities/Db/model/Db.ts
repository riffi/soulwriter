import Dexie, {Table, Version} from 'dexie'
import {ICharacter, ICharacterDictAttribute, ICharacterGroup} from "../../Character";
import {IWorld} from "../../World";
import {IBook} from "../../Book";


export class DbAdapter extends Dexie {

    characters!: Table<ICharacter>
    characterGroups!: Table<ICharacterGroup>
    characterAttributeDict!: Table<ICharacterDictAttribute>
    worlds!: Table<IWorld>
    books!: Table<IBook>

    static currentDbSchema: { [tableName: string]: string | null } =  {
        characters: '++id, groupId, name, description, sex, bookId',
        characterGroups: '++id, title, bookId',
        characterAttributeDict: '++id, title, bookId',
        worlds: '++id, title, bookId',
        books: '++id, title, description, author',
    }

    static currentVersion = 5

    constructor() {
        const DBDeleteRequest = window.indexedDB.deleteDatabase("writer");

        super('soulwriter');
        this.version(DbAdapter.currentVersion).stores(DbAdapter.currentDbSchema)

    }
}


export const db = new DbAdapter();