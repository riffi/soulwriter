import {ISceneViewFormProps} from "../model/types.ts";
import {useSceneViewForm} from "../model/useSceneViewForm.ts";
import {Button, Card, List, NavBar, Popup, Space, TabBar} from "antd-mobile";
import {InlineEdit} from "../../../../shared/ui/InlineEdit";
import {useMemo, useRef, useState} from "react";
import JoditEditor from 'jodit-react';
import {FillinOutline,
    FileOutline,
    RightOutline,
    UnorderedListOutline,
    TeamFill,
    CollectMoneyOutline
} from "antd-mobile-icons";
import {useDebouncedCallback} from "use-debounce";
import {useNavigate} from "react-router-dom";
import styled from './SceneViewForm.module.scss'
import {ViewMode} from "../../../../shared/model/types.ts";
import {SceneCharacters} from "../../../../features/SceneCharacters";
import {getWindowSelectionText} from "../lib/selectionUtils.ts";
import {SynonymSearch} from "../../../../features/SynonymSearch";


export const SceneViewForm = (props: ISceneViewFormProps) => {
    const {scene,
        nextScene,
        prevScene,
        characterCount,
        changeAttributeValue
    } = useSceneViewForm(props.bookId, props.sceneId)

    const navigate = useNavigate()

    const [sceneUsersPopupVisible, setSceneUsersPopupVisible] = useState<boolean>(false)
    const [synonymSearchPopupVisible, setSynonymSearchPopupVisible] = useState<boolean>(false)
    const [selectedText, setSelectedText] = useState<string>("")

    const [mode, setMode] = useState<ViewMode>(ViewMode.READ)

    const debouncedBodyCallback = useDebouncedCallback(
        // function
        (value) => {
            changeAttributeValue("body", value, scene)
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
                style={{padding: "0px 10px", backgroundColor: 'var(--adm-color-nav)', color: 'white'}}
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
                <Button
                    onClick={() => setSceneUsersPopupVisible(true)}
                    fill={"none"}
                >
                    <Space direction={"vertical"} style={{fontSize: "10px", "--gap": "0px"}} align={"center"} wrap={false}>
                        <TeamFill
                            style={{fontSize: "20px", color: '#546c72'}}
                        />
                        <div>
                            {`Персонажи (${characterCount})`}
                        </div>
                    </Space>
                </Button>
                <Button
                    onClick={() => {
                        const selectedText = getWindowSelectionText()
                        const cleanSelectedText = selectedText.toLowerCase().trim()
                        setSelectedText(cleanSelectedText)
                        setSynonymSearchPopupVisible(true)
                    }}
                    fill={"none"}
                >
                    <Space direction={"vertical"} style={{fontSize: "10px", "--gap": "0px"}} align={"center"} wrap={false}>
                        <CollectMoneyOutline
                            style={{fontSize: "20px", color: '#546c72'}}
                        />
                        <div>
                            {`Синонимы`}
                        </div>
                    </Space>
                </Button>
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
        <Popup
            visible={sceneUsersPopupVisible}
            showCloseButton={true}
            onClose={() => setSceneUsersPopupVisible(false)}
            onMaskClick={() => setSceneUsersPopupVisible(false)}
            tabIndex={1}
        >
            <SceneCharacters bookId={props.bookId} sceneId={props.sceneId}/>
        </Popup>
        <Popup
            visible={synonymSearchPopupVisible}
            bodyStyle={{overflow: "auto", maxHeight: "90dvh"}}
            showCloseButton={true}
            onClose={() => setSynonymSearchPopupVisible(false)}
            onMaskClick={() => setSynonymSearchPopupVisible(false)}
            tabIndex={2}
        >
            <SynonymSearch text={selectedText}/>
        </Popup>
    </>
    )
}
