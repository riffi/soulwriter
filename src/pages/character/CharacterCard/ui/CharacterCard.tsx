import {useSearchParams} from "react-router-dom";
import React from "react";
import {CharacterViewForm} from "../../../../widgets/CharacterViewForm/ui/CharacterViewForm.tsx";

export const CharacterCard = () => {
    const [searchParams] = useSearchParams();
    const characterId = Number(searchParams.get('id'))

    return (
        <>
            <CharacterViewForm id={characterId}/>
        </>
    )
}
