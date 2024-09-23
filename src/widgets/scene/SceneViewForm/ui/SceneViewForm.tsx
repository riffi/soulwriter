import {ISceneViewFormProps} from "../model/types.ts";
import {useSceneViewForm} from "../model/useSceneViewForm.ts";
import {AutoCenter, Card, FloatingBubble, List, NavBar, Popup, TabBar} from "antd-mobile";
import {InlineEdit} from "@shared/ui/InlineEdit";
import React, {useEffect, useMemo, useRef, useState} from "react";
import JoditEditor from 'jodit-react';
import {
    FillinOutline,
    RightOutline,
    LeftOutline,
    UnorderedListOutline,
    TeamFill,
    FileOutline,
    UpOutline,
    CollectMoneyOutline, GlobalOutline,
} from "antd-mobile-icons";
import {useDebouncedCallback} from "use-debounce";
import {useNavigate} from "react-router-dom";
import {calcSymbolCount} from "@shared/lib/TextMetrics.ts";
import styled from './SceneViewForm.module.scss'
import {ViewMode} from "@shared/model/types.ts";
import {makeCleanTextFromHtml} from "@shared/lib/HtmlUtils.ts";

import {SceneCharacters} from "@features/scene/SceneCharacters";
import {SceneLinks} from "@features/scene/SceneLinks";
import {SceneParams} from "@features/scene/SceneParams";
import {SceneDescription} from "@features/scene/SceneDesription";
import {SceneStoryLineItems} from "@features/scene/SceneStoryLineItems/ui/SceneStoryLineItems.tsx";
import {setSceneContext} from "@features/scene/SceneContext/sceneContextSlice.ts";

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";


export const SceneViewForm = (props: ISceneViewFormProps) => {
    const {scene,
        nextScene,
        prevScene,
        characterCount,
        sceneLinkCount,
        sceneStoryLineItemCount,
        changeAttributeValue,
        updateSymbolCount
    } = useSceneViewForm(props.book.id!, props.sceneId)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [sceneUsersPopupVisible, setSceneUsersPopupVisible] = useState<boolean>(false)
    const [sceneLinksPopupVisible, setSceneLinksPopupVisible] = useState<boolean>(false)
    const [sceneStoryLineItemsPopupVisible, setSceneStoryLineItemsPopupVisible] = useState<boolean>(false)
    const [sceneParamsPopupVisible, setSceneParamsPopupVisible] = useState<boolean>(false)

    const sceneContext = useSelector((state: RootState) => state.sceneContext.sceneContextList.find(s => s.sceneId === props.sceneId))

    const [mode, setMode] = useState<ViewMode>(ViewMode.READ)

    const bodyHtmlElementRef = React.useRef<HTMLElement>();

    useEffect(() => {
        const handler = () => {
            const scrollPosition = bodyHtmlElementRef.current?.scrollTop ? bodyHtmlElementRef.current?.scrollTop : 0
            dispatch(setSceneContext({
                sceneId: scene?.id,
                scrollPosition

            }))
        }

        bodyHtmlElementRef.current?.addEventListener('scroll', handler)
        return () => {
            bodyHtmlElementRef.current?.removeEventListener('scroll', handler)
        }
    }, [scene])

    useEffect(() => {
        if (sceneContext){
            bodyHtmlElementRef.current?.scroll({top: sceneContext?.scrollPosition})
        }
    }, [bodyHtmlElementRef.current, scene])

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
                left={
                    <>
                    {prevScene?.id && <LeftOutline
                        style={{fontSize: "22px"}}
                        onClick={() => navigate(`/scene/card?id=${prevScene?.id}`)}
                    />}
                    </>
                }
                back={null}
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
                        else if (key == 'storyLineItems'){
                            setSceneStoryLineItemsPopupVisible(true)
                        }
                    }}

                    activeKey={null}

                >
                    <TabBar.Item style={{"--adm-color-highlight": '#959899'}}
                        key={"characters"}
                        icon={<TeamFill/>}
                        badge={characterCount}
                        title={`Персонажи`}
                    />
                    <TabBar.Item  style={{"--adm-color-highlight": '#959899'}}
                        key={"links"}
                        badge={sceneLinkCount}
                        icon={<GlobalOutline/>}
                        title={`Ссылки`}

                    />
                    <TabBar.Item  style={{"--adm-color-highlight": '#959899'}}
                        key={"storyLineItems"}
                        badge={sceneStoryLineItemCount}
                        icon={<CollectMoneyOutline/>}
                        title={`Сюжет`}

                    />
                    <TabBar.Item
                        key={"params"}
                        icon={<FileOutline />}
                        title={`Параметры`}
                    />
                </TabBar>
            </NavBar>

        </div>
        <div className={styled.body} ref={bodyHtmlElementRef}>
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
                {scene && <SceneDescription book={props.book} scene={scene}/>}
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
            <SceneCharacters bookId={props.book.id!} sceneId={props.sceneId}/>
        </Popup>
        <Popup
            visible={sceneLinksPopupVisible}
            showCloseButton={true}
            bodyStyle={{overflow: "auto", maxHeight: "90dvh"}}
            onClose={() => setSceneLinksPopupVisible(false)}
            onMaskClick={() => setSceneLinksPopupVisible(false)}
            tabIndex={2}
        >
            <SceneLinks bookId={props.book.id!} sceneId={props.sceneId}/>
        </Popup>
        <Popup
            visible={sceneParamsPopupVisible}
            showCloseButton={true}
            bodyStyle={{overflow: "auto", height: "90dvh"}}
            onClose={() => setSceneParamsPopupVisible(false)}
            onMaskClick={() => setSceneParamsPopupVisible(false)}
            tabIndex={3}
        >
            <SceneParams sceneId={props.sceneId} book={props.book}/>
        </Popup>

        <Popup
            visible={sceneStoryLineItemsPopupVisible}
            showCloseButton={true}
            bodyStyle={{overflow: "auto", height: "90dvh"}}
            onClose={() => setSceneStoryLineItemsPopupVisible(false)}
            onMaskClick={() => setSceneStoryLineItemsPopupVisible(false)}
            tabIndex={3}
        >
            <SceneStoryLineItems
                sceneId={props.sceneId}
                bookId={props.book.id!}
            />
        </Popup>
            {sceneContext?.scrollPosition > 600 && <FloatingBubble
            style={{
                '--initial-position-bottom': '55px',
                '--initial-position-right': '24px',
                '--edge-distance': '24px',
                '--background': '#00000052',
                '--size': '42px'
            }}
            onClick={() => bodyHtmlElementRef.current?.scroll({top: 0})}
        >
            <UpOutline fontSize={20}/>
        </FloatingBubble>}
    </>
    )
}
