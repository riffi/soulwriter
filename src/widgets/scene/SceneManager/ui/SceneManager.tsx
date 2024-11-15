import {useDispatch, useSelector} from "react-redux";
import {useDebounce} from "use-debounce";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    AutoCenter,
    Button,
    Card,
    Collapse,
    List,
    Popup,
    ProgressBar,
    SearchBar, Selector,
    Space,
    Tag
} from "antd-mobile";
import {AddCircleOutline, CloseOutline, DownOutline, FingerdownOutline, UpOutline} from "antd-mobile-icons";

import {RootState} from "../../../../store.ts";
import {setSceneFilters} from "@features/scene/SceneFilters/sceneFiltersSlice.ts";

import {ImageViewer} from "@shared/ui/ImageViewer";
import {CharacterManager} from "@features/character/CharacterManager";
import {SceneDescription} from "@features/scene/SceneDesription";

import {ISceneShiftDirection, SceneManagerMode, SceneManagerProps} from "../model/types.ts";
import {useSceneManager} from "../model/useSceneManager.ts";
import {IScene} from "@entities/Scene";


export const SceneManager = (props: SceneManagerProps) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [mode, setMode] = useState<SceneManagerMode>(SceneManagerMode.BASIC)
    const [blinkItemId, setBlinkItemId] = useState<number>()
    const [charPopupVisible, setCharPopupVisible] = useState<boolean>(false)

    const {sceneList,
        sceneCharacters,
        onCreateNewScene,
        shiftScene,
        bookSymbolCount,
        sceneStates,
        sceneChecks,
        sceneCheckStates
    } = useSceneManager(props.book.id)

    const getSceneStateJSX = (scene: IScene) => {
        let state = sceneStates?.find(state => state.id === scene.stateId)
        if (!state) {
            state = sceneStates?.find(state => state.isDefault === 1)
        }
        if (state) {
             return (
                <div style={{
                    color: state.color,
                    fontSize: '8px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                }}>
                    {state.title}
                </div>
             )
        }
        else return ""
    }

    const targetSymbolCount = props.book?.targetSymbolCount ? props.book?.targetSymbolCount : '400000'

    const sceneFilters = useSelector((state: RootState) => state.sceneFilters.filters)

    const [debouncedFilters] = useDebounce(sceneFilters, 500)

    const filteredSceneList = sceneList?.filter((scene) => {
        // Ищем в тексте по поисковой строке
        const searchStrMatch =  (debouncedFilters?.searchStr === '')
             || (scene.body.toLowerCase().indexOf(debouncedFilters?.searchStr.toLowerCase()) !== -1)

        // Получаем список персонажей в сцене
        const sceneChars = sceneCharacters?.filter(
            sc => sc.sceneId === scene.id
        )

        // Убеждаемся, что персонаж присутствует в сцене
         const charMatch = !debouncedFilters?.character || sceneChars?.find(
             (sc) => sc.characterId === debouncedFilters?.character?.id
         ) !== undefined


        // Убеждаемся, что проверка не была пройдена
        const notPassedCheckMatch = (debouncedFilters?.notPassedCheckId === undefined) || sceneCheckStates?.find(
            (sc) => ((sc.sceneId === scene.id) && (sc.sceneCheckId === debouncedFilters?.notPassedCheckId))
        ) === undefined

        // Убеждаемся, сцена в нужном статусе
        const stateMatch = (debouncedFilters?.stateId === undefined) || (
            (debouncedFilters.stateId === scene.stateId)
            || (scene.stateId === undefined) && (sceneStates?.find(s => s.isDefault === 1)?.id == debouncedFilters?.stateId)

        )

        return !debouncedFilters
            || (
                debouncedFilters?.searchStr === ''
                && !debouncedFilters?.character
                && !debouncedFilters?.notPassedCheckId
                && !debouncedFilters?.stateId
               )
            || (charMatch && searchStrMatch && notPassedCheckMatch && stateMatch)
    })

    const scenes = !debouncedFilters ? sceneList : filteredSceneList
    const showFilters = (debouncedFilters?.searchStr != '')
        || (debouncedFilters?.character !== undefined)
        || (debouncedFilters?.notPassedCheckId !== undefined)
        || (debouncedFilters?.stateId !== undefined)

    const symbolTotalPercentage = Math.round(bookSymbolCount / targetSymbolCount * 100)

    return (
        <>
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
            <Collapse
                defaultActiveKey={showFilters ? 'filters' : null}
                accordion={true}
                style={{color: '#999999'}}
            >
                <Collapse.Panel key='filters' title='Фильтры'>
                    <List style={{"--padding-left": '0px'}}>
                        <List.Item title={"Поиск в тексте"}>
                            <SearchBar
                                style={{marginTop: '5px'}}
                                placeholder={"Поиск"}
                                clearable={true}
                                defaultValue={sceneFilters?.searchStr}
                                onChange={(val) => {
                                    dispatch(setSceneFilters({...sceneFilters, searchStr: val}))
                                }}
                            />
                        </List.Item>
                        <List.Item
                            title={"Персонаж"}
                        >
                            <Space wrap={true} style={{marginTop: '5px'}} align={"center"}>
                                {sceneFilters?.character &&
                                    <ImageViewer guid={sceneFilters.character?.avatar}/>
                                }
                                <div style={{fontSize: '14px'}}>{sceneFilters.character?.name}</div>
                                <Button
                                    size={"small"}
                                    onClick={() => setCharPopupVisible(true)}
                                >
                                    Выбрать
                                </Button>
                                {sceneFilters?.character && <Button
                                    size={"small"}
                                    fill={"none"}
                                    onClick={() =>  dispatch(setSceneFilters({...sceneFilters, character: undefined}))}
                                >
                                    <CloseOutline/>
                                </Button>}
                            </Space>
                        </List.Item>
                        <List.Item title={"Статус"}>
                            {sceneChecks && <Selector
                                style={{
                                    "--padding": "3px 10px",
                                    fontSize: '12px',
                                }}
                                options={sceneStates}
                                fieldNames={{
                                    label: 'title',
                                    value: 'id'
                                }}
                                value={[sceneFilters?.stateId]}
                                onChange={(val) => dispatch(
                                    setSceneFilters(
                                        {
                                            ...sceneFilters,
                                            stateId: val[0] ? +val[0] : undefined
                                        }
                                    )
                                )}
                            />}
                        </List.Item>
                        <List.Item title={"Не пройдена проверка"}>
                            {sceneChecks && <Selector
                                options={sceneChecks}
                                fieldNames={{
                                    label: 'title',
                                    value: 'id',
                                }}
                                style={{
                                    "--padding": "3px 10px",
                                    fontSize: '12px',
                                }}
                                value={[sceneFilters?.notPassedCheckId]}
                                onChange={(val) => dispatch(
                                    setSceneFilters(
                                        {
                                            ...sceneFilters,
                                            notPassedCheckId: val[0] ? +val[0] : undefined
                                        }
                                    )
                                )}
                            />}
                        </List.Item>
                    </List>
                </Collapse.Panel>
                <Collapse.Panel key='actions' title='Действия'>
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
                            <>
                               <SceneDescription scene={scene} book = {props.book}/>
                            </>
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

                        <div>
                         {scene.title}
                        </div>
                        {getSceneStateJSX(scene)}

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
        {charPopupVisible &&
        <Popup
            visible={true}
            bodyStyle={{overflow: "auto", height: "90dvh"}}
        >
            <Card
                title={"Добавление персонажа"}
                extra={
                    <Button fill={"none"} onClick={() => setCharPopupVisible(false)}>
                        <CloseOutline />
                    </Button>
                }
            >
                <CharacterManager
                    bookId={props.book.id!}
                    onClick={(character) => {
                        setCharPopupVisible(false)
                        dispatch(setSceneFilters({...sceneFilters, character: character}))
                    }}/>
            </Card>
        </Popup>
        }
        </>
    )
}
