import {IStoryLineItemsProps} from "@features/storyLine/StoryLineItems/model/types.ts";
import {useStoryLineItems} from "@features/storyLine/StoryLineItems/model/useStoryLineItems.ts";
import {AutoCenter, Button, List, Popup} from "antd-mobile";
import {useState} from "react";
import {EditStoryLineItemForm} from "@features/storyLine/EditStoryLineItemForm";
import {IStoryLineItem} from "@entities/StoryLine/models/types.ts";
import {AddCircleOutline, EditSOutline} from "antd-mobile-icons";

export const StoryLineItems = (props: IStoryLineItemsProps) => {

    const {storyLineItemsFull,save} = useStoryLineItems(props.storyLine)

    const getInitialItemState = (): IStoryLineItem => {
        return {
            title: '',
            storyLineId: props.storyLine.id!
        }
    }

    const [currentItem, setCurrentItem] = useState<IStoryLineItem>(getInitialItemState())

    const [appendPopupVisible, setAppendPopupVisible] = useState<boolean>(false)

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
            <List>
                {storyLineItemsFull?.map((storyLineItem) =>
                    <List.Item
                        key={storyLineItem.id}
                        description={getSceneTitle(storyLineItem)}
                        style={{"whiteSpace": "pre-line"}}
                        extra={
                            <Button fill={"none"}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setCurrentItem(storyLineItem)
                                        setAppendPopupVisible(true)
                                    }}
                            >
                                <EditSOutline/>
                            </Button>
                        }
                    >
                        {storyLineItem.title}
                    </List.Item>
                )}
                <List.Item title={""} key={"add"}>
                    <AutoCenter>
                        <Button size='large' fill={'none'}  onClick={async  () => {
                            const newItem = getInitialItemState()
                            const newItemId = await save(getInitialItemState())
                            setCurrentItem({...newItem, id: newItemId})
                            setAppendPopupVisible(true)
                        }}>
                            <AddCircleOutline/>

                        </Button>
                    </AutoCenter>
                </List.Item>
            </List>
            {appendPopupVisible &&
                <Popup
                    visible={true}
                    bodyStyle={{
                        paddingBottom: '10px',
                        height: '100dvh',
                        overflow: 'auto'
                    }}
                >
                    <EditStoryLineItemForm
                        storyLineItem={currentItem}
                        onCancel={() => setAppendPopupVisible(false)}
                        bookId={props.storyLine.bookId}
                        onDelete = {() => setAppendPopupVisible(false)}
                        onSave={save}
                    />
                </Popup>
            }
        </>
    )
}
