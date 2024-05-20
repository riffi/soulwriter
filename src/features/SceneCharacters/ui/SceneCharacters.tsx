import {ISceneCharactersProps} from "../model/types.ts";
import {AutoCenter, Button, Card, Dropdown, FloatingPanel, Image, List, Popup} from "antd-mobile";
import {useSceneCharacters} from "../model/useSceneCharacters.ts";
import {AddCircleOutline, CloseOutline} from "antd-mobile-icons";
import {useState} from "react";
import {CharacterManager} from "../../CharacterManager";

export const SceneCharacters = (props: ISceneCharactersProps) => {
    const {sceneCharacters,
        getSceneCharactersFull,
        allCharacters,
        onAddCharacterToScene,
        onRemoveCharacterFromScene,
        getSceneCharacterIds
    } = useSceneCharacters(props.sceneId,props.bookId)

    const [charPopupVisible, setCharPopupVisible] = useState<boolean>(false)
    const anchors = [400, window.innerHeight * 0.2, window.innerHeight * 0.8]

    const sceneCharactersFull = getSceneCharactersFull()

    return (
        <>
        <List header={"Персонажи в сцене"}>
            {sceneCharactersFull?.map((sceneCharacter) =>
                <List.Item
                    key={sceneCharacter?.id}
                    description={sceneCharacter.description}
                    extra={
                        <Button fill={"none"} onClick={() => onRemoveCharacterFromScene(sceneCharacter)}>
                            <CloseOutline />
                        </Button>}
                    prefix={
                        <Image
                            src={sceneCharacter.avatar ? sceneCharacter.avatar: '/default-avatar.jpeg'}
                            style={{ borderRadius: 20 }}
                            fit='cover'
                            width={40}
                            height={40}
                        />
                    }
                >
                    {sceneCharacter?.name}
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
            {charPopupVisible &&
                <Popup
                    visible={true}
                    bodyStyle={{overflow: "auto", maxHeight: "90dvh"}}
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
                            excludeCharacterIds={getSceneCharacterIds()}
                            onClick={(character) => {
                                setCharPopupVisible(false)
                                onAddCharacterToScene({
                                    characterId: character.id,
                                    sceneId: props.sceneId,
                                    description: ''
                            })
                        }}/>
                    </Card>
                </Popup>
            }
        </>
    )
}