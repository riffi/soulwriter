import {useRef} from "react";
import {Button, List, Space} from "antd-mobile";
import {useGeneralSettings} from "../model/useGeneralSettings.ts";
import {DownOutline, UpOutline, UserCircleOutline} from 'antd-mobile-icons'

export const GeneralSettings = () => {

    const fileRef = useRef<HTMLInputElement>()

    const {exportBase,
        importBase,
        exportDocx,
        uploadToYandexDiscQuery,
        downloadFromYandexDiscQuery
    } = useGeneralSettings()


    const importDB = () => {
        const file: File | undefined = fileRef.current?.files?.[0]
        importBase(file)
    }

    return (
        <List>
            <List.Item>
                <Button
                    onClick={() => {
                        window.location = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=8532554d78da42c2ac5a5d7d9498185f'
                    }}
                >
                    <UserCircleOutline /> Авторизация Яндекс
                </Button>
            </List.Item>

            <List.Item title={"Экспорт"} key={"export"}>
                <Space wrap={true}>
                    <Button onClick={exportBase}>Выгрузить json</Button>
                    <Button onClick={exportDocx}>Выгрузить docx</Button>
                    <Button
                        onClick={() => uploadToYandexDiscQuery()}
                    >
                        <UpOutline /> Загрузить на яндекс диск
                    </Button>
                </Space>
            </List.Item>
            <List.Item title={"Импорт"} key={"import"}>
                <input ref={fileRef} type="file" accept={"application/json"}/>
                <Button onClick={importDB} style={{marginTop: '10px'}}>
                    Импорт json
                </Button>
            </List.Item>
            <List.Item title={"Импорт"}>
                <Button
                    onClick={() => downloadFromYandexDiscQuery()}
                >
                    <DownOutline /> Выгрузить из яндекс диска
                </Button>
            </List.Item>
        </List>
    )
}
