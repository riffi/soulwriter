import {useRef} from "react";
import {Button, Card, JumboTabs, List, Space} from "antd-mobile";
import {useGeneralSettings} from "../model/useGeneralSettings.ts";
import {UpOutline, UserCircleOutline} from 'antd-mobile-icons'
import {getAuthPageUrl} from "@features/GeneralSettings/api/YandexDiscAPI.ts";

export const GeneralSettings = () => {

    const textDbFileRef = useRef<HTMLInputElement>()
    const fileDbFileRef = useRef<HTMLInputElement>()

    const {importTextDb,
        importFileDB,
        exportTextDb,
        exportFileDb,
        exportDocx,
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
                    <List.Item>
                        <Button
                            onClick={() => {
                                window.location = getAuthPageUrl()
                            }}
                        >
                            <UserCircleOutline /> Авторизация Яндекс
                        </Button>
                    </List.Item>

                    <List.Item title={"Экспорт"} key={"export"}>
                        <Space wrap={true}>
                            <Button onClick={exportTextDb}>Выгрузить json</Button>
                            <Button onClick={exportDocx}>Выгрузить docx</Button>
                            <Button
                                onClick={() => uploadToYandexDiscQuery()}
                            >
                                <UpOutline /> Загрузить на яндекс диск
                            </Button>
                        </Space>
                    </List.Item>
                    <List.Item title={"Импорт"} key={"import"}>
                        <input ref={textDbFileRef} type="file" accept={"application/json"}/>
                        <Button onClick={queryImportTextDb} style={{marginTop: '10px'}}>
                            Импорт json
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
