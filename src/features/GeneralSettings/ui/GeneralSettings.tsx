import {useRef} from "react";
import {Button, Card, JumboTabs, List, Space} from "antd-mobile";
import {useGeneralSettings} from "../model/useGeneralSettings.ts";
import {DownlandOutline, GlobalOutline, UploadOutline, UserCircleOutline} from 'antd-mobile-icons'
import {getAuthPageUrl} from "@features/GeneralSettings/api/YandexDiscAPI.ts";

export const GeneralSettings = () => {

    const textDbFileRef = useRef<HTMLInputElement>()
    const fileDbFileRef = useRef<HTMLInputElement>()

    const {importTextDb,
        importFileDB,
        exportTextDb,
        exportFileDb,
        exportDocx,
        exportEpub,
        uploadToYandexDiscQuery,
    } = useGeneralSettings()


    const queryImportTextDb = () => {
        const file: File | undefined = textDbFileRef.current?.files?.[0]
        importTextDb(file)
    }

    const queryImportFileDb = () => {
        const file: File | undefined = fileDbFileRef.current?.files?.[0]
        importFileDB(file)
    }

    return (
        <>
        <JumboTabs >
            <JumboTabs.Tab title={""} description={"Текстовая База"} key={"textDB"}>
                <List>

                    <List.Item title={"Экспорт"} key={"export"}>
                        <Space wrap={true}>
                            <Button onClick={exportTextDb}>
                                <DownlandOutline /> Экспорт в json
                            </Button>
                            <Button onClick={exportDocx}>
                                <DownlandOutline /> Экспорт в docx
                            </Button>
                            <Button onClick={exportEpub}>
                                <DownlandOutline /> Экспорт в epub
                            </Button>

                        </Space>
                    </List.Item>
                    <List.Item  title={"Яндекс диск"}>
                        <Space wrap={true}>
                        <Button
                            onClick={() => uploadToYandexDiscQuery()}
                        >
                            <GlobalOutline  /> Загрузить на яндекс диск
                        </Button>
                        <Button
                            onClick={() => {
                                window.location = getAuthPageUrl()
                            }}
                        >
                            <UserCircleOutline /> Авторизация Яндекс
                        </Button>
                        </Space>
                    </List.Item>
                    <List.Item title={"Импорт"} key={"import"}>
                        <input ref={textDbFileRef} type="file" accept={"application/json"}/>
                        <Button onClick={queryImportTextDb} style={{marginTop: '10px'}}>
                            <UploadOutline /> Импорт json
                        </Button>
                    </List.Item>
                </List>
            </JumboTabs.Tab>
            <JumboTabs.Tab title={""} description={"База изображений"} key={"fileDB"}>
                <List>

                    <List.Item title={"Экспорт картинок"} key={"export"}>
                        <Space wrap={true}>
                            <Button onClick={exportFileDb}>Выгрузить json картинок</Button>
                        </Space>
                    </List.Item>
                    <List.Item title={"Импорт картинок"} key={"import"}>
                        <input ref={fileDbFileRef} type="file" accept={"application/json"}/>
                        <Button onClick={queryImportFileDb} style={{marginTop: '10px'}}>
                            Импорт json картинок
                        </Button>
                    </List.Item>

                </List>
            </JumboTabs.Tab>
        </JumboTabs>



        </>
    )
}
