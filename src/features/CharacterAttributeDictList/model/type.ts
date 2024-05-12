import {ICharacterDictAttribute, ICharacterGroup} from "../../../entities/Character";
import {IBook} from "../../../entities/Book";

export interface ICharacterAttributeDictListProps{
    book: IBook
    attributeList?: ICharacterDictAttribute[]
    addButtonEnabled: boolean,
    addButtonCallback?: () => void
    onClickCallback?: (attribute: ICharacterDictAttribute) => void
    onChangeCallback?: (attribute: ICharacterDictAttribute) => void
    onDeleteCallBack?: (id: number) => void
}
