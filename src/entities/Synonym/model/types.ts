export interface ISynonymDictItem{
    id: number
    name: string
    definition: string,
    synonyms: string[],
    similars: string[],
    antonyms: string[]
}

export interface ISynonymDictJson{
    title: string,
    author: string
    "published_at": number,
    wordlist: ISynonymDictItem[]
}

