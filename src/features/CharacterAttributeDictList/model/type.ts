import {ICharacterDictAttribute} from "../../../entities/Character";

export interface ICharacterAttributeDictListProps{
    attributeList?: ICharacterDictAttribute[],
    addButtonEnabled: boolean,
    addButtonCallback?: () => void
    onClickCallback?: (attribute: ICharacterDictAttribute) => void
}
