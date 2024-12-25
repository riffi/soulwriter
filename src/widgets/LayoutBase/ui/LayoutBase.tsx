import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {MainMenu} from "./MainMenu.tsx";
import styled from './LayoutBase.module.scss'
import {useEffect, useState} from "react";
import {Card, List, NavBar, Popup, Tag} from "antd-mobile";
import {PageRoute, pagesRoutes} from "@shared/route/pages.ts";
import { ContentOutline, SetOutline, TagOutline } from 'antd-mobile-icons'
import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {CustomMenuItemCode} from "@widgets/LayoutBase/model/types.ts";

export const LayoutBase = () => {
    const navigate = useNavigate();
    const [navbarTitle, setNavbarTitle] = useState<string>('')
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)
    const location = useLocation()
    const [route, setRoute] = useState<PageRoute>()

    const [moreOptionsPopupVisible, setMoreOptionsPopupVisible] = useState<boolean>(false)

    useEffect(
        () => {
            const route = pagesRoutes.find((pageRoute) => pageRoute.route == location.pathname)
            if (route){
                setNavbarTitle(route.title)
                document.title = route.title
                setRoute(route)
            }

        },
        [location],
    )

    const onSelectCustomMenuItem = (item: CustomMenuItemCode) => {
        if (item == CustomMenuItemCode.MORE){
            setMoreOptionsPopupVisible(true)
        }
    }

    return (
        <>
        <div className={styled.container}>
            <div className={styled.header}>
                <NavBar
                    onBack={() => navigate(-1)}
                    className={styled.navBar}
                    left={currentBook && <Tag color={"primary"}>{currentBook?.title}</Tag>}
                    right={
                          <ContentOutline
                              onClick={() => navigate('/books')}
                              className={styled.bookButton}
                          />
                    }
                >
                    {navbarTitle}
                </NavBar>
            </div>
            <div className={styled.outlet}>
                <Outlet/>
            </div>
            <div className={styled.mainMenu}>
                <MainMenu
                    route = { route }
                    onSelectCustomMenuItem = {onSelectCustomMenuItem}
                />
            </div>
        </div>

        { (
            <Popup
                bodyStyle={{overflow: "auto",  paddingTop: "0px"}}
                onMaskClick={() => setMoreOptionsPopupVisible(false)}
                showCloseButton={false}
                onClose={() => setMoreOptionsPopupVisible(false)}
                visible={moreOptionsPopupVisible}
            >
                <Card>
                    <List
                    >
                        <List.Item
                            style={{
                                fontSize: "20px",
                            }}
                            clickable
                            onClick={() => {
                                navigate('/notes')
                                setMoreOptionsPopupVisible(false)
                            }}
                            prefix={<TagOutline  />}
                        >
                            Заметки
                        </List.Item>
                        <List.Item
                            style={{
                                fontSize: "20px",
                            }}
                            clickable
                            onClick={() => {
                                navigate('/settings')
                                setMoreOptionsPopupVisible(false)
                            }}
                            prefix={<SetOutline/>}
                        >
                            Настройки
                        </List.Item>
                    </List>
                </Card>
            </Popup>
        )}
        </>
    )
}
