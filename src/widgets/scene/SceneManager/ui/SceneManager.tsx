import {ISceneShiftDirection, SceneManagerMode, SceneManagerProps} from "../model/types.ts";
import {useSceneManager} from "../model/useSceneManager.ts";
import {AutoCenter, Button, Card, List, ProgressBar, Space} from "antd-mobile";
import {useNavigate} from "react-router-dom";
import {AddCircleOutline, DownOutline, FingerdownOutline, UpOutline} from "antd-mobile-icons";
import {useState} from "react";

export const SceneManager = (props: SceneManagerProps) => {
    const navigate = useNavigate()


    const [mode, setMode] = useState<SceneManagerMode>(SceneManagerMode.BASIC)
    const [blinkItemId, setBlinkItemId] = useState<number>()

    const {sceneList,
        onCreateNewScene,
        shiftScene,
        bookSymbolCount
    } = useSceneManager(props.bookId)

    // @Todo - перенести в настройки
    const targetSymbolCount = 400000

    const symbolTotalPercentage = Math.round(bookSymbolCount / targetSymbolCount * 100)

    return (
        <Card>
            <ProgressBar
                percent={symbolTotalPercentage}
                text={`Cимволов\n${bookSymbolCount} / ${targetSymbolCount}\n${symbolTotalPercentage}%`}
                style={{
                    'fontSize': '12px',
                    '--text-width': '100px',
                    "whiteSpace": "pre-line"
                }}
            />
            <Space
                justify={"center"}
                direction={"horizontal"}
                style={{marginTop: '10px'}}
            >
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
                {/*<div style={{marginTop: '7px', marginLeft: '10px', color: '#999999'}}>*/}
                {/*    Всего символов: {bookSymbolCount}*/}
                {/*</div>*/}
            </Space>
            <List style={{"--padding-left": "0px"}}>
                {sceneList?.map(scene =>(
                    <List.Item
                        className={blinkItemId === scene.id ? "blink" : ''}
                        key={scene.id}
                        description={`символов: ${scene.symbolCount}`}
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
