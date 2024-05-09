import {useIndexedDB} from "react-indexed-db-hook";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ICharacter, ICharacterDictAttribute} from "../../../entities/Character";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../entities/Db/model/Db";

export const useCharacterViewForm = (characterId: number) => {

    const characterData = useLiveQuery(() => db.characters.get(characterId))
    const characterAttributeDict = useLiveQuery(() => db.characterAttributeDict.toArray())

    const changeBaseAttributeValue = (attributeName: string, newValue: string, character?: ICharacter) => {
        if (character){
            character[attributeName] = newValue
            db.characters.update(characterId, {...character})
        }
    }

    const changeDictAttributeValue = (dictAttributeId: string, newValue: string, character?: ICharacter) => {
        if (character){
            // Создаем массив атрибутов, если он не определен
            if (!character.dictAttributes) character.dictAttributes = []

            const dictAttribute = character.dictAttributes.find(
                (attr) => attr.id === dictAttributeId
            )

            if (dictAttribute){
                dictAttribute.value = newValue
                db.characters.update(characterId, {...character})
            }

        }
    }

    const deleteDictAttributeValue = (dictAttributeId: string, character?: ICharacter) => {
        if (character){
            // Создаем массив атрибутов, если он не определен
            if (!character.dictAttributes) character.dictAttributes = []
            character.dictAttributes = character.dictAttributes.filter((attr) => attr.id != dictAttributeId)
            db.characters.update(characterId, {...character})
        }
    }
    const appendDictAttribute = (dictAttribute: ICharacterDictAttribute, character?: ICharacter) => {
        if (!character) return

        if (!character.dictAttributes){
            character.dictAttributes = []
        }

        character.dictAttributes.push({
            id: dictAttribute.id,
            title: dictAttribute.title,
            value: ''
        })
        db.characters.update(characterId, {...character})
    }

    return {
        characterData,
        characterAttributeDict,
        appendDictAttribute,
        changeDictAttributeValue,
        changeBaseAttributeValue,
        deleteDictAttributeValue
    }
}
