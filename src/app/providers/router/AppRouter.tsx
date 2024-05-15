import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "../../../widgets/Layout";
import {Characters} from "../../../pages/character/Characters";
import {CharacterNew} from "../../../pages/character/CharacterNew";
import {CharacterCard} from "../../../pages/character/CharacterCard";
import {Settings} from "../../../pages/Settings";
import {Worlds} from "../../../pages/world/Worlds";
import {WorldCard} from "../../../pages/world/WorldCard";
import {Books} from "../../../pages/book/Books/ui/Books.tsx";
import {Scenes} from "../../../pages/scene/Scenes/ui/Scenes.tsx";
import {SceneCard} from "../../../pages/scene/SceneCard";
import {Dictionaries} from "../../../pages/Dictionaries/ui/Dictionaries.tsx";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element = {<Layout />}>
                    <Route index element = {<Navigate to={"/characters"} />} />
                    <Route key={"/characters"} path={"/characters"} element={<Characters/>} />
                    <Route key={"/scenes"} path={"/scenes"} element={<Scenes/>} />
                    <Route key={"/scene/card"} path={"/scene/card"} element={<SceneCard/>} />
                    <Route key={"/worlds"} path={"/worlds"} element={<Worlds/>} />
                    <Route key={"/settings"} path={"/settings"} element={<Settings/>} />
                    <Route key={"/dictionaries"} path={"/dictionaries"} element={<Dictionaries/>} />
                    <Route key={"/character/new"} path={"/character/new"} element={<CharacterNew/>} />
                    <Route key={"/character/card"} path={"/character/card"} element={<CharacterCard/>} />
                    <Route key={"/world/card"} path={"/world/card"} element={<WorldCard/>} />
                    <Route key={"/books"} path={"/books"} element={<Books/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
