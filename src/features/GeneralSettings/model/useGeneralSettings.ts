import {exportDB} from "dexie-export-import";
import {db, DbAdapter} from "@entities/Db/model/Db.ts";
import moment from "moment/moment";
import Dexie from "dexie";
import { Document, Packer, Paragraph } from "docx";
import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {makeCleanTextFromHtml} from "@shared/lib/HtmlUtils.ts";
import {Dialog, Toast} from "antd-mobile";
import {uploadFile} from "@features/GeneralSettings/api/YandexDiscAPI.ts";
import {fileDb, FileDbAdapter} from "@entities/Db/model/fileDb.ts";



const downloadBlob = (blob: Blob, fileName: string) => {
    const url = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.href = url;

    tempLink.setAttribute('download', fileName);
    tempLink.click();
}

const generateTextDbFileName = () => {
    const date = moment();
    const dateStr = date.format("YYYY-MM-DD_HH-mm-ss")
    return `soulwriter-${dateStr}.json`
}

const generateFileDBFileName = () => {
    const date = moment();
    const dateStr = date.format("YYYY-MM-DD_HH-mm-ss")
    return `soulwriterFiles-${dateStr}.json`
}

export const useGeneralSettings = () => {

    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)
    const yandexToken = useSelector((state: RootState) => state.yandexContext.accessToken)
    const exportTextDb = async () => {
        const blob = await exportDB(db, {prettyJson: true});

        const fileName = generateTextDbFileName()
        downloadBlob(blob, fileName)
    }

    const exportFileDb = async () => {
        const blob = await exportDB(fileDb, {prettyJson: true});

        const fileName = generateFileDBFileName()
        downloadBlob(blob, fileName)
    }

    const uploadToYandexDiscQuery = () => {
        Dialog.show({
            content: 'Загрузить данные на яндекс диск?',
            closeOnMaskClick: true,
            closeOnAction: true,
            actions:[
                {
                    key: 'ok',
                    text:'Загрузить',
                    onClick: () => uploadToYandexDisc()
                },
                {
                    key: 'cancel',
                    text:'Отмена',
                    onClick: () => (undefined)
                }

            ]
        })
    }


    const uploadToYandexDisc = async () => {
        try{
            if (yandexToken){
                const dbData = await exportDB(db, {prettyJson: true});
                const fileName = generateTextDbFileName()
                await uploadFile(fileName, dbData, yandexToken)
            }
            Toast.show({
                icon: 'success',
                content: `Данные успешно загружены на яндекс диск`,
                position: 'bottom',
            })
        }
        catch (e: Error){
            Toast.show({
                icon: 'fail',
                content: `Ошибка ${e.message} при загрузке данных на яндекс диск`,
                position: 'bottom',
            })
        }
    }

    const jsonToBlob = (json: object) => {
        const str = JSON.stringify(json);
        const bytes = new TextEncoder().encode(str);
        return new Blob([bytes], {
            type: "application/json;charset=utf-8"
        });

    }

     const importTextDb = async (file: File | undefined) => {
        await db.delete()

        const  db2 = new Dexie("soulwriter");
        db2.version(DbAdapter.currentVersion).stores(DbAdapter.currentDbSchema)
        await db2.import(file)
        window.location.replace('/books')

    }

    const importFileDB = async (file: File | undefined) => {
        await fileDb.delete()

        const db2 = new Dexie("soulwriterFiles");
        db2.version(FileDbAdapter.currentVersion).stores(FileDbAdapter.currentDbSchema)
        await db2.import(file)
        window.location.replace('/books')

    }

    const exportDocx = async () =>  {
        const scenes = await db.scenes
            .where("bookId")
            .equals(currentBook?.id)
            .toArray()

        const paragraphs: Paragraph[] = []

        paragraphs.push( new Paragraph({
            text: `${currentBook?.title}`,
            heading: "Heading1"
        }))


        scenes.forEach((scene) => {
            paragraphs.push( new Paragraph({
                text: "",
            }))
            paragraphs.push( new Paragraph({
               text: `${scene.sortOrderId}.${scene.title}`,
               heading: "Heading2"
            }))
            const parts = scene.body.split("<p>")
            parts.forEach((part) => {
                if (part != ''){
                    const cleanText = makeCleanTextFromHtml(part)
                    const p=  new Paragraph({
                        text: cleanText,
                        style: 'simple',

                    })
                    paragraphs.push(p)
                }
           })
        })

        const doc = new Document({
            styles:{
                paragraphStyles:[
                    {
                        id: 'simple',
                        basedOn: 'Normal',
                        run: {
                            size: '14pt'
                        },
                        paragraph:{
                            spacing:{
                                line: 276
                            },
                            indent: {
                                firstLine: "30pt",
                            },
                        }
                    },
                    {
                        id: "Heading1",
                        name: "Heading 1",
                        basedOn: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            size: '20pt',
                            bold: true,
                            color: "999999",
                        },
                    },
                    {
                        id: "Heading2",
                        name: "Heading 2",
                        basedOn: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            size: '16pt',
                            bold: true,
                            color: "999999",
                    },
                    paragraph: {
                        spacing: {
                            before: 240,
                            after: 120
                        },
                    },
                },
                ]
            },
            sections: [
                {
                    properties: {},
                    children: paragraphs
                },
            ],
        });

        Packer.toBlob(doc).then((blob) => {
            const date = moment();
            const dateStr = date.format("YYYY-MM-DD_HH-mm-ss")
            downloadBlob(blob,`${currentBook?.title} ${dateStr}.docx`)
        });
    }

    return {
        exportTextDb,
        exportFileDb,
        importTextDb,
        importFileDB,
        exportDocx,
        uploadToYandexDiscQuery
    }
}
