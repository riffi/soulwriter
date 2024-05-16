import Dexie, {Table} from 'dexie'
import {ICharacter, ICharacterDictAttribute, ICharacterGroup} from "../../Character";
import {IWorld} from "../../World";
import {IBook} from "../../Book";
import {IScene, ISceneCharacters} from "../../Scene";
import {IBookItem} from "../../BookItem";


export class DbAdapter extends Dexie {

    characters!: Table<ICharacter>
    characterGroups!: Table<ICharacterGroup>
    characterAttributeDict!: Table<ICharacterDictAttribute>
    worlds!: Table<IWorld>
    books!: Table<IBook>
    scenes!: Table<IScene>
    sceneCharacters!: Table<ISceneCharacters>
    bookItems!: Table<IBookItem>

    static currentDbSchema: { [tableName: string]: string | null } =  {
        characters: '++id, groupId, name, description, sex, bookId',
        characterGroups: '++id, title, bookId',
        characterAttributeDict: '++id, title, bookId',
        worlds: '++id, title, bookId',
        books: '++id, title, description, author',
        scenes: '++id, title, bookId, sortOrderId',
        sceneCharacters: '++id, sceneId, characterId',
        bookItems: '++id, bookId, parentId, isGroup, worldId'
    }

    static currentVersion = 6

    constructor() {
        super('soulwriter');
        this.version(DbAdapter.currentVersion).stores(DbAdapter.currentDbSchema)

    }
}


export const db = new DbAdapter();
