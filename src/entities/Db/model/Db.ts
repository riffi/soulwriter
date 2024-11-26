import Dexie, {Table} from 'dexie'
import {ICharacter, ICharacterDictAttribute, ICharacterGroup, ICharacterLink} from "../../Character";
import {IBook} from "../../Book";
import {
    IScene,
    ISceneCharacters, ISceneCheck,
    ISceneCheckState,
    ISceneLink,
    ISceneNote,
    ISceneState
} from "../../Scene";
import {IBookItem, IKnowledge, IKnowledgeLink} from "../../BookItem";
import {IStoryLine, IStoryLineCharacter, IStoryLineItem} from "@entities/StoryLine/models/types.ts";
import {IMeasure, IMeasureKind, IMeasureRadio} from "@entities/Measure";

Dexie.debug = true;
export class DbAdapter extends Dexie {

    characters!: Table<ICharacter>
    characterGroups!: Table<ICharacterGroup>
    characterAttributeDict!: Table<ICharacterDictAttribute>
    books!: Table<IBook>
    scenes!: Table<IScene>
    sceneNotes!: Table<ISceneNote>
    sceneCharacters!: Table<ISceneCharacters>
    bookItems!: Table<IBookItem>
    knowledge!: Table<IKnowledge>
    knowledgeLinks!: Table<IKnowledgeLink>
    sceneLinks!: Table<ISceneLink>
    sceneChecks!: Table<ISceneCheck>
    sceneCheckStates!: Table<ISceneCheckState>
    sceneStates!: Table<ISceneState>
    characterLinks!: Table<ICharacterLink>
    storyLines!: Table<IStoryLine>
    storyLineCharacters!: Table<IStoryLineCharacter>
    storyLineItems!: Table<IStoryLineItem>
    measureKinds!: Table<IMeasureKind>
    measures!: Table<IMeasure>
    measureRatios!: Table<IMeasureRadio>

    static currentDbSchema: { [tableName: string]: string | null } =  {
        characters: '++id, groupId, name, description, sex, bookId',
        characterGroups: '++id, title, bookId',
        characterAttributeDict: '++id, title, bookId',
        worlds: '++id, title, bookId',
        books: '++id, title, description, author',
        scenes: '++id, title, bookId, sortOrderId, dayStart, dayEnd, stateId',
        sceneCharacters: '++id, sceneId, characterId',
        sceneStates: '++id, bookId, isDefault',
        sceneChecks: '++id, sceneId, bookId',
        sceneNotes: '++id, sceneId',
        sceneCheckStates: '++id, sceneId, bookId, sceneCheckId',
        bookItems: '++id, bookId, parentId, type, needMention, sortOrderId',
        knowledge: '++id, bookItemId',
        knowledgeLinks: '++id, knowledgeId, characterId, sceneId',
        sceneLinks: '++id, sceneId, bookId, bookItemId',
        characterLinks: '++id, characterId, sceneLinkId',
        storyLines: '++id, title, bookId',
        storyLineCharacters: '++id, storyLineId, characterId',
        storyLineItems: '++id, storyLineId, sceneId',
        measureKinds: '++id, title, bookId',
        measures: '++id, kindId, title',
        measureRatios: '++id, measureId, targetMeasureId'

    }

    static currentVersion = 6

    constructor() {
        super('soulwriter');
        this.version(DbAdapter.currentVersion).stores(DbAdapter.currentDbSchema)

    }
}


export const db = new DbAdapter();
