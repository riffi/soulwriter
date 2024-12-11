import {useState} from "react";
import {Step} from "antd-mobile/es/components/steps/step";
import {AddCircleOutline, CalendarOutline, EditSOutline, TextOutline} from "antd-mobile-icons";
import {AutoCenter, Button, List, Popup, Steps} from "antd-mobile";

import {IStoryLineItem} from "@entities/StoryLine/models/types.ts";
import {EditStoryLineItemForm} from "@features/storyLine/EditStoryLineItemForm";

import {IStoryLineItemsProps, IStoryLineSortKind} from "../model/types.ts";
import {useStoryLineItems} from "../model/useStoryLineItems.ts";


export const StoryLineItems = (props: IStoryLineItemsProps) => {

    const getInitialItemState = (): IStoryLineItem => {
        return {
            title: '',
            storyLineId: props.storyLine.id!
        }
    }

    const [sortKind, setSortKind] = useState<IStoryLineSortKind>(IStoryLineSortKind.BY_DATE)

    const [currentItem, setCurrentItem] = useState<IStoryLineItem>(getInitialItemState())

    const [appendPopupVisible, setAppendPopupVisible] = useState<boolean>(false)

    const {storyLineItemsFull, save, deleteItem} = useStoryLineItems(props.storyLine, sortKind)




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
            <Button
                size={"mini"}
                style={{marginBottom:  '10px'}}
                onClick={() => {
                    if (sortKind === IStoryLineSortKind.BY_DATE){
                        setSortKind(IStoryLineSortKind.BY_SORT_ORDER)
                    }
                    else{
                        setSortKind(IStoryLineSortKind.BY_DATE)
                    }
                }}
            >
                {sortKind === IStoryLineSortKind.BY_DATE && <div>
                    <CalendarOutline style={{fontSize: '16px', marginRight: '5px'}}/>
                    Сортировка по времени
                </div>}
                {sortKind === IStoryLineSortKind.BY_SORT_ORDER &&
                <div>
                    <TextOutline style={{fontSize: '16px', marginRight: '5px'}}/>
                    Сортировка по порядку сцен
                </div>}
            </Button>
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
                        onDelete = {(item) => {
                          setAppendPopupVisible(false)
                          deleteItem(item)
                        }}
                        onSave={save}
                    />
                </Popup>
            }
        </>
    )
}
