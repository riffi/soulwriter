import {ICharacterGroup} from "../../../entities/Character";
import {IBook} from "../../../entities/Book";

export interface ICharacterGroupDictListProps{
    book: IBook
    groupList?: ICharacterGroup[]
    addButtonEnabled: boolean
    addButtonCallback?: () => void
    onClickCallback?: (group: ICharacterGroup) => void
    onChangeCallback?: (group: ICharacterGroup) => void
    onDeleteGroupCallBack?: (id: number) => void
}
