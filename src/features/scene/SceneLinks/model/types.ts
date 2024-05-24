import {ISceneLink} from "@entities/Scene";

export interface ISceneLinksProps{
    bookId: number
    sceneId: number
}


export interface IEditSceneLinkFormProps{
    bookId: number,
    sceneId: number
    onCancel: () => void
    sceneLink: ISceneLink
    onSubmit?: (link: ISceneLink) => void
    onDelete: (link: ISceneLink) => void
}
