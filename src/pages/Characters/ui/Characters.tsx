import {CharacterManager} from "../../../widgets/CharacterManager";
import styled from './Characters.module.scss'
export const Characters = () => {
    return (
        <div className={styled.charactersPage}>
            <CharacterManager/>
        </div>
    )
}
