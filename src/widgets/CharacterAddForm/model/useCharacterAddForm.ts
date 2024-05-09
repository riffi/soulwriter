import {ICharacterNewFormValues} from "./type.ts";
import {ICharacter} from "../../../entities/Character";
import {useNavigate} from "react-router-dom";
import {db} from "../../../entities/Db/model/Db";

export const useCharacterAddForm = (characterGroupId: string) => {


    const navigate = useNavigate()

    const getInitialValues = (): ICharacterNewFormValues => {
        return {
            name: '',
            description: '',
            sex: ['male'],
        }
    }


    const onSubmitNewCharacter = (formData: ICharacterNewFormValues) => {
        console.log('characterGroupId', characterGroupId)
        const characterData: ICharacter = {
            groupId: characterGroupId,
            name: formData.name,
            description: formData.description,
            sex: formData.sex[0],
            dictAttributes: []
        }
        db.characters.add(characterData).then(() => navigate("/characters"))
    }

    return {
        getInitialValues,
        onSubmitNewCharacter
    }
}
