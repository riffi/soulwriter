import styled from './Characters.module.scss'
import {CharacterManager} from "../../../../widgets/CharacterManager";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {NeedSelectBook} from "../../../../features/NeedSelectBook";
export const Characters = () => {

    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return (
        <div className={styled.charactersPage}>
            <CharacterManager bookId = {currentBook.id}/>
        </div>
    )
}
