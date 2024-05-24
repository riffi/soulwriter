import {IBookItemBreadcrumbsProps} from "../model/types.ts";
import {useBookItemBreadcrumbs} from "../model/useBookItemBreadcrumbs.ts";
import {Space, Tag} from "antd-mobile";
import {RightOutline} from "antd-mobile-icons";

export const BookItemBreadcrumbs = (props: IBookItemBreadcrumbsProps) => {

    const {breadcrumbs} = useBookItemBreadcrumbs(props.bookItemId)


    return (
        <>
            <Space direction={"horizontal"} wrap={true} style={{padding: '5px 10px'}}>
                <>
                <Tag
                    key={'top-level'}
                    style={{cursor: 'pointer'}}
                    color={"primary"}
                    onClick={() => {
                        props.onClickTop?.()
                    }}
                >
                    {"Описания"}
                </Tag>
                <RightOutline key={'arrow-world'} style={{color: '#AAAAAA', marginLeft: '5px'}}/>
                </>
                {breadcrumbs?.map((breadcrumb) =>
                    <div key={breadcrumb.id}>

                        <Tag
                            color='primary'
                            fill='solid'
                            style={{cursor: 'pointer'}}
                            onClick={() => {
                                props.onClickItem(breadcrumb)
                            }}
                        >
                            {breadcrumb?.type ? breadcrumb.type + ': ' : ''}{breadcrumb.title}
                        </Tag>
                        <RightOutline key={'arrow' + breadcrumb.id} style={{color: '#AAAAAA', marginLeft: '5px'}}/>
                    </div>
                )}
            </Space>
        </>
    )
}