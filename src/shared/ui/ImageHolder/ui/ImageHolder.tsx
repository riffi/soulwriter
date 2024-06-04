import {IImageHolderProps} from "@shared/ui/ImageHolder/model/types.ts";
import {ImageUploader, ImageUploadItem} from "antd-mobile";
import {useImageHolder} from "@shared/ui/ImageHolder/model/useImageHolder.ts";
import {useState} from "react";

export const ImageHolder = (props: IImageHolderProps) => {

    const {file,
        onUploadImage,
        onDeleteImage
    } = useImageHolder(props.guid, props.onUpload, props.onDelete)

    const [imageList, setImageList] = useState<ImageUploadItem[]>([])

    return (
        <>
            <ImageUploader
                style={{
                    "--cell-size": '150px',
                    marginTop: '10px',
                    marginLeft: '10px'
                }}
                maxCount={1}
                camera={true}
                value={(file) ? [{url: file?.body, thumbnailUrl: file?.body}]: imageList}
                onChange={setImageList}
                upload={onUploadImage}
                onDelete={() => onDeleteImage()}
            />
        </>
    )
}
