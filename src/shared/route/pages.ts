export interface PageRoute{
    route: string,
    title: string,
}
export const pagesRoutes: PageRoute[] = [
    {route: '/', title: 'Основное'},
    {route: '/characters', title: 'Персонажи'},
    {route: '/general', title: 'Персонажи'},
    {route: '/scenes', title: 'Сцены'},
    {route: '/scene/card', title: 'Карточка сцены'},
    {route: '/worlds', title: 'Миры'},
    {route: '/settings', title: 'Настройки'},
    {route: '/dictionaries', title: 'Справочники'},
    {route: '/character/new', title: 'Новый персонаж'},
    {route: '/character/card', title: 'Карточка персонажа'},
    {route: '/world/card', title: 'Мир'},
    {route: '/books', title: 'Книжечки'},
    {route: '/book-item/card', title: 'Описание'},
]
