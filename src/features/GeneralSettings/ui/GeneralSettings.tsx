import {useRef} from "react";
import {Button, List, Space} from "antd-mobile";
import {useGeneralSettings} from "../model/useGeneralSettings.ts";

export const GeneralSettings = () => {

    const fileRef = useRef<HTMLInputElement>()

    const {exportBase,
        importBase,
        exportDocx
    } = useGeneralSettings()


    const importDB = () => {
        const file: File | undefined = fileRef.current?.files?.[0]
        importBase(file)
    }

    return (
        <List>
            <List.Item title={"Экспорт"} key={"export"}>
                <Space>
                    <Button onClick={exportBase}>Выгрузить json</Button>
                    <Button onClick={exportDocx}>Выгрузить docx</Button>
                </Space>
            </List.Item>
            <List.Item title={"Импорт"} key={"import"}>
                <input ref={fileRef} type="file" accept={"application/json"}/>
                <Button onClick={importDB} style={{marginTop: '10px'}}>
                    Импорт json
                </Button>
            </List.Item>
        </List>
    )
}
