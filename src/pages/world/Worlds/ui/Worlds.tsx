import {WorldManager} from "../../../../widgets/WorldManager";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {NeedSelectBook} from "../../../../features/NeedSelectBook";
import React from "react";

export const Worlds = () => {
    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)

    if (!currentBook ||!currentBook?.id) return <NeedSelectBook/>

    return (
        <>
            <WorldManager/>
        </>
    )
}
