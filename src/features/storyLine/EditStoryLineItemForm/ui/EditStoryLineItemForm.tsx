import {useState} from "react";
import {Button, Card, List, Popup, Space} from "antd-mobile";
import {CloseOutline} from "antd-mobile-icons";

import {InlineTextArea} from "@shared/ui/InlineTextArea";
import {ViewMode} from "@shared/model/types.ts";
import {IStoryLineItem} from "@entities/StoryLine/models/types.ts";
import {IScene} from "@entities/Scene";

import {IEditStoryLineItemFormProps} from "../model/types.ts";
import {useEditStoryLineItemForm} from "../model/useEditStoryLineItemForm.ts";

export const EditStoryLineItemForm = (props: IEditStoryLineItemFormProps) => {

    const {sceneList} = useEditStoryLineItemForm(props.storyLineItem, props.bookId)

    const [storyLineItem, setStoryLineItem] = useState<IStoryLineItem>(props.storyLineItem)
    const [sceneSelectPopupVisible, setSceneSelectPopupVisible] = useState<boolean>(false)
    const [selectedScene, setSelectedScene] = useState<IScene>(props.storyLineItem?.sceneData)

    return (
        <>
            <Card
                title={props.storyLineItem?.id ? 'Редактирование записи' : 'Добавление записи'}
                extra={
                    <Button fill={"none"}
                            onClick={props.onCancel}
                    >
                        <CloseOutline />
                    </Button>
                }
            >
                <List>

                    <List.Item key={"title"} title={"Название"}>
                        <InlineTextArea
                            value={storyLineItem.title}
                            defaultMode={storyLineItem?.title !== '' ? ViewMode.READ : ViewMode.WRITE}
                            onChange={async (val) => {
                                const newData = {...storyLineItem, title: val!}
                                await props.onSave(newData)
                                setStoryLineItem(
                                    {...newData}
                                )
                            }}
                        />
                    </List.Item>
                    <List.Item key={"sceneId"} title={"Сцена"}>
                        {selectedScene && <div>
                            {selectedScene?.sortOrderId} - {selectedScene?.title}
                        </div>}
                        <Button
                            size={"mini"}

                            onClick={() => setSceneSelectPopupVisible(true)}
                        >
                            {!selectedScene && "Выбрать"}
                            {selectedScene && "Изменить"}
                        </Button>
                        {selectedScene &&
                            <Button
                                size={"mini"}
                                fill={"none"}
                                onClick={async () => {
                                    const newData = {...storyLineItem, sceneId: undefined}
                                    await props.onSave(newData)
                                    setStoryLineItem(
                                        {...newData}
                                    )
                                    setSelectedScene(undefined)
                                }}
                            >
                                <CloseOutline/>
                            </Button>
                        }
                    </List.Item>
                    <List.Item>
                        <Space>
                            {props.storyLineItem.id && <Button
                                color={"danger"}
                                onClick={() => {
                                    props.onDelete(props.storyLineItem)
                                }}
                            >
                                {props.storyLineItem.id && "Удалить"}
                            </Button>
                            }
                        </Space>
                    </List.Item>
                </List>
            </Card>
            {sceneSelectPopupVisible &&
                <Popup
                    visible={true}
                    bodyStyle={{
                        paddingBottom: '0px',
                        height: '100dvh',
                        overflow: 'auto'
                    }}
                    showCloseButton={true}
                    onClose={() => setSceneSelectPopupVisible(false)}
                >
                    <Card>
                        <List header={"Выбор сцены"}>
                            {sceneList?.map((scene) =>

                                <List.Item

                                    onClick={async () => {
                                        setSelectedScene(scene)
                                        const newData = {...storyLineItem, sceneId: scene.id}
                                        await props.onSave(newData)
                                        setStoryLineItem(
                                            {...newData}
                                        )
                                        setSceneSelectPopupVisible(false)
                                    }}
                                    key={scene.id}
                                >
                                    {scene?.sortOrderId}: {scene?.title}
                                </List.Item>
                            )}
                        </List>
                    </Card>
                </Popup>
            }
        </>
    )
}
