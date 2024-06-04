import {ICharacterStoryLinesProps} from "@features/character/CharacterStoryLines/model/types.ts";
import {List} from "antd-mobile";
import {useCharacterStoryLines} from "@features/character/CharacterStoryLines/model/useCharacterStoryLines.ts";
import {CollectMoneyOutline} from "antd-mobile-icons";
import {TagList} from "@shared/ui/TagList";
import {useNavigate} from "react-router-dom";

export const CharacterStoryLines = (props: ICharacterStoryLinesProps) => {

    const {storyLines} = useCharacterStoryLines(props.characterId)

    const navigate = useNavigate()

    return (
        <List>
            {storyLines?.map(storyLine =>
                <List.Item
                    key={storyLine.id}
                    prefix={<CollectMoneyOutline/>}
                    description={
                        <TagList tags={
                            storyLine.characters?.map((c) => {
                                return {
                                    id: c.id,
                                    value: c.name
                                }
                            })
                        }/>
                    }
                    onClick={() => navigate(`/storyline/card?id=${storyLine.id}`)}
                >
                    {storyLine.title}
                </List.Item>
            )}
        </List>
    )
}
