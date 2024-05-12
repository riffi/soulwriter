import styled from './Characters.module.scss'
import {CharacterManager} from "../../../../widgets/CharacterManager";
export const Characters = () => {
    return (
        <div className={styled.charactersPage}>
            <CharacterManager/>
        </div>
    )
}
