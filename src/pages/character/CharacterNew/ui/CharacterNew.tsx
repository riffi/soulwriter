import {useSearchParams} from "react-router-dom";
import {CharacterAddForm} from "@widgets/CharacterAddForm";

export const CharacterNew = () => {

    const [searchParams] = useSearchParams();
    const characterGroupId = Number(searchParams.get('characterGroupId'))
    return (
        <>
            <CharacterAddForm characterGroupId={characterGroupId}/>
        </>
    )
}
