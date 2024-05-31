import {AutoCenter, Button, CapsuleTabs, Card, Input, List, Popup, Space, Tag, TextArea} from "antd-mobile";
import {useStoryLineItemSelector} from "../model/useStoryLineItemSelector.ts";
import {useState} from "react";
import {IStoryLine, IStoryLineItem} from "@entities/StoryLine/models/types.ts";
import {IStoryLineItemsSelectorProps} from "../model/types.ts";
import {AddCircleOutline, CalendarOutline, CollectMoneyOutline, RightOutline} from "antd-mobile-icons";
import {TagList} from "@shared/ui/TagList";

enum IItemsFilter{
    ALL = 'ALL',
    UNBOUND = 'UNBOUND'
}
export const StoryLineItemSelector = (props: IStoryLineItemsSelectorProps) => {

    const [itemPopupVisible, setItemPopupVisible] = useState<boolean>(false)
    const [itemAddPopupVisible, setItemAddPopupVisible] = useState<boolean>(false)
    const [selectedStoryLine, setSelectedStoryLine] = useState<IStoryLine>()
    const [itemsFilter, setItemsFilter] = useState<IItemsFilter>(IItemsFilter.UNBOUND)
    const [newItemTitle, setNewItemTitle] = useState<string>("")

    const {
        storyLines,
        storyLineItems,
        save
    } = useStoryLineItemSelector(props.bookId, selectedStoryLine, props.excludeItemIds)

    const filteredStoryLineItems = itemsFilter === IItemsFilter.ALL ?
        storyLineItems
        : storyLineItems?.filter((i) => !i.sceneId)

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
        {!itemPopupVisible && <List header={"Выберите линию сюжета"}>
            {storyLines?.map((storyLine) =>
                <List.Item
                    clickable={true}
                    key={storyLine.id}
                    prefix={<CollectMoneyOutline/>}
                    onClick={() => {
                        setSelectedStoryLine(storyLine)
                        setItemPopupVisible(true)
                    }}
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
                >
                    {storyLine.title}
                </List.Item>
            )}
        </List>}
        {itemPopupVisible && <Card>
                <List header={
                    <Space direction={"horizontal"} wrap={true}>
                        <Tag
                            key={selectedStoryLine?.id}
                            style={{cursor: 'pointer'}}
                            color={"primary"}
                            onClick={() => setItemPopupVisible(false)}
                        >
                            Сюжетные линии
                        </Tag>
                        <RightOutline key={'arrow-world'} style={{color: '#AAAAAA', marginLeft: '5px'}}/>
                        <div> {selectedStoryLine?.title}</div>
                    </Space>

                }>
                    <CapsuleTabs activeKey={itemsFilter}
                        onChange={(key) => {
                            setItemsFilter(key)
                        }}
                    >
                        <CapsuleTabs.Tab title={"Не привязанные"} key={IItemsFilter.UNBOUND}/>
                        <CapsuleTabs.Tab title={"Все"} key={IItemsFilter.ALL}/>
                    </CapsuleTabs>
                    {filteredStoryLineItems?.map((storyLineItem) =>
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
                    <List.Item title={""} key={"add"}>
                        <AutoCenter>
                            <Button size='large' fill={'none'}  onClick={async  () => {
                                setNewItemTitle("")
                                setItemAddPopupVisible(true)
                            }}>
                                <AddCircleOutline/>

                            </Button>
                        </AutoCenter>
                    </List.Item>
                </List>
            </Card>}
            <Popup
                visible={itemAddPopupVisible}
                showCloseButton={true}
                bodyStyle={{overflow: "auto", height: "70dvh"}}
                onClose={() => setItemAddPopupVisible(false)}
                onMaskClick={() => setItemAddPopupVisible(false)}
                tabIndex={3}
            >
                <List header={"Добавление события"}>
                    <List.Item>
                        <TextArea
                            value={newItemTitle}
                            onChange={(val) => setNewItemTitle(val)}
                            placeholder={"Название события"}
                        />
                    </List.Item>
                    <List.Item>
                        <Button
                            color={"primary"}
                            onClick={async () => {
                                if (!selectedStoryLine) return
                                await save({
                                    title: newItemTitle,
                                    sceneId: props.sceneId,
                                    storyLineId: selectedStoryLine?.id!
                                })
                                setItemAddPopupVisible(false)
                                setItemPopupVisible(false)
                                props.onClose()
                            }}
                        >
                            Добавить
                        </Button>
                    </List.Item>
                </List>
            </Popup>
        {/*</Popup>*/}
        </>
    )
}
