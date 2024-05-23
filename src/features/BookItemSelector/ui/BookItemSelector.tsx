import {BookItemSelectorProps} from "../model/types.ts";
import {AutoCenter, Button, Card, Checkbox, Ellipsis, List, SearchBar, Space} from "antd-mobile";
import {useBookItemSelector} from "../model/useBookItemSelector.ts";
import {useEffect, useState} from "react";
import {BookItemBreadcrumbs} from "@features/BookItemBreadcrumbs";
import {IconBlock} from "@shared/ui/IconBlock";
import {BookItemListMode} from "@features/BookItemList";


export const BookItemSelector = (props:BookItemSelectorProps) => {

    const [parentBookItemId, setParentBookItemId] = useState<number>(props.parentBookItemId)
    const [selectedId, setSelectedId] = useState<number>(props.selectedId)
    const [searchStr, setSearchStr] = useState<string>("")

    const mode: BookItemListMode = searchStr === '' ? BookItemListMode.CHILDREN : BookItemListMode.SEARCH

    const {
        bookItemList
    } = useBookItemSelector(parentBookItemId, props.bookId, mode, searchStr)

    useEffect(() => {

    }, [props.parentBookItemId]);


    const changeParent = (parentId: number) => {
        setParentBookItemId(parentId)
    }

    return (
        <Card>
        <SearchBar
            placeholder={"Поиск"}
            clearable={true}
            style={{marginTop: "25px", marginBottom: '15px'}}
            onChange={(val) => {
                setSearchStr(val)
            }}
        />
        {mode === BookItemListMode.CHILDREN && <BookItemBreadcrumbs
            bookItemId={parentBookItemId}
            onClickItem={(bookItem) => setParentBookItemId(bookItem?.id)}
            onClickTop={() => setParentBookItemId(-1)}
        />}
        <List>
            {bookItemList?.map((bookItem) =>
                <List.Item
                    key={bookItem.id}
                    prefix={
                    <>
                        <Space direction={"horizontal"}>
                        <Checkbox
                            block

                            checked={selectedId === bookItem.id}
                            onClick={(e) => {
                                setSelectedId((bookItem.id))
                                e.stopPropagation()
                            }}
                        ></Checkbox>
                        <IconBlock
                            iconName={bookItem?.iconName}
                            style={{fontSize: '22px'}}
                        />
                        </Space>
                    </>
                    }

                    description={
                        <Ellipsis
                            direction={"end"}
                            content={bookItem.description}
                        />
                    }
                    title={bookItem.type}
                    clickable={bookItem?.childCount ? bookItem?.childCount > 0 : false}
                    onClick={
                        () => {
                            if (bookItem?.childCount && bookItem?.childCount > 0){
                                changeParent(bookItem?.id)
                            }
                        }
                    }
                >
                    {bookItem.title}
                </List.Item>
            )}
        </List>
        <AutoCenter>
            <Button
                color={"primary"}
                onClick={() => props.onSelect(selectedId)}
            >
                {props.actionTitle ? props.actionTitle : 'Выбрать'}
            </Button>
        </AutoCenter>
        </Card>
    )
}
