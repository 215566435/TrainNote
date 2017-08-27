import React from 'react'
import { Card } from 'antd'

const style = {
    width: 150,
    borderRadius: 5
}


export const BodyCarditem = ({ src, title }) => {
    return (
        <Card style={style}>
            <div className='BodyCarditem'>
                <img src={src} />
                <div className='content'>
                    <p>{title}</p>
                    <h2>173</h2>
                </div>
            </div>
        </Card>
    )
}


