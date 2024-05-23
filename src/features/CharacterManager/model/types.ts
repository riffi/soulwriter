import {ICharacter} from "@entities/Character";

export interface ICharacterManagerProps {
    bookId: number
    onClick: (character: ICharacter) => void,
    excludeCharacterIds?: number[]
}

export interface ICharactersByGroupProps{
    characterGroupId: number
    onClick: (character: ICharacter) => void
    excludeCharacterIds?: number[]
}
