import {useIndexedDB} from "react-indexed-db-hook";
import {useQuery} from "@tanstack/react-query";
import {ICharacter} from "../../../entities/Character";

export const useCharacterViewForm = (characterId: number) => {
    const dbCharacterSpace = useIndexedDB("characters")

    const useCharacterData = useQuery<ICharacter>({
        queryKey: ['character', characterId],
        queryFn: () => dbCharacterSpace.getByID(characterId)
    })

    return {
        useCharacterData
    }
}
