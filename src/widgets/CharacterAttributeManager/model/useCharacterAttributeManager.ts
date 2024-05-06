import {useIndexedDB} from "react-indexed-db-hook";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ICharacterDictAttribute} from "../../../entities/Character";

export const useCharacterAttributeManager = () => {

    const dbCharacterAttributeSpace = useIndexedDB("characterAttributes")
    const queryClient = useQueryClient()

    const useCharacterAttributeDict = useQuery<ICharacterDictAttribute[]>({
        queryKey: ['characterAttributeDict', 'list'],
        queryFn: () => dbCharacterAttributeSpace.getAll()
    })

    const addCharacterAttribute = useMutation({
        mutationFn: async (characterDictAttribute: ICharacterDictAttribute) => dbCharacterAttributeSpace.add(characterDictAttribute),
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ['characterAttributeDict', 'list']})
        },
        onError: error => {
            console.error(error);
        },
    });

    const onSaveNewAttribute = (title: string) => {
        const characterDistAttribute: ICharacterDictAttribute = {
            title
        }
        addCharacterAttribute.mutate(characterDistAttribute)
    }

    return {
        useCharacterAttributeDict,
        onSaveNewAttribute
    }
}
