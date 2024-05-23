import {ISceneShiftDirection, SceneManagerMode, SceneManagerProps} from "../model/types.ts";
import {useSceneManager} from "../model/useSceneManager.ts";
import {AutoCenter, Button, Card, Collapse, Divider, List, ProgressBar, SearchBar, Space} from "antd-mobile";
import {useNavigate} from "react-router-dom";
import {AddCircleOutline, DownOutline, FingerdownOutline, UpOutline, HistogramOutline, CalendarOutline} from "antd-mobile-icons";
import {useState} from "react";
import {IScene} from "../../../../entities/Scene";
import {SceneDescription} from "../../../../features/SceneDescription";
import {useDebounce} from "use-debounce";

export const SceneManager = (props: SceneManagerProps) => {
    const navigate = useNavigate()


    const [mode, setMode] = useState<SceneManagerMode>(SceneManagerMode.BASIC)
    const [blinkItemId, setBlinkItemId] = useState<number>()

    const {sceneList,
        onCreateNewScene,
        shiftScene,
        bookSymbolCount
    } = useSceneManager(props.book.id)

    const targetSymbolCount = props.book?.targetSymbolCount ? props.book?.targetSymbolCount : '400000'

    const [searchStr, setSearchStr] = useState<string>("")


    const [filteredSceneList] = useDebounce(sceneList?.filter((scene) => {
        return searchStr === '' || scene.body.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1
    }), 500)

    const scenes = searchStr === '' ? sceneList : filteredSceneList

    const symbolTotalPercentage = Math.round(bookSymbolCount / targetSymbolCount * 100)

    return (
        <Card
            bodyStyle={{paddingTop: "0px"}}
        >
            <ProgressBar
                percent={symbolTotalPercentage}
                text={`Cимволов\n${bookSymbolCount} / ${targetSymbolCount}\n${symbolTotalPercentage}%`}
                style={{
                    'fontSize': '12px',
                    '--text-width': '100px',
                    "whiteSpace": "pre-line"
                }}
            />
            <Collapse defaultActiveKey={null} accordion={true}  style={{color: '#999999'}}>
                <Collapse.Panel key='1' title='Фильтры'>
                    <SearchBar
                        placeholder={"Поиск"}
                        clearable={true}
                        onChange={(val) => {
                            setSearchStr(val)
                        }}
                    />
                </Collapse.Panel>
                <Collapse.Panel key='2' title='Действия'>
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
                </Space>
                </Collapse.Panel>
            </Collapse>


            <List style={{"--padding-left": "0px"}} header={"Сцены"}>
                {scenes?.map(scene =>(
                    <List.Item
                        className={blinkItemId === scene.id ? "blink" : ''}
                        key={scene.id}
                        description={
                            <SceneDescription scene={scene}/>
                        }
                        prefix={scene.sortOrderId}
                        style={{"whiteSpace": "pre-line"}}
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
