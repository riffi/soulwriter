import {BookItemSelectorProps} from "../model/types.ts";
import {AutoCenter, Button, Checkbox, Ellipsis, List, Space} from "antd-mobile";
import {useBookItemSelector} from "../model/useBookItemSelector.ts";
import {useEffect, useState} from "react";
import {BookItemBreadcrumbs} from "../../BookItemBreadcrumbs";
import {IconBlock} from "../../../shared/ui/IconBlock";


export const BookItemSelector = (props:BookItemSelectorProps) => {

    const [parentBookItemId, setParentBookItemId] = useState<number>(props.parentBookItemId)
    const [selectedId, setSelectedId] = useState<number>(props.selectedId)


    const {
        bookItemList
    } = useBookItemSelector(parentBookItemId, props.bookId)

    useEffect(() => {

    }, [props.parentBookItemId]);


    const changeParent = (parentId: number) => {
        setParentBookItemId(parentId)
    }

    return (
        <>
        <h3>{props.title}</h3>
        <BookItemBreadcrumbs
            bookItemId={parentBookItemId}
            onClickItem={(bookItem) => setParentBookItemId(bookItem?.id)}
            onClickTop={() => setParentBookItemId(-1)}
        />
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
        </>
    )
}
