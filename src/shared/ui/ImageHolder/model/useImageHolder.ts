import {useLiveQuery} from "dexie-react-hooks";
import {fileDb} from "@entities/Db/model/fileDb.ts";
import {ImageUploadItem} from "antd-mobile";
import {toBase64} from "@widgets/CharacterViewForm/lib/imageUtils.ts";
import {uuidv4} from "@shared/lib/GuidUtils.ts";

export const useImageHolder = (guid?: string,
                               onUpload?: (guid: string) => void,
                               onDelete?: (guid: string) => void,
                               width?: number,
                               height?: number
) => {
    const file = useLiveQuery(() => {
            if (!guid) return

            return fileDb.files
                .where('guid')
                .equals(guid)
                .first()
        }, [guid]
    )


    const onUploadImage = async (newFile: File): Promise<ImageUploadItem> => {
        if (file){
            await fileDb.files.delete(file?.id)
        }

        const w = width ? width : 512
        const h = height ? height : 512
        const base64 = await toBase64(newFile, w, h)
        const guid = uuidv4()
        const id = await fileDb.files.add({
            guid: guid,
            body: base64
        })
        if (onUpload) onUpload(guid)

        return {
            url: URL.createObjectURL(newFile),
        }
    }

    const onDeleteImage =  async () => {
        await fileDb.files.delete(file?.id)
        if (onDelete) onDelete(guid)
        return true
    }

    return {
        file,
        onUploadImage,
        onDeleteImage
    }
}
