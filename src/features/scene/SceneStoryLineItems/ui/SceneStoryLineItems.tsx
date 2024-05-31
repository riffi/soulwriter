import {ISceneStoryLineItemsProps} from "../model/types.ts";
import {AutoCenter, Button, List, Popup} from "antd-mobile";
import {useState} from "react";
import {useSceneStoryLineItems} from "@features/scene/SceneStoryLineItems/model/useSceneStoryLineItems.ts";
import {StoryLineItemSelector} from "@features/storyLine/StoryLineItemSelector";
import {AddCircleOutline, CalendarOutline, CloseOutline} from "antd-mobile-icons";
import {TagList} from "@shared/ui/TagList";



export const SceneStoryLineItems = (props: ISceneStoryLineItemsProps) => {

    const [selectorPopupVisible, setSelectorPopupVisible] = useState<boolean>(false)
    const {
        storyLineItems,
        addItem,
        removeItem
    } = useSceneStoryLineItems(props.bookId, props.sceneId)

    const selectedItemIds = storyLineItems?.map((i) => i.id)

    return (
        <>
        <List header={"События сюжетных линий"}>
            {storyLineItems?.map((item) =>
                <List.Item
                    clickable={false}
                    key={item.id}
                    prefix={<CalendarOutline />}
                    title={`Линия: ${item.storyLineData?.title}`}
                    description={
                        <TagList tags={
                            item.storyLineData?.characters?.map((c) => {
                                return {
                                    id: c.id,
                                    value: c.name
                                }
                            })
                        }/>
                    }
                    extra={
                        <Button fill={"none"}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    removeItem(item)
                                }}
                        >
                            <CloseOutline/>
                        </Button>
                    }
                >
                    {item.title}
                </List.Item>
            )}
            <List.Item title={""} key={"add"}>
                <AutoCenter>
                    <Button
                        size='large'
                        fill={'none'}
                        onClick={async  () => {
                            setSelectorPopupVisible(true)
                        }}>
                        <AddCircleOutline/>

                    </Button>
                </AutoCenter>
            </List.Item>
        </List>
        {selectorPopupVisible && <Popup
            visible={true}
            showCloseButton={true}
            bodyStyle={{overflow: "auto", height: "80dvh"}}
            onClose={() => setSelectorPopupVisible(false)}
            onMaskClick={() => setSelectorPopupVisible(false)}
            tabIndex={3}
        >
            <StoryLineItemSelector
                bookId={props.bookId}
                sceneId={props.sceneId}
                onSelect={addItem}
                onClose={() => setSelectorPopupVisible(false)}
                excludeItemIds={selectedItemIds}
            />
        </Popup>}
        </>
    )
}
