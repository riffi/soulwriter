import React, {useRef} from "react";
import {exportDB} from "dexie-export-import";
import {db, DbAdapter} from "../../../entities/Db/model/Db.ts";
import Dexie from "dexie";
import {Button, Space} from "antd-mobile";

export const GeneralSettings = () => {

    const fileRef = useRef<HTMLInputElement>()

    const exportBase = async () => {
        //
        // Export to Blob
        //
        const blob = await exportDB(db, {prettyJson: true});
        console.log(blob)
        const url = window.URL.createObjectURL(blob);
        const tempLink = document.createElement('a');
        tempLink.href = url;
        tempLink.setAttribute('download', 'exported.json');
        tempLink.click();
    }

    const importBase = async () => {
        const file: File | undefined = fileRef.current?.files?.[0]
        await db.delete()

        const  db2 = new Dexie("soulwriter");
        db2.version(DbAdapter.currentVersion).stores(DbAdapter.currentDbSchema)
        await db2.import(file)
        window.location.replace('/books')

    }

    return (
        <Space direction={"vertical"}>
            <Button onClick={exportBase}>Экспорт</Button>
            <input ref={fileRef} type="file"/>
            <Button onClick={importBase}>Импорт</Button>
        </Space>
    )
}
