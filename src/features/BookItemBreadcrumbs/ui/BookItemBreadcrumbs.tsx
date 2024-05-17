import {IBookItemBreadcrumbsProps} from "../model/types.ts";
import {useBookItemBreadcrumbs} from "../model/useBookItemBreadcrumbs.ts";
import {Space, Tag} from "antd-mobile";
import {RightOutline} from "antd-mobile-icons";
import {useNavigate} from "react-router-dom";

export const BookItemBreadcrumbs = (props: IBookItemBreadcrumbsProps) => {

    const {breadcrumbs} = useBookItemBreadcrumbs(props.bookItem)

    const navigate = useNavigate()

    return (
        <>
            <Space direction={"horizontal"} wrap={true} style={{padding: '5px 10px'}}>
                <Tag
                    key={'world'}
                    style={{cursor: 'pointer'}}
                    color={"primary"}
                    onClick={() => navigate(`/world/card?id=${props.world?.id}`)}
                >
                    {props.world?.title}
                </Tag>
                {breadcrumbs?.map((breadcrumb) =>
                    <div key={breadcrumb.id}>
                        <RightOutline key={'arrow' + breadcrumb.id} style={{color: '#AAAAAA', marginRight: '5px'}}/>
                        <Tag
                            color='primary'
                            fill='solid'
                            style={{cursor: 'pointer'}}
                            onClick={() => navigate(`/book-item/card?id=${breadcrumb.id}`)}
                        >
                            {breadcrumb?.type ? breadcrumb.type + ': ' : ''}{breadcrumb.title}
                        </Tag>
                    </div>
                )}
                <RightOutline key={'arrowLast'} style={{color: '#AAAAAA', marginRight: '5px'}}/>
            </Space>
        </>
    )
}