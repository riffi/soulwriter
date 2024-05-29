import {ISceneStoryLineItemsProps} from "../model/types.ts";
import {Card, List, Popup} from "antd-mobile";
import {useSceneStoryLineItems} from "../model/useSceneStoryLineItems.ts";
import {useState} from "react";
import {IStoryLine} from "@entities/StoryLine/models/types.ts";


export const SceneStoryLineItems = (props: ISceneStoryLineItemsProps) => {

    const [itemPopupVisible, setItemPopupVisible] = useState<boolean>(false)
    const [selectedStoryLine, setSelectedStoryLine] = useState<IStoryLine>()

    const {storyLines, storyLineItems} = useSceneStoryLineItems(props.bookId, props.sceneId, selectedStoryLine)


    return (
        <>
        <List header={"Линии сюжета"}>
            {storyLines?.map((storyLine) =>
                <List.Item
                    clickable={true}
                    key={storyLine.id}
                    onClick={() => {
                        setSelectedStoryLine(storyLine)
                        setItemPopupVisible(true)
                    }}
                >
                    {storyLine.title}
                </List.Item>
            )}
        </List>
        <Popup
            visible={itemPopupVisible}
            showCloseButton={true}
            bodyStyle={{overflow: "auto", maxHeight: "90dvh"}}
            onClose={() => setItemPopupVisible(false)}
            onMaskClick={() => setItemPopupVisible(false)}
            tabIndex={3}
        >
            <Card>
                <List header={"События"}>
                    {storyLineItems?.map((storyLineItem) =>
                        <List.Item
                            key={storyLineItem.id}
                            onClick={() => props.onSelect?.(storyLineItem)}
                        >
                            {storyLineItem.title}
                        </List.Item>
                    )}
                </List>
            </Card>
        </Popup>
        </>
    )
}