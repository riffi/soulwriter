import {useIndexedDB} from "react-indexed-db-hook";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ICharacter, ICharacterDictAttribute, ICharacterDictAttributeWithValue} from "../../../entities/Character";
import {Dialog} from "antd-mobile";

export const useCharacterViewForm = (characterId: number) => {
    const dbCharacterSpace = useIndexedDB("characters")

    const queryClient = useQueryClient()

    const dbCharacterAttributeSpace = useIndexedDB("characterAttributes")

    const useCharacterData = useQuery<ICharacter>({
        queryKey: ['character', characterId],
        queryFn: () => dbCharacterSpace.getByID(characterId)
    })

    const useCharacterAttributeDict = useQuery<ICharacterDictAttribute[]>({
        queryKey: ['characterAttributeDict', 'list'],
        queryFn: () => dbCharacterAttributeSpace.getAll()
    })

    const updateCharacter = useMutation({
        mutationFn: async (characterData: ICharacter) => dbCharacterSpace.update(characterData),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['character', characterId]})
    });


    const changeBaseAttributeValue = (attributeName: string, newValue: string, character?: ICharacter) => {
        if (character){
            character[attributeName] = newValue
            updateCharacter.mutate(character)
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
                updateCharacter.mutate(character)
            }

        }
    }

    const deleteDictAttributeValue = (dictAttributeId: string, character?: ICharacter) => {
        if (character){
            character.dictAttributes = character.dictAttributes.filter((attr) => attr.id != dictAttributeId)
            updateCharacter.mutate(character)
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
        updateCharacter.mutate(character)
    }

    return {
        useCharacterData,
        useCharacterAttributeDict,
        appendDictAttribute,
        changeDictAttributeValue,
        changeBaseAttributeValue,
        deleteDictAttributeValue
    }
}
