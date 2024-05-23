import {Button, Card, Input, List, Popup, Space} from "antd-mobile";
import {CloseOutline} from "antd-mobile-icons";
import {IEditSceneLinkFormProps} from "../model/types.ts";
import {useState} from "react";
import {ISceneLink} from "@entities/Scene";
import {BookItemSelector} from "../../BookItemSelector";
import {useSceneLinks} from "../model/useSceneLinks.ts";

export const EditSceneLinkForm = (props: IEditSceneLinkFormProps) => {

    const [sceneLink, setSceneLink] = useState<ISceneLink>(props.sceneLink)
    const [bookItemSelectorPopupVisible, setBookItemSelectorPopupVisible] = useState<boolean>(false)

    const {
        newBookItemData,
    } = useSceneLinks(props.bookId, props.sceneId, sceneLink?.bookItemId)

    return (
        <>
        <Card
            title={props.sceneLink?.id ? 'Редактирование связи' : 'Добавление связи'}
            extra={
                <Button fill={"none"}
                        onClick={props.onCancel}
                >
                    <CloseOutline />
                </Button>
            }
        >
            <List>

                <List.Item key={"title"} title={"Название связи"}>
                    <Input
                        placeholder={"Название"}
                        value={sceneLink.title}
                        onChange={(val) => {
                            setSceneLink((oldData) => {
                                return {...oldData, title: val}
                            })
                        }}
                    />
                </List.Item>
                <List.Item key={"bookItemId"} title={"Элемент"}>
                    <div>
                        {newBookItemData?.type ? newBookItemData?.type + ':' : ''} {newBookItemData?.title}
                    </div>
                    <Button
                        size={"mini"}

                        onClick={() => setBookItemSelectorPopupVisible(true)}
                    >
                        Выбрать
                    </Button>
                </List.Item>

                <List.Item>
                    <Space>
                        <Button
                            color={"success"}
                            onClick={() => {
                                props.onSubmit(sceneLink)
                            }}
                        >
                            {!props.sceneLink.id && "Добавить"}
                            {props.sceneLink.id && "Сохранить"}
                        </Button>
                        {props.sceneLink.id && <Button
                            color={"danger"}
                            onClick={() => {
                                props.onDelete(sceneLink)
                            }}
                        >
                            {props.sceneLink.id && "Удалить"}
                        </Button>
                        }
                    </Space>
                </List.Item>
            </List>
        </Card>
        <Popup
            visible={bookItemSelectorPopupVisible}
            onMaskClick={() => setBookItemSelectorPopupVisible(false)}
            onClose={() => setBookItemSelectorPopupVisible(false)}
            showCloseButton={true}
            bodyStyle={{
                paddingBottom: '10px',
                height: '100dvh',
                overflow: 'auto'

            }}
        >
            <BookItemSelector
                bookId={props.bookId}
                parentBookItemId={props.sceneLink.bookItemData? props.sceneLink.bookItemData.parentId  : -1}
                selectedId={props.sceneLink.bookItemId}
                onSelect={(bookItemId) => {
                    setSceneLink((oldData) => {
                        return {...oldData, bookItemId: bookItemId}
                    })
                    setBookItemSelectorPopupVisible(false)
                }}
            />
        </Popup>

    </>
    )
}
