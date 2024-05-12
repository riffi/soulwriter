export interface PageRoute{
    route: string,
    title: string,
}
export const pagesRoutes: PageRoute[] = [
    {route: '/', title: 'Основное'},
    {route: '/characters', title: 'Персонажи'},
    {route: '/general', title: 'Персонажи'},
    {route: '/scenes', title: 'Сцены'},
    {route: '/worlds', title: 'Миры'},
    {route: '/settings', title: 'Настройки'},
    {route: '/character/new', title: 'Новый персонаж'},
    {route: '/character/card', title: 'Карточка персонажа'},
    {route: '/world/card', title: 'Мир'},
    {route: '/books', title: 'Книжечки'},
]