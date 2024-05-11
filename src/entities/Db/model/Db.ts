import Dexie, { Table } from 'dexie'
import {ICharacter, ICharacterDictAttribute, ICharacterGroup} from "../../Character";
import {IWorld} from "../../World";


export class DbAdapter extends Dexie {

    characters!: Table<ICharacter>
    characterGroups!: Table<ICharacterGroup>
    characterAttributeDict!: Table<ICharacterDictAttribute>
    worlds!: Table<IWorld>

    constructor() {
        const DBDeleteRequest = window.indexedDB.deleteDatabase("writer");

        super('soulwriter');
        this.version(3).stores({
            characters: '++id, groupId, name, description, sex',
            characterGroups: '++id, title',
            characterAttributeDict: '++id, title',
            worlds: '++id, title',
        })
        this.characterGroups.count().then((count) => {
            if (count === 0){
                this.characterGroups.add({title: 'Основные'})
            }
        })

        this.characterAttributeDict.count().then((count) => {
            if (count === 0){

                this.characterAttributeDict.add({title: 'Рост'})
                this.characterAttributeDict.add({title: 'Отличительная особенность'})
                this.characterAttributeDict.add({title: 'Стиль одежды'})
                this.characterAttributeDict.add({title: 'Телосложение'})
                this.characterAttributeDict.add({title: 'Прическа'})
                this.characterAttributeDict.add({title: 'Черты лица'})
                this.characterAttributeDict.add({title: 'Цвет глаз'})
                this.characterAttributeDict.add({title: 'Этническая принадлежность'})
                this.characterAttributeDict.add({title: 'Возраст'})
            }
        })

        this.worlds.count().then((count) => {
            if (count === 0){
                this.worlds.add({title: 'Наша вселенная', description: 'Наша вселенная'})
            }
        })

    }
}

export const db = new DbAdapter();