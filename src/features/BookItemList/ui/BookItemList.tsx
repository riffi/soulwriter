import {IBookItemListProps} from "../model/types.ts";
import {useBookItemList} from "../model/useBookItemList.ts";
import {AutoCenter, Button, Ellipsis, Grid, Input, List, Popup} from "antd-mobile";
import {AddCircleOutline} from "antd-mobile-icons";
import styled from "./BookItemList.module.scss";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {IconBlock} from "@shared/ui/IconBlock";

export const BookItemList = (props: IBookItemListProps) => {

    const {bookItemList,
        onSaveNewItem
    } = useBookItemList(props.parentId, props.bookId, props.mode, props.searchStr)
    const [popupAddItemVisible, setPopupAddItemVisible] = useState<boolean>(false)
    const [newItemTitle, setNewItemTitle] = useState<string>("")
    const [newItemType, setNewItemType] = useState<string>("")

    const navigate = useNavigate()


    return (
        <>
        <List>
            {bookItemList?.map((bookItem) =>
                <List.Item
                    title={bookItem.type}
                    description={
                        <Ellipsis
                            direction={"end"}
                            content={bookItem.description}
                        />
                    }
                    prefix={
                        <IconBlock iconName={bookItem?.iconName} style={{fontSize: '35px'}}/>
                    }
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
                        setNewItemType("")
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
                <Input
                    className={styled.margined}
                    placeholder='Тип'
                    value={newItemType}
                    onChange={val => {
                        setNewItemType(val)
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

                <Button
                    color={"primary"}
                    onClick={() => {
                    onSaveNewItem(newItemTitle, newItemType)
                    setPopupAddItemVisible(false)
                }}>Сохранить</Button>
            </Grid>
        </Popup>
        </>
    )
}
