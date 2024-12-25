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
    {route: '/book-items', title: 'База знаний'},
    {route: '/settings', title: 'Настройки'},
    {route: '/dictionaries', title: 'Справочники'},
    {route: '/character/new', title: 'Новый персонаж'},
    {route: '/character/card', title: 'Карточка персонажа'},
    {route: '/books', title: 'Книги'},
    {route: '/book-item/card', title: 'Описание'},
    {route: '/book/card', title: 'Книга'},
    {route: '/storylines', title: 'Сюжет'},
    {route: '/storyline/card', title: 'Сюжетная линия'},
    {route: '/measure-kind/card', title: 'Единицы измерения'},
    {route: '/notes', title: 'Заметки'},
    {route: '/character-groups', title: 'Группы персонажей'},
    {route: '/character-attributes', title: 'Атрибуты персонажей'},
    {route: '/measures', title: 'Единицы измерения'},
    {route: '/scene-states', title: 'Статусы сцен'},
    {route: '/check-list', title: 'Чек лист'}
]
