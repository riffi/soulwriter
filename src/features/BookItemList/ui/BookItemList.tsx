import {IBookItemListProps} from "../model/types.ts";
import {useBookItemList} from "../model/useBookItemList.ts";
import {AutoCenter, Button, Grid, Input, List, Popup, Selector, Tabs} from "antd-mobile";
import {AddCircleOutline} from "antd-mobile-icons";
import styled from "../../../widgets/CharacterAttributeManager/ui/CharacterAttributeManager.module.scss";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export const BookItemList = (props: IBookItemListProps) => {

    const {bookItemList,
        onSaveNewItem
    } = useBookItemList(props.parentId, props.worldId, props.bookId)
    const [popupAddItemVisible, setPopupAddItemVisible] = useState<boolean>(false)
    const [newItemTitle, setNewItemTitle] = useState<string>("")
    const [newItemName, setNewItemName] = useState<string>("")
    const [newChildrenHeader, setNewChildrenHeader] = useState<string>("")
    const [newIsGroup, setNewIsGroup] = useState<boolean>(true)

    const navigate = useNavigate()


    return (
        <>
        <List
            header={props.header}
            style={{"--border-top": "none", "--border-bottom": "none"}}
        >
            {bookItemList?.map((bookItem) =>
                <List.Item
                    title={bookItem.name}
                    key={bookItem.id}
                    clickable={true}
                    onClick={() => navigate(`/book-item/card?id=${bookItem.id}`)}
                >
                    {bookItem.title}
                </List.Item>
            )}
            <List.Item title={""} key={"add"}>
                <AutoCenter>
                    <Button size='large' fill={'none'}  onClick={() => {
                        setPopupAddItemVisible(true)
                        setNewItemTitle("")
                        setNewItemName("")
                        setNewChildrenHeader("")
                    }}>
                        <AddCircleOutline />

                    </Button>
                </AutoCenter>
            </List.Item>
        </List>
        <Popup
            visible={popupAddItemVisible}
            onMaskClick={() => setPopupAddItemVisible(false)}
        >
            <Grid columns={1} gap={1} style={{margin: '10px'}}>
                <h3>Добавить элемент</h3>
                <Selector
                    options={[
                        {label: 'Группа', value: "t"},
                        {label: 'Элемент', value: "f"}
                    ]}
                    defaultValue={["t"]}
                    onChange={(val) => setNewIsGroup(val[0] === 't')}
                />
                <Input
                    className={styled.margined}
                    placeholder='Тип'
                    value={newItemName}
                    onChange={val => {
                        setNewItemName(val)
                    }}
                />
                <Input
                    className={styled.margined}
                    placeholder='Название'
                    value={newItemTitle}
                    onChange={val => {
                        setNewItemTitle(val)
                    }}
                />
                <Input
                    className={styled.margined}
                    placeholder='Название внутренних частей'
                    value={newChildrenHeader}
                    onChange={val => {
                        setNewChildrenHeader(val)
                    }}
                />

                <Button onClick={() => {
                    onSaveNewItem(newItemTitle, newItemName, newChildrenHeader, newIsGroup)
                    setPopupAddItemVisible(false)
                }}>Сохранить</Button>
            </Grid>
        </Popup>
        </>
    )
}
