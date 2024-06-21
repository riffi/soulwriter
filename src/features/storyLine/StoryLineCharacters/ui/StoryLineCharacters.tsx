import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {AddCircleOutline, CloseOutline} from "antd-mobile-icons";
import {AutoCenter, Button, Card, List, Popup} from "antd-mobile";

import {ImageViewer} from "@shared/ui/ImageViewer";
import {CharacterManager} from "@features/character/CharacterManager";

import {IStoryLineCharactersProps} from "../model/types.ts";
import {useStoryLineCharacters} from "../model/useStoryLineCharacters.ts";

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
