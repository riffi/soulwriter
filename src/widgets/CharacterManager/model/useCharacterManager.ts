import {useMutation, useQuery} from "@tanstack/react-query";
import {ICharacter} from "../../../entities/Character";
import {useIndexedDB} from "react-indexed-db-hook";

export const useCharacterManager = () => {

    const dbCharacterSpace = useIndexedDB("characters")

    const useCharacterList = useQuery<ICharacter[]>({
        queryKey: ['character', 'list'],
        queryFn: () => dbCharacterSpace.getAll()
    })

    // const addCharacter = useMutation({
    //     mutationFn: async (characterData: ICharacter) => dbCharacterSpace.add(characterData),
    //     onError: error => {
    //         toast.error(error.message);
    //         console.error(error);
    //     },
    // });

    return {
        useCharacterList
    }
}
