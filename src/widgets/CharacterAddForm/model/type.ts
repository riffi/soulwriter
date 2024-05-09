export interface ICharacterNewFormValues{
    id?: number,
    name: string,
    description: string,
    sex: ('male' | 'female')[]
}

export interface ICharacterAddFormProps{
    characterGroupId: string
}
