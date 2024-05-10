import {ICharacterDictAttribute, ICharacterGroup} from "../../../entities/Character";

export interface ICharacterAttributeDictListProps{
    attributeList?: ICharacterDictAttribute[],
    addButtonEnabled: boolean,
    addButtonCallback?: () => void
    onClickCallback?: (attribute: ICharacterDictAttribute) => void
    onChangeCallback?: (attribute: ICharacterDictAttribute) => void
    onDeleteCallBack?: (id: number) => void
}
