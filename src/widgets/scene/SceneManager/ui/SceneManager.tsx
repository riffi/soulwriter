import {SceneManagerProps} from "../model/types.ts";
import {useSceneManager} from "../model/useSceneManager.ts";
import {AutoCenter, Button, Card, Image, List, Space} from "antd-mobile";
import {NavLink, useNavigate} from "react-router-dom";
import {AddCircleOutline} from "antd-mobile-icons";

export const SceneManager = (props: SceneManagerProps) => {
    const navigate = useNavigate()

    const {sceneList,
        onCreateNewScene
    } = useSceneManager(props.bookId)

    return (
        <Card>
            <List style={{"--padding-left": "0px"}}>
                {sceneList?.map(scene =>(
                    <List.Item
                        key={scene.id}
                        description={scene.description}
                        prefix={scene.sortOrderId}
                        clickable
                        onClick = {() => navigate(`/scene/card?id=${scene.id}`)}
                    >

                        {scene.title}
                    </List.Item>
                ))}
                <List.Item title={""}>
                    <AutoCenter>
                        <Button size='large' fill={'none'}  onClick={() => {
                            onCreateNewScene()
                        }}>
                            <AddCircleOutline />

                        </Button>
                    </AutoCenter>
                </List.Item>
            </List>
        </Card>
    )
}
