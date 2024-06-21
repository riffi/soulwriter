import {useState} from "react";
import {Step} from "antd-mobile/es/components/steps/step";
import {AddCircleOutline, EditSOutline} from "antd-mobile-icons";
import {AutoCenter, Button, List, Popup, Steps} from "antd-mobile";

import {IStoryLineItem} from "@entities/StoryLine/models/types.ts";
import {EditStoryLineItemForm} from "@features/storyLine/EditStoryLineItemForm";

import {IStoryLineItemsProps} from "../model/types.ts";
import {useStoryLineItems} from "../model/useStoryLineItems.ts";


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
            <Steps
                direction='vertical'
                style={{
                    "--indicator-margin-right": "5px",
                    "--icon-size": "12px"
                }}
            >
                {storyLineItemsFull?.map((storyLineItem) =>
                    <Step
                        key={storyLineItem.id}
                        style={{"whiteSpace": "pre-line", padding: '0px'}}
                        title={
                        <div
                            style={{alignItems: 'flex-start', display: 'flex'}}
                        >
                            <div style={{flex: 'auto'}}>{storyLineItem.title}</div>
                            <Button fill={"none"}
                                    size={"small"}
                                    style={{flex: 'none'}}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setCurrentItem(storyLineItem)
                                        setAppendPopupVisible(true)
                                    }}
                            >
                                <EditSOutline/>
                            </Button>
                        </div>}
                        description={
                                getSceneTitle(storyLineItem)
                        }
                        status={storyLineItem.sceneId ? "finish" : "wait"}
                    >

                    </Step>
                )}
            </Steps>
            <List>
                {/*{storyLineItemsFull?.map((storyLineItem) =>*/}
                {/*    <List.Item*/}
                {/*        key={storyLineItem.id}*/}
                {/*        description={getSceneTitle(storyLineItem)}*/}
                {/*        style={{"whiteSpace": "pre-line"}}*/}
                {/*        extra={*/}
                {/*            <Button fill={"none"}*/}
                {/*                    onClick={(e) => {*/}
                {/*                        e.stopPropagation()*/}
                {/*                        setCurrentItem(storyLineItem)*/}
                {/*                        setAppendPopupVisible(true)*/}
                {/*                    }}*/}
                {/*            >*/}
                {/*                <EditSOutline/>*/}
                {/*            </Button>*/}
                {/*        }*/}
                {/*    >*/}
                {/*        {storyLineItem.title}*/}
                {/*    </List.Item>*/}
                {/*)}*/}
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
