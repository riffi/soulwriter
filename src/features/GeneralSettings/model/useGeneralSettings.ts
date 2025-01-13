import {exportDB} from "dexie-export-import";
import {db, DbAdapter} from "@entities/Db/model/Db.ts";
import moment from "moment/moment";
import Dexie from "dexie";
import { Document, Packer, Paragraph } from "docx";
import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {Dialog, Toast} from "antd-mobile";
import {uploadFile} from "@features/GeneralSettings/api/YandexDiscAPI.ts";
import {fileDb, FileDbAdapter} from "@entities/Db/model/fileDb.ts";
import {Chapter, Content, Options} from 'epub-gen-memory';
import epub from 'epub-gen-memory/bundle';
import {IChapter} from "@entities/Scene";
import {downloadDocx} from "@shared/lib/DocxUtils.ts";
import {downloadBlob} from "@shared/lib/TextUtils.ts";
import HTMLtoDOCX from "html-to-docx"
import {makeCleanTextFromHtml} from "@shared/lib/HtmlUtils.ts";


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

        const chapters: IChapter[] = await db.chapters
            .where({bookId: currentBook?.id})
            .sortBy("sortOrderId")

        const scenes = await db.scenes
            .where("bookId")
            .equals(currentBook?.id)
            .sortBy("sortOrderId")

        const paragraphs: Paragraph[] = []

        paragraphs.push( new Paragraph({
            text: `${currentBook?.title}`,
            heading: "Heading1"
        }))


        chapters.forEach((chapter) => {
            const chapterScenes = scenes.filter((scene) => {
                return scene.chapterId === chapter.id
            })

            paragraphs.push(new Paragraph({
                text: `${chapter.sortOrderId}.${chapter.title}`,
                heading: "Heading2"
            }))

            chapterScenes.forEach((scene, index) => {
                // Добавляем три звездочки между сценами
                if (index > 0) {
                    paragraphs.push(new Paragraph({
                        text: "***",
                        style: 'simple',
                    }))
                }

                const parts = scene.body.split("<p>")
                parts.forEach((part) => {
                    if (part.trim() != '') {
                        const cleanText = makeCleanTextFromHtml(part)
                        if (part.indexOf("<em>") !== -1) {
                            const p = new Paragraph({
                                text: cleanText,
                                style: 'italic',
                            })
                            paragraphs.push(p)

                        }
                        else{
                            const p = new Paragraph({
                                text: cleanText,
                                style: 'simple',
                            })
                            paragraphs.push(p)

                        }
                    }
                })
            })
        })

       downloadDocx(paragraphs, currentBook?.title)
    }

    const exportEpub = async () => {

        const chapters: IChapter[] = await db.chapters
            .where({bookId: currentBook?.id})
            .sortBy("sortOrderId")


        const scenes = await db.scenes
            .where("bookId")
            .equals(currentBook?.id)
            .sortBy("sortOrderId")

        const options: Options = {
            title: currentBook?.title,
            tocTitle: 'Содержание',
            author: currentBook?.author, // *Required, name of the author.
            publisher: "Soulwriter", // optional
            description: currentBook?.description, // optional
        };

        const content: Chapter[] = []

        chapters.forEach((chapter) => {
            const chapterScenes = scenes.filter((scene) => {
                return scene.chapterId === chapter.id
            })
            let text = ""
            chapterScenes.forEach((scene, index) => {
                if (index > 0){
                    text += `***<br>${scene.body}`
                }
                else{
                    text += `${scene.body}`
                }

            })
            content.push({
                title: chapter.title,
                content: text
            })
        })


        epub(options, content).then(
            content => {
                const date = moment();
                const dateStr = date.format("YYYY-MM-DD_HH-mm-ss")
                downloadBlob(content,`${currentBook?.title} ${dateStr}.epub`)
            },
            err => console.error("Failed to generate Ebook because of ", err)
        );

    }

    return {
        exportTextDb,
        exportFileDb,
        importTextDb,
        importFileDB,
        exportDocx,
        exportEpub,
        uploadToYandexDiscQuery
    }
}
