import {ISceneLinksProps} from "../model/types.ts";
import {AutoCenter, Button, List, Popup} from "antd-mobile";
import {useSceneLinks} from "../model/useSceneLinks.ts";
import {AddCircleOutline, EditSOutline} from "antd-mobile-icons";
import {useState} from "react";
import {ISceneLink} from "@entities/Scene";
import {EditSceneLinkForm} from "./EditSceneLinkForm.tsx";
import {IconBlock} from "@shared/ui/IconBlock";
import {useNavigate} from "react-router-dom";
import {CharacterLinksTags} from "@features/character/CharacterLinksTags";

export const SceneLinks = (props: ISceneLinksProps) => {

    const newLinkInitialVals: ISceneLink = {
        sceneId: props.sceneId,
        bookId: props.bookId,
        title: '',
    }

    const {sceneLinkList,
        saveLink,
        onDeleteLink
    } = useSceneLinks(props.bookId, props.sceneId)

    const [linkAppendPopupVisible, setLinkAppendPopupVisible] = useState<boolean>(false)
    const [currentLink, setCurrentLink] = useState<ISceneLink>(newLinkInitialVals)
    const navigate = useNavigate()

    const getDescription = (sceneLink: ISceneLink) => {
        if (sceneLink.bookItemData){
            if (!sceneLink.bookItemData?.type && !sceneLink.bookItemData?.title) return  ''
            else if (sceneLink.bookItemData?.type){
                return  sceneLink.bookItemData?.type + ': ' + sceneLink.bookItemData?.title
            }
            else{
                return  sceneLink.bookItemData?.title
            }
        }
        else{
            return ''
        }
    }

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
                            <EditSOutline/>
                        </Button>
                    }
                    description={getDescription(sceneLink)}
                    onClick={() => {
                        navigate(`/book-item/card?id=${sceneLink.bookItemId}`)
                    }}
                >
                    <div>{sceneLink?.title}</div>
                    <CharacterLinksTags characterLinks={sceneLink.characterLinks}/>

                </List.Item>
            )}
            <List.Item title={""} key={"add"}>
                <AutoCenter>
                    <Button size='large' fill={'none'}  onClick={async  () => {
                        const linkId = await saveLink(newLinkInitialVals)
                        setCurrentLink({...newLinkInitialVals, id: linkId})
                        setLinkAppendPopupVisible(true)
                    }}>
                        <AddCircleOutline/>

                    </Button>
                </AutoCenter>
            </List.Item>
        </List>

            {linkAppendPopupVisible &&
                <Popup
                    visible={true}
                    bodyStyle={{
                        paddingBottom: '10px',
                        height: '100dvh',
                        overflow: 'auto'
                    }}
                >
                   <EditSceneLinkForm
                       onCancel={() => setLinkAppendPopupVisible(false)}
                       sceneLink={currentLink}
                       bookId={props.bookId}
                       sceneId={props.sceneId}
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
