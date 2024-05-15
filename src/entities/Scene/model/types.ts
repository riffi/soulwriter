export interface IScene{
    id?: number
    title: string
    description: string
    body: string
    bookId: number
    sortOrderId: number
}


export interface ISceneCharacters{
    sceneId: number
    characterId: number
    description: string
}
