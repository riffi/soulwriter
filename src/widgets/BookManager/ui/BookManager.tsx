import {useBookManager} from "../model/useBookManager.ts";
import {AutoCenter, Button, Grid, Input, List, Popup} from "antd-mobile";
import {AddCircleOutline, ContentOutline, EditSOutline} from "antd-mobile-icons";
import {useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {IBook} from "@entities/Book";
import {RootState} from "../../../store";
import {setCurrentBook} from '@features/BookContext/bookContextSlice.ts'
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
            <Grid columns={1} gap={1} style={{margin: '10px'}}>
                <h3>Добавить книжечечку</h3>
                <Input
                    placeholder='Название книжечечки'
                    value={newBookData.title}
                    onChange={val => {
                        setNewBookData((data) => {return {...data, title: val}})
                    }}
                />

                <Input
                    placeholder='Описание книжечечки'
                    value={newBookData.description}
                    onChange={val => {
                        setNewBookData((data) => {return {...data, description: val}})
                    }}
                />

                <Input
                    placeholder='Автор'
                    value={newBookData.author}
                    onChange={val => {
                        setNewBookData((data) => {return {...data, author: val}})
                    }}
                />

                <Button onClick={() => {
                    onSaveNewBook(newBookData)
                    setPopupAddBookVisible(false)
                }}>Сохранить</Button>
            </Grid>
        </Popup>
        </>
    )
}
