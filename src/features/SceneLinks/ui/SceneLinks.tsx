import {ISceneLinksProps} from "../model/types.ts";
import {AutoCenter, Button, FloatingPanel, List} from "antd-mobile";
import {useSceneLinks} from "../model/useSceneLinks.ts";
import {AddCircleOutline, CloseOutline} from "antd-mobile-icons";
import {useState} from "react";
import {ISceneLink} from "../../../entities/Scene";
import {EditSceneLinkForm} from "./EditSceneLinkForm.tsx";
import {IBookItem} from "../../../entities/BookItem";

export const SceneLinks = (props: ISceneLinksProps) => {

    const newLinkInitialVals: ISceneLink = {
        sceneId: props.sceneId,
        bookId: props.bookId,
        title: '',
        type: '',
    }

    const {sceneLinkList,
        onSubmitLink,
        onDeleteLink
    } = useSceneLinks(props.bookId, props.sceneId)

    const [linkAppendPopupVisible, setLinkAppendPopupVisible] = useState<boolean>(false)
    const [currentLink, setCurrentLink] = useState<ISceneLink>(newLinkInitialVals)

    const anchors = [400, window.innerHeight * 0.2, window.innerHeight * 0.8]

    const getBookItemDescription = (bookItem?: IBookItem) => {
        if (!bookItem) return ''
        if (bookItem.type){
            return  `${bookItem.type}: ${bookItem.title}`
        }
        else{
            return  `${bookItem.title}`
        }
    }

    return (
        <>
        <List header={"Связи сцены"}>
            {sceneLinkList?.map((sceneLink) =>
                <List.Item
                    key={sceneLink.id}
                    title={sceneLink.type}
                    clickable={true}
                    description={!sceneLink.title ? '' :getBookItemDescription(sceneLink.bookItemData) }
                    onClick={() => {
                        setCurrentLink(sceneLink)
                        setLinkAppendPopupVisible(true)
                    }}
                >
                    {sceneLink.title ? sceneLink.title : getBookItemDescription(sceneLink.bookItemData)}
                </List.Item>
            )}
            <List.Item title={""} key={"add"}>
                <AutoCenter>
                    <Button size='large' fill={'none'}  onClick={() => {
                        setCurrentLink(newLinkInitialVals)
                        setLinkAppendPopupVisible(true)
                    }}>
                        <AddCircleOutline/>

                    </Button>
                </AutoCenter>
            </List.Item>
        </List>

            {linkAppendPopupVisible &&
                <FloatingPanel
                    anchors={anchors}
                >
                   <EditSceneLinkForm
                       onCancel={() => setLinkAppendPopupVisible(false)}
                       sceneLink={currentLink}
                       bookId={props.bookId}
                       sceneId={props.sceneId}
                       onSubmit={(link) => {
                           onSubmitLink(link)
                           setLinkAppendPopupVisible(false)
                       }}
                       onDelete={(link) => {
                           setLinkAppendPopupVisible(false)
                           onDeleteLink(link)
                       }}
                   />
                </FloatingPanel>
            }

        </>
    )
}