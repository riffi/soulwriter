import {ISceneViewFormProps} from "../model/types.ts";
import {useSceneViewForm} from "../model/useSceneViewForm.ts";
import {AutoCenter, Card, List, NavBar, Popup, TabBar} from "antd-mobile";
import {InlineEdit} from "../../../../shared/ui/InlineEdit";
import {useMemo, useRef, useState} from "react";
import JoditEditor from 'jodit-react';
import {FillinOutline,
    RightOutline,
    UnorderedListOutline,
    TeamFill,
    FileOutline,
    LinkOutline,
} from "antd-mobile-icons";
import {useDebouncedCallback} from "use-debounce";
import {useNavigate} from "react-router-dom";
import styled from './SceneViewForm.module.scss'
import {ViewMode} from "../../../../shared/model/types.ts";
import {SceneCharacters} from "../../../../features/SceneCharacters";
import {SceneLinks} from "../../../../features/SceneLinks";
import {calcSymbolCount} from "../../../../shared/lib/TextMetrics.ts";
import {makeCleanTextFromHtml} from "../../../../shared/lib/HtmlUtils.ts";
import {SceneParams} from "../../../../features/SceneParams";
import {SceneDescription} from "../../../../features/SceneDescription";


export const SceneViewForm = (props: ISceneViewFormProps) => {
    const {scene,
        nextScene,
        prevScene,
        characterCount,
        sceneLinkCount,
        changeAttributeValue,
        updateSymbolCount
    } = useSceneViewForm(props.bookId, props.sceneId)

    const navigate = useNavigate()

    const [sceneUsersPopupVisible, setSceneUsersPopupVisible] = useState<boolean>(false)
    const [sceneLinksPopupVisible, setSceneLinksPopupVisible] = useState<boolean>(false)
    const [sceneParamsPopupVisible, setSceneParamsPopupVisible] = useState<boolean>(false)

    const [mode, setMode] = useState<ViewMode>(ViewMode.READ)



    const debouncedBodyCallback = useDebouncedCallback(
        // function
        (value) => {
            changeAttributeValue("body", value, scene)
            updateSymbolCount( calcSymbolCount(makeCleanTextFromHtml(value)))
        },
        // delay in ms
        500
    );

    const editor = useRef(null);

    const memoizedEditor = useMemo(() => {
        return  <JoditEditor
            ref={editor}
            config={{
                style:{
                    fontSize: '16px',
                    textIndent: '20px',

                },
                readonly: mode === ViewMode.READ,
                toolbar: mode === ViewMode.WRITE,
                spellcheck: true,
                toolbarSticky: true,
                toolbarDisableStickyForMobile: false,
                i18n: 'ru'
            }}
            value={scene?.body}
            onChange={(e) => debouncedBodyCallback(e)}
        />
    }, [scene?.id, mode]);


    const toggleViewMode = () => {
        if (mode === ViewMode.WRITE){
            setMode(ViewMode.READ)
        }
        else{
            setMode(ViewMode.WRITE)
        }
    }


    return (
        <>
        <div className={styled.header}>
            <NavBar
                onBack={() => navigate('/scenes')}
                back={<UnorderedListOutline  style={{fontSize: "22px"}} />}
                backArrow={false}
                style={{
                    padding: "0px 10px",
                    backgroundColor: 'var(--adm-color-nav)',
                    color: 'white',
                    fontSize: '14px'
                }}
                right={
                    <>
                        {mode === ViewMode.READ && <FillinOutline
                            style={{fontSize: "22px"}}
                            onClick={toggleViewMode}
                        />}
                        {mode === ViewMode.WRITE && <FileOutline
                            style={{fontSize: "22px"}}
                            onClick={toggleViewMode}
                        />}
                    </>
                }
            >
                {scene?.sortOrderId}. {scene?.title}
            </NavBar>
            <NavBar
                backArrow={prevScene?.id !== undefined}
                onBack={() => navigate(`/scene/card?id=${prevScene?.id}`)}
                right={
                <>
                    {nextScene?.id && <RightOutline
                            style={{fontSize: "22px"}}
                            onClick={() => navigate(`/scene/card?id=${nextScene?.id}`)}
                        />
                    }
                </>
            }
            >
                <TabBar onChange={(key) => {
                        if (key == "characters"){
                            setSceneUsersPopupVisible(true)
                        }
                        else if (key == "links"){
                            setSceneLinksPopupVisible(true)
                        }
                        else if (key == "params"){
                            setSceneParamsPopupVisible(true)
                        }
                    }}
                    activeKey={null}

                >
                    <TabBar.Item
                        key={"characters"}
                        icon={<TeamFill/>}
                        title={`Персонажи (${characterCount})`}
                    />
                    <TabBar.Item
                        key={"links"}
                        icon={<LinkOutline/>}
                        title={`Упоминания (${sceneLinkCount})`}

                    />
                    <TabBar.Item
                        key={"params"}
                        icon={<FileOutline />}
                        title={`Параметры`}

                    />
                </TabBar>
            </NavBar>

        </div>
        <div className={styled.body}>
            <Card>
                <List style={{"--padding-left": "0px"}}>
                    <List.Item title={"Название"} key={"title"}>
                        <InlineEdit
                            value={scene?.title}
                            onChange={(val) => changeAttributeValue("title", val, scene)}
                        />
                    </List.Item>
                </List>
            </Card>
            {memoizedEditor}
        </div>
        <div className={styled.footer}>
            <AutoCenter style={{marginTop: '10px', color: '#888888'}}>
                {scene && <SceneDescription scene={scene}/>}
            </AutoCenter>
        </div>
        <Popup
            visible={sceneUsersPopupVisible}
            showCloseButton={true}
            bodyStyle={{overflow: "auto", maxHeight: "90dvh"}}
            onClose={() => setSceneUsersPopupVisible(false)}
            onMaskClick={() => setSceneUsersPopupVisible(false)}
            tabIndex={1}
        >
            <SceneCharacters bookId={props.bookId} sceneId={props.sceneId}/>
        </Popup>
        <Popup
            visible={sceneLinksPopupVisible}
            showCloseButton={true}
            bodyStyle={{overflow: "auto", maxHeight: "90dvh"}}
            onClose={() => setSceneLinksPopupVisible(false)}
            onMaskClick={() => setSceneLinksPopupVisible(false)}
            tabIndex={2}
        >
            <SceneLinks bookId={props.bookId} sceneId={props.sceneId}/>
        </Popup>
        <Popup
            visible={sceneParamsPopupVisible}
            showCloseButton={true}
            bodyStyle={{overflow: "auto", maxHeight: "90dvh"}}
            onClose={() => setSceneParamsPopupVisible(false)}
            onMaskClick={() => setSceneParamsPopupVisible(false)}
            tabIndex={3}
        >
            <SceneParams sceneId={props.sceneId}/>
        </Popup>
    </>
    )
}
