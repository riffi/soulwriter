import Dexie, { Table } from 'dexie'
import {ICharacter, ICharacterDictAttribute, ICharacterGroup} from "../../Character";
import {IWorld} from "../../World";
import {IBook} from "../../Book";


export class DbAdapter extends Dexie {

    characters!: Table<ICharacter>
    characterGroups!: Table<ICharacterGroup>
    characterAttributeDict!: Table<ICharacterDictAttribute>
    worlds!: Table<IWorld>
    books!: Table<IBook>

    constructor() {
        const DBDeleteRequest = window.indexedDB.deleteDatabase("writer");

        super('soulwriter');
        this.version(5).stores({
            characters: '++id, groupId, name, description, sex, bookId',
            characterGroups: '++id, title, bookId',
            characterAttributeDict: '++id, title, bookId',
            worlds: '++id, title, bookId',
            books: '++id, title, description, author',
        })

    }
}

export const db = new DbAdapter();