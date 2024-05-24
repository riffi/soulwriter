import styled from './Characters.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {NeedSelectBook} from "@features/book/NeedSelectBook";
import {CharacterManager} from "@features/character/CharacterManager";
import {useNavigate} from "react-router-dom";
export const Characters = () => {

    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)
    const navigate = useNavigate()

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return (
        <div className={styled.charactersPage}>
            <CharacterManager
                bookId = {currentBook.id}
                onClick={(character) => navigate(`/character/card?id=${character.id}`)}
            />
        </div>
    )
}
