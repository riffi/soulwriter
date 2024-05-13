import {useSearchParams} from "react-router-dom";
import {CharacterViewForm} from "../../../../widgets/CharacterViewForm/ui/CharacterViewForm.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {NeedSelectBook} from "../../../../features/NeedSelectBook";

export const CharacterCard = () => {
    const [searchParams] = useSearchParams();
    const characterId = Number(searchParams.get('id'))
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return (
        <>
            <CharacterViewForm id={characterId} bookId={currentBook?.id}/>
        </>
    )
}
