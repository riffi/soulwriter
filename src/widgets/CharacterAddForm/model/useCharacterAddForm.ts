import {ICharacterNewFormValues} from "./type.ts";
import {ICharacter} from "../../../entities/Character";
import {useNavigate} from "react-router-dom";
import {db} from "../../../entities/Db/model/Db";
import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";

export const useCharacterAddForm = (characterGroupId: number) => {

    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)
    const navigate = useNavigate()

    const getInitialValues = (): ICharacterNewFormValues => {
        return {
            name: '',
            description: '',
            sex: ['male'],
        }
    }


    const onSubmitNewCharacter = (formData: ICharacterNewFormValues) => {
        const characterData: ICharacter = {
            groupId: characterGroupId,
            bookId: currentBook?.id,
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
