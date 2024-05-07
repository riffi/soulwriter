import {Outlet} from "react-router-dom";
import {Navbar} from "./Navbar";
import styled from './Layout.module.scss'

export const Layout = () => {

    return (
        <>
            <div className={styled.outlet}>
                <Outlet/>
            </div>
            <div className={styled.mainMenu}>
                <Navbar/>
            </div>
        </>
    )
}
