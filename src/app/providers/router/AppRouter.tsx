import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "../../../widgets/Layout";
import {Characters} from "../../../pages/Characters";
import {General} from "../../../pages/General";
import {Scenes} from "../../../pages/Scenes";
import {CharacterNew} from "../../../pages/CharacterNew/ui/CharacterNew.tsx";
import {CharacterCard} from "../../../pages/CharacterCard/ui/CharacterCard.tsx";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element = {<Layout />}>
                    <Route index element = {<Navigate to={"general"} />} />
                    <Route key={"characters"} path={"characters"} element={<Characters/>} />
                    <Route key={"general"} path={"general"} element={<General/>} />
                    <Route key={"scenes"} path={"scenes"} element={<Scenes/>} />
                    <Route key={"character/new"} path={"character/new"} element={<CharacterNew/>} />
                    <Route key={"character/card"} path={"character/card"} element={<CharacterCard/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
