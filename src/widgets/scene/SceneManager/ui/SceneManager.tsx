import {ISceneShiftDirection, SceneManagerMode, SceneManagerProps} from "../model/types.ts";
import {useSceneManager} from "../model/useSceneManager.ts";
import {AutoCenter, Button, Card, List} from "antd-mobile";
import {useNavigate} from "react-router-dom";
import {AddCircleOutline, DownOutline, FingerdownOutline, UpOutline} from "antd-mobile-icons";
import {useState} from "react";

export const SceneManager = (props: SceneManagerProps) => {
    const navigate = useNavigate()

    const [mode, setMode] = useState<SceneManagerMode>(SceneManagerMode.BASIC)
    const [blinkItemId, setBlinkItemId] = useState<number>()

    const {sceneList,
        onCreateNewScene,
        shiftScene
    } = useSceneManager(props.bookId)

    return (
        <Card>
            <Button
                size={"small"}
                style={{marginBottom: '10px'}}
                color={(mode === SceneManagerMode.REORDER) ?  'warning' : 'default'}
                onClick={() => {
                    if (mode === SceneManagerMode.BASIC){
                        setMode(SceneManagerMode.REORDER)
                    }
                    else{
                        setMode(SceneManagerMode.BASIC)
                    }

                }}
            >
                <FingerdownOutline /> Переставить
            </Button>
            <List style={{"--padding-left": "0px"}}>
                {sceneList?.map(scene =>(
                    <List.Item
                        className={blinkItemId === scene.id ? "blink" : ''}
                        key={scene.id}
                        description={scene.description}
                        prefix={scene.sortOrderId}
                        extra={mode === SceneManagerMode.REORDER &&
                            <>
                                {(scene.sortOrderId > 1) && <Button
                                    onClick={() => {
                                        setBlinkItemId(scene.id)
                                        shiftScene(scene, ISceneShiftDirection.UP)
                                    }}
                                >
                                    <UpOutline />
                                </Button>
                                }
                                {(scene.sortOrderId < sceneList?.length) &&
                                <Button
                                    onClick={() => {
                                        setBlinkItemId(scene.id)
                                        shiftScene(scene, ISceneShiftDirection.DOWN)
                                    }}
                                >
                                    <DownOutline />
                                </Button>
                                }
                            </>
                        }
                        clickable={mode === SceneManagerMode.BASIC}
                        onClick = {() => {
                            if (mode === SceneManagerMode.BASIC) {
                                navigate(`/scene/card?id=${scene.id}`)
                            }
                        }}
                    >

                        {scene.title}
                    </List.Item>
                ))}
                <List.Item title={""}>
                    <AutoCenter>
                        <Button size='large' fill={'none'}  onClick={() => {
                            onCreateNewScene()
                        }}>
                            <AddCircleOutline />

                        </Button>
                    </AutoCenter>
                </List.Item>
            </List>
        </Card>
    )
}
