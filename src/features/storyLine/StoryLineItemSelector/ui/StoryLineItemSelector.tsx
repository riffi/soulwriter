import {Card, List, Popup} from "antd-mobile";
import {useStoryLineItemSelector} from "../model/useStoryLineItemSelector.ts";
import {useState} from "react";
import {IStoryLine, IStoryLineItem} from "@entities/StoryLine/models/types.ts";
import {IStoryLineItemsSelectorProps} from "../model/types.ts";
import {CalendarOutline, CollectMoneyOutline} from "antd-mobile-icons";


export const StoryLineItemSelector = (props: IStoryLineItemsSelectorProps) => {

    const [itemPopupVisible, setItemPopupVisible] = useState<boolean>(false)
    const [selectedStoryLine, setSelectedStoryLine] = useState<IStoryLine>()

    const {storyLines, storyLineItems} = useStoryLineItemSelector(props.bookId, selectedStoryLine, props.excludeItemIds)

    const getSceneTitle = (storyLineItem: IStoryLineItem) => {
        if (!storyLineItem.sceneId) {
            return '[не привязано к сцене]'
        }
        else{
            return `Сцена ${storyLineItem.sceneData?.sortOrderId}: ${storyLineItem.sceneData?.title}`
        }
    }

    return (
        <>
        <List header={"Линии сюжета"}>
            {storyLines?.map((storyLine) =>
                <List.Item
                    clickable={true}
                    key={storyLine.id}
                    prefix={<CollectMoneyOutline/>}
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
                            prefix={<CalendarOutline />}
                            description={getSceneTitle(storyLineItem)}
                            onClick={() => {
                                props.onSelect?.(storyLineItem)
                                setItemPopupVisible(false)
                                props.onClose?.()
                            }}
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