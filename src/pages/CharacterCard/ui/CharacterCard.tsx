import {CharacterViewForm} from "../../../widgets/CharacterViewForm/ui/CharacterViewForm.tsx";
import {useSearchParams} from "react-router-dom";

export const CharacterCard = () => {
    const [searchParams] = useSearchParams();
    const characterId = Number(searchParams.get('id'))

    return (
        <>
            <CharacterViewForm id={characterId}/>
        </>
    )
}
