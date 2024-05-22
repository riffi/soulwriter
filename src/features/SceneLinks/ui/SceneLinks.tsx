import {ISceneLinksProps} from "../model/types.ts";
import {AutoCenter, Button, List, Popup} from "antd-mobile";
import {useSceneLinks} from "../model/useSceneLinks.ts";
import {AddCircleOutline, EditSOutline} from "antd-mobile-icons";
import {useState} from "react";
import {ISceneLink} from "../../../entities/Scene";
import {EditSceneLinkForm} from "./EditSceneLinkForm.tsx";
import {IconBlock} from "../../../shared/ui/IconBlock";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate()


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
                    extra={
                        <Button fill={"none"}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCurrentLink(sceneLink)
                                    setLinkAppendPopupVisible(true)
                                }}
                        >
                            <EditSOutline />
                        </Button>
                    }
                    description={`${sceneLink.bookItemData?.type} : ${sceneLink.bookItemData?.title}`}
                    onClick={() => {
                        navigate(`/book-item/card?id=${sceneLink.bookItemId}`)
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
