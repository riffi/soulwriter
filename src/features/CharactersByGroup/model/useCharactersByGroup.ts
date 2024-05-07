import {useQuery} from "@tanstack/react-query";
import {ICharacter} from "../../../entities/Character";
import {useIndexedDB} from "react-indexed-db-hook";

export const useCharactersByGroup = (characterGroupId: string) => {
    const dbCharacterSpace = useIndexedDB("characters")

    const useCharacterList = useQuery<ICharacter[]>({
        queryKey: ['character', 'byGroup', characterGroupId],
        queryFn: () => dbCharacterSpace.getAll()
    })

    return {
        useCharacterList
    }
}
