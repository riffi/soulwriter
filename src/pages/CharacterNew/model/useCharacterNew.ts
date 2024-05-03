import {ICharacterNewFormValues} from "./type.ts";
import {useMutation} from "@tanstack/react-query";
import {ICharacter} from "../../../entities/Character";
import {useIndexedDB} from "react-indexed-db-hook";
import {Dialog} from "antd-mobile";
import {useNavigate} from "react-router-dom";

export const useCharacterNew = () => {

    const dbCharacterSpace = useIndexedDB("characters")

    const navigate = useNavigate()
    const getInitialValues = (): ICharacterNewFormValues => {
        return {
            name: '',
            description: '',
            sex: ['male'],
        }
    }

    const addCharacter = useMutation({
        mutationFn: async (characterData: ICharacter) => dbCharacterSpace.add(characterData),
        onError: error => {
            Dialog.alert({
                title: error.message
            });
        },
        onSuccess: () => navigate("/characters")
    });


    const onSubmitNewCharacter = (formData: ICharacterNewFormValues) => {
        const characterData: ICharacter = {
            name: formData.name,
            description: formData.description,
            sex: formData.sex[0],
        }
        addCharacter.mutate(characterData)
    }

    return {
        getInitialValues,
        onSubmitNewCharacter
    }
}
