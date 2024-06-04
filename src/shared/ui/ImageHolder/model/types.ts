export interface IImageHolderProps{
    guid?: string
    onUpload?: (guid: string) => void
    onDelete?: (guid: string) => void
}
