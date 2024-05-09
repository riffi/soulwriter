import {CharacterAddForm} from "../../../widgets/CharacterAddForm";
import {useSearchParams} from "react-router-dom";

export const CharacterNew = () => {

    const [searchParams] = useSearchParams();
    const characterGroupId = searchParams.get('characterGroupId')
    return (
        <>
            <CharacterAddForm characterGroupId={characterGroupId}/>
        </>
    )
}
