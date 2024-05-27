import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setYandexAccessToken} from "@features/yandex/YandexContext/yandexContextSlice.ts";

export const ConsumeYandexToken = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const token = window.location.hash.split('&')[0].replace('#access_token=', '')
        dispatch(setYandexAccessToken(token))
    }, [])

    return (
        <>
            <h1>Авторизация прошла успешно</h1>
        </>
    )
}
