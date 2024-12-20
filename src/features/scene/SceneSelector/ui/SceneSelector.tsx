import {ISceneSelectorProps} from "@features/scene/SceneSelector/model/types.ts";
import {List} from "antd-mobile";
import {useSceneSelector} from "@features/scene/SceneSelector/model/useSceneSelector.ts";

export const SceneSelector = (props: ISceneSelectorProps) => {
  const {scenes} = useSceneSelector(props.bookId);
  return (
        <>
          <List header={"Выберите сцену"}>
            {scenes?.map((scene) => (
                <List.Item
                    key={scene.id}
                    clickable
                    onClick={() => props.onSelect(scene)}
                >
                  {scene.sortOrderId}. {scene.title}
                </List.Item>
            ))}
          </List>
        </>
    )
}
