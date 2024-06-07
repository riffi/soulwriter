import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Characters} from "@pages/character/Characters";
import {CharacterNew} from "@pages/character/CharacterNew";
import {CharacterCard} from "@pages/character/CharacterCard";
import {Settings} from "@pages/Settings";
import {Books} from "@pages/book/Books";
import {Scenes} from "@pages/scene/Scenes/ui/Scenes.tsx";
import {SceneCard} from "@pages/scene/SceneCard";
import {Dictionaries} from "@pages/Dictionaries/ui/Dictionaries.tsx";
import {LayoutBase} from "@widgets/LayoutBase";
import {BookItemCard} from "@pages/bookItem/BookItemCard";
import {BookItems} from "@pages/bookItem/BookItems";
import {BookCard} from "@pages/book/BookCard/ui/BookCard.tsx";
import {ConsumeYandexToken} from "@pages/yandex/ConsumeYandexToken";
import {StoryLines} from "@pages/StoryLines";
import {StoryLineCard} from "@pages/StoryLineCard/ui/StoryLineCard.tsx";
import {MeasureKindCard} from "@pages/measure/MeasureKindCard";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element = {<LayoutBase />}>
                    <Route index element = {<Navigate to={"/characters"} />} />
                    <Route key={"/characters"} path={"/characters"} element={<Characters/>} />
                    <Route key={"/scenes"} path={"/scenes"} element={<Scenes/>} />
                    <Route key={"/book-items"} path={"/book-items"} element={<BookItems/>} />
                    <Route key={"/settings"} path={"/settings"} element={<Settings/>} />
                    <Route key={"/dictionaries"} path={"/dictionaries"} element={<Dictionaries/>} />
                    <Route key={"/character/new"} path={"/character/new"} element={<CharacterNew/>} />
                    <Route key={"/character/card"} path={"/character/card"} element={<CharacterCard/>} />
                    <Route key={"/book-item/card"} path={"/book-item/card"} element={<BookItemCard/>} />
                    <Route key={"/books"} path={"/books"} element={<Books/>} />
                    <Route key={"/book/card"} path={"/book/card"} element={<BookCard/>} />
                    <Route key={"/consume-yandex-token"} path={"/consume-yandex-token"} element={<ConsumeYandexToken/>} />
                    <Route key={"/storylines"} path={"/storylines"} element={<StoryLines/>} />
                    <Route key={"/storyline/card"} path={"/storyline/card"} element={<StoryLineCard/>} />
                    <Route key={"/measure-kind/card"} path={"/measure-kind/card"} element={<MeasureKindCard/>} />
                </Route>
                <Route key={"/scene/card"} path={"/scene/card"} element={<SceneCard/>} />
            </Routes>
        </BrowserRouter>
    )
}
