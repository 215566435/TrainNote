import React from 'react'
import { Card, Icon, Button } from 'antd'

export const Exercise = ({ width, title, content, url, onDelete, loading = false, close = false }) => {
    let fixedWidth = width || 240
    let fixedTitle = title || '标题'
    let fixedContent = content || ''
    return (
        <div className='Exercise-card'>
            <Card loading={loading} bordered={false} style={{ width: fixedWidth }} bodyStyle={{ padding: 0 }}>
                <div className="custom-image">
                    <img alt="example"
                        width="100%"
                        src={url}
                    />
                </div>
                <div className="cardContent">
                    <div className="custom-card" >
                        <h3 >{fixedTitle}</h3>
                        <p>{fixedContent}</p>
                    </div>
                    {close ? <Button shape="circle" icon='close' onClick={onDelete} ></Button> : ''}
                </div>
            </Card>
        </div>
    )
}
