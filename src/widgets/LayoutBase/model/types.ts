import {PageRoute} from "@shared/route/pages.ts";

export enum CustomMenuItemCode{
    MORE = "MORE",
}
export interface IMainMenuProps{
    route?: PageRoute,
    onSelectCustomMenuItem: (item: CustomMenuItemCode) => void,
}
