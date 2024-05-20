import {ISceneLinksProps} from "../model/types.ts";
import {AutoCenter, Button, FloatingPanel, List, Popup} from "antd-mobile";
import {useSceneLinks} from "../model/useSceneLinks.ts";
import {AddCircleOutline} from "antd-mobile-icons";
import {useState} from "react";
import {ISceneLink} from "../../../entities/Scene";
import {EditSceneLinkForm} from "./EditSceneLinkForm.tsx";
import {IconBlock} from "../../../shared/ui/IconBlock";

export const SceneLinks = (props: ISceneLinksProps) => {

    const newLinkInitialVals: ISceneLink = {
        sceneId: props.sceneId,
        bookId: props.bookId,
        title: '',
    }

    const {sceneLinkList,
        onSubmitLink,
        onDeleteLink
    } = useSceneLinks(props.bookId, props.sceneId)

    const [linkAppendPopupVisible, setLinkAppendPopupVisible] = useState<boolean>(false)
    const [currentLink, setCurrentLink] = useState<ISceneLink>(newLinkInitialVals)

    const anchors = [400, window.innerHeight * 0.2, window.innerHeight * 0.8]


    return (
        <>
        <List header={"Упоминания"}>
            {sceneLinkList?.map((sceneLink) =>
                <List.Item
                    key={sceneLink.id}
                    clickable={true}
                    prefix={
                        <IconBlock
                            iconName={sceneLink.bookItemData?.iconName}
                            style={{fontSize: '28px'}}
                        />
                    }
                    description={`${sceneLink.bookItemData?.type} : ${sceneLink.bookItemData?.title}`}
                    onClick={() => {
                        setCurrentLink(sceneLink)
                        setLinkAppendPopupVisible(true)
                    }}
                >
                    {sceneLink?.title}
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
                <Popup visible={true}>
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
                </Popup>
            }

        </>
    )
}
