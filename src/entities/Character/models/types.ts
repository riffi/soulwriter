export interface ICharacter {
    id: number
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


