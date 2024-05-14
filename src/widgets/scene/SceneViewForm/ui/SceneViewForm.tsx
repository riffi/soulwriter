import {ISceneViewFormProps} from "../model/types.ts";
import {useSceneViewForm} from "../model/useSceneViewForm.ts";
import {Card, Input, List, TextArea} from "antd-mobile";
import {InlineEdit} from "../../../../shared/ui/InlineEdit";
import React, {useEffect, useMemo, useRef, useState} from "react";
import JoditEditor from 'jodit-react';
import {useDebounce, useDebouncedCallback} from "use-debounce";

const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback(...args);
        }, wait);
    };
}

export const SceneViewForm = (props: ISceneViewFormProps) => {
    const {scene,
        changeAttributeValue
    } = useSceneViewForm(props.bookId, props.sceneId)



    const [body, setBody] = useState<string>("")
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
                    textIndent: '20px'
                },
                spellcheck: true,
                i18n: 'ru'
            }}
            value={scene?.body}
            onChange={(e) => debouncedBodyCallback(e)}
        />
    }, [scene?.id]);


    return (
        <>
        <Card>
            <List style={{"--border-top": "none", "--border-bottom": "none", "--padding-left": "0px", "--font-size": "14px"}}>
                <List.Item title={"Название"} key={"title"}>
                    <InlineEdit
                        value={scene?.title}
                        onChange={(val) => changeAttributeValue("title", val, scene)}
                    />
                </List.Item>
            </List>
        </Card>
        {memoizedEditor}

    </>
    )
}
