import {ICharacterDictAttribute} from "@entities/Character";

export interface ICharacterDictAttributeEditFormProps{
    attribute: ICharacterDictAttribute
    onSubmit: (attr: ICharacterDictAttribute) => void
}
