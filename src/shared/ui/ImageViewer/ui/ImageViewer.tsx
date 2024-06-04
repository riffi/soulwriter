import {IImageViewerProps} from "@shared/ui/ImageViewer/model/types.ts";
import {useImageViewer} from "@shared/ui/ImageViewer/model/useImageViewer.ts";
import {Image} from "antd-mobile";

export const ImageViewer = (props: IImageViewerProps) => {

    const {file} = useImageViewer(props.guid)

    return (
        <Image
            src={file? file.body: '/default-avatar.jpeg'}
            style={{ borderRadius: 20 }}
            fit='cover'
            width={40}
            height={40}
        />
    )
}
