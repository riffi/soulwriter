import {IStoryLineCharactersProps} from "@features/storyLine/StoryLineCharacters/model/types.ts";
import {AutoCenter, Button, Card, Image, List, Popup} from "antd-mobile";
import {useStoryLineCharacters} from "@features/storyLine/StoryLineCharacters/model/useStoryLineCharacters.ts";
import {AddCircleOutline, CloseOutline} from "antd-mobile-icons";
import {useNavigate} from "react-router-dom";
import {CharacterManager} from "@features/character/CharacterManager";
import {useState} from "react";
import {ImageViewer} from "@shared/ui/ImageViewer";

export const StoryLineCharacters = (props: IStoryLineCharactersProps) => {

    const {
        storyLineCharactersIds,
        characterList,
        removeCharacter,
        addCharacter
    } = useStoryLineCharacters(props.storyLine)

    const [charPopupVisible, setCharPopupVisible] = useState<boolean>(false)

    const navigate = useNavigate()

    return (
        <>
            <List>
                {characterList?.map((character) =>
                    <List.Item
                        key={character?.id}
                        description={character.description}
                        onClick={() => navigate(`/character/card?id=${character.id}`)}
                        extra={
                            <Button fill={"none"} onClick={(e) => {
                                e.stopPropagation()
                                removeCharacter(character)
                            }}>
                                <CloseOutline />
                            </Button>}
                        prefix={
                            <ImageViewer guid={character.avatar} />
                        }
                    >
                        {character?.name}
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
                            bookId={props.storyLine.bookId}
                            excludeCharacterIds={storyLineCharactersIds}
                            onClick={(character) => {
                                setCharPopupVisible(false)
                                addCharacter(character)
                            }}/>
                    </Card>
                </Popup>
            }
        </>
    )
}
