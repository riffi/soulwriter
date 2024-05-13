import styled from './Characters.module.scss'
import {CharacterManager} from "../../../../widgets/CharacterManager";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {AutoCenter, Space} from "antd-mobile";
import React from "react";
import {ContentOutline} from "antd-mobile-icons";
import {NeedSelectBook} from "../../../../features/NeedSelectBook";
export const Characters = () => {

    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return (
        <div className={styled.charactersPage}>
            <CharacterManager bookId = {currentBook.id}/>
        </div>
    )
}
