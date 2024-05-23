import {ICharacterGroup} from "@entities/Character";

export interface ICharacterGroupDictListProps{
    bookId: number
    groupList?: ICharacterGroup[]
    addButtonEnabled: boolean
    addButtonCallback?: () => void
    onClickCallback?: (group: ICharacterGroup) => void
    onChangeCallback?: (group: ICharacterGroup) => void
    onDeleteGroupCallBack?: (id: number) => void
}
