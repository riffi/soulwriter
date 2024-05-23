import {ImageUploadItem} from "antd-mobile";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@entities/Db/model/Db.ts";
import {ICharacter, ICharacterDictAttribute} from "@entities/Character";
import {toBase64} from "../lib/imageUtils.ts";

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

    const changeAttributeValue = (dictAttribute: ICharacterDictAttribute, newValue: string) => {
        if (characterData){
            // Создаем массив атрибутов, если он не определен
            if (!characterData.dictAttributes) characterData.dictAttributes = []

            const charAttribute = characterData.dictAttributes.find(
                (attr) => attr.id === dictAttribute?.id
            )

            if (charAttribute){
                charAttribute.value = newValue
                db.characters.update(characterId, {...characterData})
            }

        }
    }

    const deleteDictAttribute = (dictAttribute: ICharacterDictAttribute) => {
        if (characterData){
            // Создаем массив атрибутов, если он не определен
            if (!characterData.dictAttributes) characterData.dictAttributes = []
            characterData.dictAttributes = characterData.dictAttributes.filter((attr) => attr.id != dictAttribute.id)
            db.characters.update(characterId, {...characterData})
        }
    }
    const appendDictAttribute = (dictAttribute: ICharacterDictAttribute) => {
        if (!characterData) return

        if (!characterData.dictAttributes){
            characterData.dictAttributes = []
        }

        characterData.dictAttributes.push({
            id: dictAttribute.id,
            title: dictAttribute.title,
            value: '',
            bookId: bookId
        })
        db.characters.update(characterId, {...characterData})
    }

    const onUploadCharacterAvatar = async (file: File): Promise<ImageUploadItem> => {
        toBase64(file, 512, 512).then((base64: string) => {
            changeBaseAttributeValue("avatar", base64, characterData)
        })
        return {
            url: URL.createObjectURL(file),
        }
    }

    const onDeleteAvatar =  (item: ImageUploadItem):  boolean | void | Promise<boolean> => {
        changeBaseAttributeValue("avatar", '', characterData)
        return true
    }

    return {
        characterData,
        characterGroups,
        characterAttributeDict,
        appendDictAttribute,
        changeAttributeValue,
        changeBaseAttributeValue,
        deleteDictAttribute,
        onUploadCharacterAvatar,
        onDeleteAvatar
    }
}
