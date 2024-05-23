import {CharacterAttributeSection, ICharacter, ICharacterDictAttribute} from "@entities/Character";

export interface ICharacterAttributeListProps{
    bookId: number
    character: ICharacter
    section: CharacterAttributeSection
    appendCallBack: (attr: ICharacterDictAttribute) => void
    deleteCallback: (attr: ICharacterDictAttribute) => void
    changeAttributeValueCallback: (attr: ICharacterDictAttribute, value: string) => void
}
