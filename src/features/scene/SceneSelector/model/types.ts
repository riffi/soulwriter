import {IScene} from "@entities/Scene";

export interface ISceneSelectorProps{
  bookId: number;
  onSelect: (scene: IScene) => void;
}
