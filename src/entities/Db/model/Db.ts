import Dexie, {Table} from 'dexie'
import {ICharacter, ICharacterDictAttribute, ICharacterGroup, ICharacterLink} from "../../Character";
import {IWorld} from "../../World";
import {IBook} from "../../Book";
import {IScene, ISceneCharacters, ISceneLink} from "../../Scene";
import {IBookItem} from "../../BookItem";
import {IStoryLine, IStoryLineCharacter, IStoryLineItem} from "@entities/StoryLine/models/types.ts";


export class DbAdapter extends Dexie {

    characters!: Table<ICharacter>
    characterGroups!: Table<ICharacterGroup>
    characterAttributeDict!: Table<ICharacterDictAttribute>
    books!: Table<IBook>
    scenes!: Table<IScene>
    sceneCharacters!: Table<ISceneCharacters>
    bookItems!: Table<IBookItem>
    sceneLinks!: Table<ISceneLink>
    characterLinks!: Table<ICharacterLink>
    storyLines!: Table<IStoryLine>
    storyLineCharacters!: Table<IStoryLineCharacter>
    storyLineItems!: Table<IStoryLineItem>

    static currentDbSchema: { [tableName: string]: string | null } =  {
        characters: '++id, groupId, name, description, sex, bookId',
        characterGroups: '++id, title, bookId',
        characterAttributeDict: '++id, title, bookId',
        worlds: '++id, title, bookId',
        books: '++id, title, description, author',
        scenes: '++id, title, bookId, sortOrderId, dayStart, dayEnd',
        sceneCharacters: '++id, sceneId, characterId',
        bookItems: '++id, bookId, parentId, type, needMention',
        sceneLinks: '++id, sceneId, bookId, bookItemId',
        characterLinks: '++id, characterId, sceneLinkId',
        storyLines: '++id, title, bookId',
        storyLineCharacters: '++id, storyLineId, characterId',
        storyLineItems: '++id, storyLineId, sceneId'
    }

    static currentVersion = 6

    constructor() {
        super('soulwriter');
        this.version(DbAdapter.currentVersion).stores(DbAdapter.currentDbSchema)

    }
}


export const db = new DbAdapter();
