import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {MainMenu} from "./MainMenu.tsx";
import styled from './Layout.module.scss'
import React, {useEffect, useState} from "react";
import {Badge, Button, NavBar, Tag} from "antd-mobile";
import {PageRoute, pagesRoutes} from "../../../shared/route/pages.ts";
import { ContentOutline } from 'antd-mobile-icons'
import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";

export const Layout = () => {
    const navigate = useNavigate();
    const [navbarTitle, setNavbarTitle] = useState<string>('')
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)
    const location = useLocation()
    const [route, setRoute] = useState<PageRoute>()
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

    return (
        <>
            <div className={styled.header}>
                <NavBar
                    onBack={() => navigate(-1)}
                    className={styled.navBar}
                    left={<Tag color={"primary"}>{currentBook?.title}</Tag>}
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
                <MainMenu route = { route }/>
            </div>
        </>
    )
}
