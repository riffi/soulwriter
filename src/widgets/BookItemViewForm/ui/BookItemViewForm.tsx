import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AutoCenter, Button, List, Popup, Space, Tabs} from "antd-mobile";
import {CloseCircleOutline, DownOutline, PictureOutline, SendOutline, UpOutline} from 'antd-mobile-icons'
import {InlineEdit} from "@shared/ui/InlineEdit";
import {InlineTextArea} from "@shared/ui/InlineTextArea/ui/InlineTextArea.tsx";
import {IconBlock} from "@shared/ui/IconBlock";
import {IconSelector} from "@shared/ui/IconSelector";
import {BookItemList, BookItemListMode} from "@features/bookItem/BookItemList";
import {BookItemBreadcrumbs} from "@features/bookItem/BookItemBreadcrumbs";
import {BookItemSelector} from "@features/bookItem/BookItemSelector";
import {BookItemLinks} from "@features/bookItem/BookItemLinks";
import {useBookItemViewForm} from "../model/useBookItemViewForm.ts";
import {IBookItemViewFormProps} from "../model/types.ts";

export const BookItemViewForm = (props: IBookItemViewFormProps) => {
    const {
        bookItem,
        changeBaseAttributeValue,
        onDeleteBookItemQuery,
        onMoveBookItemQuery,
        childCount,
        mentionCount
    } = useBookItemViewForm(props.bookId, props.bookItemId)

    const [showDetails, setShowDetails] = useState<boolean>()
    const [popupTransferVisible, setPopupTransferVisible] = useState<boolean>(false)
    const [iconSelectorPopupVisible, setIconSelectorPopupVisible] = useState<boolean>(false)


    const navigate = useNavigate()

    useEffect(() => {

       setShowDetails(() =>  {
           const childrenC = childCount? childCount : 0
           const mentionC = mentionCount? mentionCount : 0
           return (childrenC + mentionC) > 0
       })
    }, [props.bookItemId, childCount, mentionCount])

    if (!bookItem) return

    return (
        <>
            <BookItemBreadcrumbs
                bookItemId={bookItem.parentId}
                onClickItem={(bookItem) => navigate(`/book-item/card?id=${bookItem.id}`)}
                onClickTop={() => navigate('/book-items')}
            />
            <List>
                <List.Item
                    title={bookItem?.type ? bookItem?.type : "Название"}
                    key={"title"}
                    prefix={<>
                            {!bookItem?.iconName &&
                                <Button
                                    size={"middle"}
                                    color={"default"}
                                    style={{}}
                                    onClick={() => setIconSelectorPopupVisible(true)}
                                >
                                    <PictureOutline  style={{fontSize: '22px'}}/>
                                </Button>
                            }
                            <IconBlock
                                iconName={bookItem?.iconName}
                                style={{fontSize: '32px', marginRight: '10px'}}
                                onClick={() => setIconSelectorPopupVisible(true)}
                            />
                            </>
                    }
                >
                    <InlineEdit
                        value={bookItem?.title}
                        onChange={(val) => changeBaseAttributeValue("title", val, bookItem)}
                    />
                </List.Item>
                {!showDetails && <List.Item title={"Тип"} key={"type"}>
                    <InlineEdit
                        value={bookItem?.type}
                        onChange={(val) => changeBaseAttributeValue("type", val, bookItem)}
                    />
                </List.Item>
                }
                {!showDetails &&
                    <List.Item title={"Описание"} key={"description"}>
                        <InlineTextArea
                            value={bookItem?.description}
                            onChange={(val) => changeBaseAttributeValue("description", val, bookItem)}
                        />
                    </List.Item>
                }
            </List>



            <div
                style={{
                    borderTop: '1px solid #EEEEEE',
                    borderBottom: '1px solid #EEEEEE',
                    background: 'rgb(84 108 114 / 8%)',
                    cursor: 'pointer'
            }}
                onClick={() => setShowDetails((val) => !val)}
            >
                <AutoCenter>
                    {!showDetails &&
                        <Button
                            fill={"none"}
                            size={"small"}

                            style={{paddingTop: '3px', paddingBottom: '3px', color: "#AAAAAA"}}
                        >
                            <DownOutline/>
                        </Button>
                    }
                    {showDetails &&
                        <Button
                            fill={"none"}
                            size={"small"}
                            style={{paddingTop: '3px', paddingBottom: '3px', color: "#AAAAAA"}}
                        >
                            <UpOutline/>
                        </Button>}
                </AutoCenter>
            </div>
            {showDetails &&
                <>
                    <Tabs>
                        <Tabs.Tab
                            key={"children"}
                            title={"Детали"}
                        >
                            <BookItemList
                                parentId={bookItem?.id}
                                bookId={props.bookId}
                                header={"Описание мира"}
                                mode={BookItemListMode.CHILDREN}
                            />
                        </Tabs.Tab>
                        <Tabs.Tab title={"Свойства"} key={"description"}>
                            <List>
                                <List.Item title={"Тип"} key={"type"}>
                                    <InlineEdit
                                        value={bookItem?.type}
                                        onChange={(val) => changeBaseAttributeValue("type", val, bookItem)}
                                    />
                                </List.Item>
                                <List.Item title={"Описание"} key={"description"}>
                                    <InlineTextArea
                                        value={bookItem?.description}
                                        onChange={(val) => changeBaseAttributeValue("description", val, bookItem)}
                                    />
                                </List.Item>
                            </List>
                        </Tabs.Tab>
                        <Tabs.Tab title={"Упоминания"} key={"mentions"}>
                            {bookItem?.id && <BookItemLinks
                                bookItemId={bookItem.id}
                            />}
                        </Tabs.Tab>
                        <Tabs.Tab title={"Действия"} key={"actions"}>
                            <Space>
                                <Button
                                    color={"primary"}
                                    size={"mini"}
                                    onClick={() => {
                                        setPopupTransferVisible(true)
                                    }}
                                >
                                    <SendOutline /> Переместить
                                </Button>

                                <Button
                                    color={"danger"}
                                    size={"mini"}
                                    onClick={() => onDeleteBookItemQuery(bookItem)}
                                >
                                    <CloseCircleOutline/> Удалить
                                </Button>
                            </Space>
                        </Tabs.Tab>
                    </Tabs>

                </>
            }
            <Popup
                visible={popupTransferVisible}
                onMaskClick={() => setPopupTransferVisible(false)}
                showCloseButton={true}
                onClose={() => setPopupTransferVisible(false)}
            >
                <BookItemSelector
                    bookId={props.bookId}
                    title={`Переместить ${bookItem?.type}: ${bookItem?.title} в`}
                    actionTitle={'Переместить'}
                    parentBookItemId={-1}
                    onSelect={(id) => {
                        setPopupTransferVisible(false)
                        onMoveBookItemQuery(bookItem, id)}
                }
                />
            </Popup>

            <Popup
                visible={iconSelectorPopupVisible}
                onMaskClick={() => setIconSelectorPopupVisible(false)}
                bodyStyle={{overflow: "auto", height: "90dvh"}}
            >
                <IconSelector
                    onSelect={(iconName) => {
                        changeBaseAttributeValue("iconName", iconName, bookItem)
                        setIconSelectorPopupVisible(false)
                    }}
                />
            </Popup>

        </>
    )
}
