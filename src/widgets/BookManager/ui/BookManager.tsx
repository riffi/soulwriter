import {useBookManager} from "../model/useBookManager.ts";
import {AutoCenter, Button, Grid, Input, List, Popup, Space} from "antd-mobile";
import {AddCircleOutline, ContentOutline, EditSOutline} from "antd-mobile-icons";
import {useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {IBook} from "@entities/Book";
import {RootState} from "../../../store";
import {setCurrentBook} from '@features/book/BookContext/bookContextSlice.ts'
import {useNavigate} from "react-router-dom";

export const BookManager = () => {
    const {bookList, onSaveNewBook } = useBookManager()
    const [popupAddBookVisible, setPopupAddBookVisible] = useState<boolean>(false)
    const [newBookData, setNewBookData] = useState<IBook>({title: ''})

    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <>
        <List>
            {bookList?.length === 0 && <List.Item>
                <div style={{
                    textAlign: "center",
                    fontSize: "22px"
                }}>
                    Добавьте вашу первую книгу!
                </div>
            </List.Item>}
            {bookList?.map((book)=>
                <List.Item
                    prefix={
                        <ContentOutline style={{fontSize: "40px"}}/>
                    }
                    extra={
                        <Button fill={"none"}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(`/book/card?id=${book.id}`)
                                }}
                        >
                            <EditSOutline />
                        </Button>

                    }
                    clickable={true}
                    description={book.description}
                    title={`Автор: ${book.author}`}
                    key={book.id}
                    style={(currentBook?.id === book.id)?{backgroundColor: '#F7F7F7'}:{}}
                    onClick={() => dispatch(setCurrentBook(book))}
                >
                    {book.title}
                </List.Item>
            )}
            <List.Item title={""} >
                <AutoCenter>
                 <Button size='large' fill={'none'}  onClick={() => {
                     setPopupAddBookVisible(true)
                    }}>
                        <AddCircleOutline />

                    </Button>
                </AutoCenter>
            </List.Item>
        </List>
        <Popup
            visible={popupAddBookVisible}
            onMaskClick={() => setPopupAddBookVisible(false)}
        >
            <List header={"Добавить книгу"}>
                <List.Item>
                    <Input
                        placeholder='Название книги'
                        value={newBookData.title}
                        onChange={val => {
                            setNewBookData((data) => {return {...data, title: val}})
                        }}
                    />
                </List.Item>
                <List.Item>
                    <Input
                        placeholder='Описание'
                        value={newBookData.description}
                        onChange={val => {
                            setNewBookData((data) => {return {...data, description: val}})
                        }}
                    />
                </List.Item>
                <List.Item>
                    <Input
                        placeholder='Автор'
                        value={newBookData.author}
                        onChange={val => {
                            setNewBookData((data) => {return {...data, author: val}})
                        }}
                    />
                </List.Item>
                <List.Item>
                    <Button onClick={() => {
                        onSaveNewBook(newBookData)
                        setPopupAddBookVisible(false)
                    }}>Сохранить</Button>
                </List.Item>
            </List>
        </Popup>
        </>
    )
}
