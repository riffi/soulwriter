import {AutoCenter, Button, Card, Image, List, Popup, Space} from "antd-mobile";
import {AddCircleOutline, CloseOutline} from "antd-mobile-icons";
import {IEditSceneLinkFormProps} from "../model/types.ts";
import {useState} from "react";
import {ISceneLink} from "@entities/Scene";
import {BookItemSelector} from "../../../bookItem/BookItemSelector";
import {useSceneLinks} from "../model/useSceneLinks.ts";
import {CharacterManager} from "@features/character/CharacterManager";
import {ViewMode} from "@shared/model/types.ts";
import {ICharacter, ICharacterLink} from "@entities/Character";
import {InlineTextArea} from "@shared/ui/InlineTextArea";

export const EditSceneLinkForm = (props: IEditSceneLinkFormProps) => {

    const [sceneLink, setSceneLink] = useState<ISceneLink>(props.sceneLink)
    const [bookItemSelectorPopupVisible, setBookItemSelectorPopupVisible] = useState<boolean>(false)
    const [charPopupVisible, setCharPopupVisible] = useState<boolean>(false)

    const {
        newBookItemData,
        saveLink,
        appendCharacterLink,
        removeCharacterLink
    } = useSceneLinks(props.bookId, props.sceneId, sceneLink?.bookItemId)

    const usedCharactersIds = sceneLink?.characterLinks?.map((link) => link.characterId)
    const onAppendCharacter = async (character: ICharacter) => {
        setCharPopupVisible(false)
        const newCharLink: ICharacterLink = {
            characterId: character.id,
            character: character,
            sceneLinkId: sceneLink.id,
        }
        await appendCharacterLink(newCharLink)
        const newData = {...sceneLink}
        if (!newData.characterLinks) newData.characterLinks = []
        newData.characterLinks.push(newCharLink)
        setSceneLink(newData)
    }

    const onDeleteCharacter = async (characterLink: ICharacterLink) => {
        console.log(characterLink)
        await removeCharacterLink(characterLink)
        const newData = {...sceneLink}
        if (!newData.characterLinks) newData.characterLinks = []
        newData.characterLinks = newData.characterLinks.filter((link) => link.id !== characterLink.id)
        setSceneLink(newData)
    }

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
                    <InlineTextArea
                        value={sceneLink.title}
                        defaultMode={sceneLink?.title !== '' ? ViewMode.READ : ViewMode.WRITE}
                        onChange={async (val) => {
                            const newData = {...sceneLink, title: val}
                            await saveLink(newData)
                            setSceneLink(() => {
                                return {...newData}
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
                <List header={"Персонажи"}>
                    {sceneLink?.characterLinks?.map((characterLink) =>
                        <List.Item
                            key = {characterLink.characterId}
                            prefix={
                                <Image
                                    src={characterLink?.character?.avatar ? characterLink?.character?.avatar : '/default-avatar.jpeg'}
                                    style={{ borderRadius: 20 }}
                                    fit='cover'
                                    width={40}
                                    height={40}
                                />
                            }
                            extra={
                                <Button fill={"none"} onClick={async (e) => {
                                    e.stopPropagation()
                                    await onDeleteCharacter(characterLink)
                                }}>
                                    <CloseOutline />
                                </Button>}
                        >
                            {characterLink?.character?.name}
                        </List.Item>
                    )}
                    <List.Item title={""} key={"add"}>
                        <AutoCenter>
                            <Button size='large' fill={'none'}  onClick={() => {
                                setCharPopupVisible(true)
                            }}>
                                <AddCircleOutline/>

                            </Button>
                        </AutoCenter>
                    </List.Item>
                </List>
                <List.Item>
                    <Space>
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
                    const newData = {...sceneLink,  bookItemId: bookItemId}
                    saveLink(newData)
                    setSceneLink(() => {
                        return {...newData}
                    })
                    setBookItemSelectorPopupVisible(false)
                }}
            />
        </Popup>

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
                        bookId={props.bookId}
                        excludeCharacterIds={usedCharactersIds}
                        onClick={onAppendCharacter}/>
                </Card>
            </Popup>
        }

    </>
    )
}
