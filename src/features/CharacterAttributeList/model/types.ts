import {ICharacterDictAttributeWithValue} from "@entities/Character";

export interface ICharacterAttributeListProps{
    bookId: number,
    attributeList?: ICharacterDictAttributeWithValue[]
    addButtonEnabled: boolean,
    addButtonCallback?: () => void
    onClickCallback?: (attribute: ICharacterDictAttributeWithValue) => void
    onChangeCallback?: (val: string) => void
    onDeleteCallBack?: (id: number) => void
}
