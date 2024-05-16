import {exportDB} from "dexie-export-import";
import {db, DbAdapter} from "../../../entities/Db/model/Db.ts";
import moment from "moment/moment";
import Dexie from "dexie";
import { Document, Packer, Paragraph, TextRun } from "docx";
import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";

const downloadBlob = (blob: Blob, fileName: string) => {
    const url = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.href = url;

    tempLink.setAttribute('download', fileName);
    tempLink.click();
}

export const useGeneralSettings = () => {

    const currentBook = useSelector((state: RootState) => state.bookContext.currentBook)
    const exportBase = async () => {
        const blob = await exportDB(db, {prettyJson: true});

        const date = moment();
        const dateStr = date.format("YYYY-MM-DD_HH-mm-ss")
        const fileName = `soulwriter-${dateStr}.json`
        downloadBlob(blob, fileName)
    }

    const importBase = async (file: File | undefined) => {
        await db.delete()

        const  db2 = new Dexie("soulwriter");
        db2.version(DbAdapter.currentVersion).stores(DbAdapter.currentDbSchema)
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
                    const  div = document.createElement("div");
                    div.innerHTML = part;
                    const cleanText = div.textContent || div.innerText || "";
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
        exportBase,
        importBase,
        exportDocx
    }
}
