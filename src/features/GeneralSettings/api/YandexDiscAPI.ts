
const baseDiskApiPath = 'https://cloud-api.yandex.net/v1/disk/'
const oAuthBasePath = 'https://oauth.yandex.ru/'


interface YandexUploadInfo{
    href: string,
    method: string,
    templated?: boolean,
    operation_id?: string
}

const makeURL = (params: URLSearchParams, relativePath: string, basePath?: string) => {
    return new URL(`${relativePath}?${params.toString()}`, basePath)
}

const getHeaders = (yandexToken: string) => {
    return {
        Authorization: 'OAuth ' + yandexToken
    }
}

const uploadFile = async (fileName: string, file: Blob, yandexToken: string) => {
    const url = makeURL(new URLSearchParams({
        path: `/soulwriter/${fileName}`,
        overwrite: "true"
    }), 'resources/upload', baseDiskApiPath)

    const getUrlResult = await fetch(url,   {
        headers: getHeaders(yandexToken)
    })

    const getUrlData: YandexUploadInfo = await getUrlResult.json()

    await fetch(getUrlData.href, {
        method: getUrlData.method,
        body: file
    })
}

const getAuthPageUrl = () => {
    return makeURL(new URLSearchParams({
        response_type: 'token',
        client_id: "8532554d78da42c2ac5a5d7d9498185f"
    }), 'authorize', oAuthBasePath)
}

export {
    uploadFile,
    getAuthPageUrl
}
