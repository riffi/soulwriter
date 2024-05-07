import {useIndexedDB} from "react-indexed-db-hook";
import {useQuery} from "@tanstack/react-query";
import {ICharacterGroup} from "../../../entities/Character";

export const useCharactersManager= () => {

    const dbCharacterGroupsSpace = useIndexedDB("characterGroups")

    const useCharacterGroupList = useQuery<ICharacterGroup[]>({
        queryKey: ['characterGroup', 'list'],
        queryFn: () => dbCharacterGroupsSpace.getAll()
    })

    return {
        useCharacterGroupList
    }
}
