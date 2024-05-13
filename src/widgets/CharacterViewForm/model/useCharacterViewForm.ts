import {useIndexedDB} from "react-indexed-db-hook";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ICharacter, ICharacterDictAttribute} from "../../../entities/Character";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../entities/Db/model/Db";

export const useCharacterViewForm = (characterId: number, bookId: number) => {

    const characterData = useLiveQuery(() => db.characters.get(characterId))
    const characterAttributeDict = useLiveQuery(() => db.characterAttributeDict
        .where("bookId")
        .equals(bookId)
        .toArray(), [characterData])
    const characterGroups = useLiveQuery(() => db.characterGroups
        .where("bookId")
        .equals(bookId)
        .toArray())

    const changeBaseAttributeValue = (attributeName: string, newValue: string, character?: ICharacter) => {
        if (character){
            character[attributeName] = newValue
            db.characters.update(characterId, {...character})
        }
    }

    const changeDictAttributeValue = (dictAttributeId: number, newValue: string, character?: ICharacter) => {
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

    const deleteDictAttributeValue = (dictAttributeId: number, character?: ICharacter) => {
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
            value: '',
            bookId: bookId
        })
        db.characters.update(characterId, {...character})
    }

    return {
        characterData,
        characterGroups,
        characterAttributeDict,
        appendDictAttribute,
        changeDictAttributeValue,
        changeBaseAttributeValue,
        deleteDictAttributeValue
    }
}
