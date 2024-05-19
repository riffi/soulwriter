import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Characters} from "../../../pages/character/Characters";
import {CharacterNew} from "../../../pages/character/CharacterNew";
import {CharacterCard} from "../../../pages/character/CharacterCard";
import {Settings} from "../../../pages/Settings";
import {Worlds} from "../../../pages/world/Worlds";
import {Books} from "../../../pages/book/Books/ui/Books.tsx";
import {Scenes} from "../../../pages/scene/Scenes/ui/Scenes.tsx";
import {SceneCard} from "../../../pages/scene/SceneCard";
import {Dictionaries} from "../../../pages/Dictionaries/ui/Dictionaries.tsx";
import {LayoutBase} from "../../../widgets/LayoutBase";
import {BookItemCard} from "../../../pages/bookItem/BookItemCard";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element = {<LayoutBase />}>
                    <Route index element = {<Navigate to={"/characters"} />} />
                    <Route key={"/characters"} path={"/characters"} element={<Characters/>} />
                    <Route key={"/scenes"} path={"/scenes"} element={<Scenes/>} />
                    <Route key={"/worlds"} path={"/worlds"} element={<Worlds/>} />
                    <Route key={"/settings"} path={"/settings"} element={<Settings/>} />
                    <Route key={"/dictionaries"} path={"/dictionaries"} element={<Dictionaries/>} />
                    <Route key={"/character/new"} path={"/character/new"} element={<CharacterNew/>} />
                    <Route key={"/character/card"} path={"/character/card"} element={<CharacterCard/>} />
                    <Route key={"/book-item/card"} path={"/book-item/card"} element={<BookItemCard/>} />
                    <Route key={"/books"} path={"/books"} element={<Books/>} />
                </Route>
                <Route key={"/scene/card"} path={"/scene/card"} element={<SceneCard/>} />
            </Routes>
        </BrowserRouter>
    )
}
