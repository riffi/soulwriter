export enum CharacterAttributeSection{
    APPEARANCE = "APPEARANCE",
    TEMPER = 'TEMPER'
}

export enum CharacterAttributeDataType{
    STRING="STRING",
    MULTILINE="MULTILINE"
}
export interface ICharacter {
    id: number
    avatar: string
    name: string
    description: string,
    sex: string,
    dictAttributes: ICharacterDictAttributeWithValue[],
    groupId: number,
    bookId: number
}

export interface ICharacterDictAttribute{
    id?: number,
    title: string,
    bookId: number,
    section?: CharacterAttributeSection,
    dataType?: CharacterAttributeDataType
}

export interface ICharacterDictAttributeWithValue extends  ICharacterDictAttribute{
    value: string
}

export interface ICharacterGroup{
    id?: number
    title: string,
    bookId: number
}


