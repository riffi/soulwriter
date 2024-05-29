import {ISceneStoryLineItemsProps} from "../model/types.ts";
import {AutoCenter, Button, List, Popup} from "antd-mobile";
import {useState} from "react";
import {useSceneStoryLineItems} from "@features/scene/SceneStoryLineItems/model/useSceneStoryLineItems.ts";
import {StoryLineItemSelector} from "@features/storyLine/StoryLineItemSelector";
import {AddCircleOutline, CalendarOutline, CloseOutline, EditSOutline} from "antd-mobile-icons";



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
                    description={`Линия: ${item.storyLineData?.title}`}
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
            bodyStyle={{overflow: "auto", maxHeight: "90dvh"}}
            onClose={() => setSelectorPopupVisible(false)}
            onMaskClick={() => setSelectorPopupVisible(false)}
            tabIndex={3}
        >
            <StoryLineItemSelector
                bookId={props.bookId}
                onSelect={addItem}
                onClose={() => setSelectorPopupVisible(false)}
                excludeItemIds={selectedItemIds}
            />
        </Popup>}
        </>
    )
}