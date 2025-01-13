import {AlignmentType, Document, IParagraphStyleOptions, Packer, Paragraph} from "docx";
import moment from "moment";
import {downloadBlob} from "@shared/lib/TextUtils.ts";


const paragraphStyles: IParagraphStyleOptions[] = [
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
      alignment: AlignmentType.JUSTIFIED,
      indent: {
        firstLine: "30pt",
      },
    }
  },
  {
    id: 'italic',
    basedOn: 'Normal',
    run: {
      size: '14pt',
      italics: true,
    },
    paragraph:{
      spacing:{
        line: 276
      },
      alignment: AlignmentType.JUSTIFIED,
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
export const downloadDocx = (paragraphList: Paragraph[], bookTitle: string) => {
  const doc = new Document({
    styles:{
      paragraphStyles: paragraphStyles
    },
    sections: [
      {
        properties: {},
        children: paragraphList
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const date = moment();
    const dateStr = date.format("YYYY-MM-DD_HH-mm-ss")
    downloadBlob(blob,`${bookTitle} ${dateStr}.docx`)
  });

}
