export interface ICharacter {
    id: string
    avatar: string
    name: string
    description: string,
    sex: string,
    dictAttributes: ICharacterDictAttributeWithValue[]
}

export interface ICharacterDictAttribute{
    id?: string,
    title: string,
}

export interface ICharacterDictAttributeWithValue extends  ICharacterDictAttribute{
    value: string
}


