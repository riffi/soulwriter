export interface ICharacter {
    id: number
    avatar: string
    name: string
    description: string,
    sex: string,
    dictAttributes: ICharacterDictAttributeWithValue[],
    groupId: string
}

export interface ICharacterDictAttribute{
    id?: string,
    title: string,
}

export interface ICharacterDictAttributeWithValue extends  ICharacterDictAttribute{
    value: string
}

export interface ICharacterGroup{
    id?: string
    title: string
}


