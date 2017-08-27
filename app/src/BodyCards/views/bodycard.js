import React from 'react'
import { connect } from 'react-redux'
import { BodyCarditem } from './bodycardItem'

import heightUrl from '../../../image/height.svg'
import weightUrl from '../../../image/weight.svg'
import fatUrl from '../../../image/fat.svg'
import ageUrl from '../../../image/hearts.svg'

import './bodycard.less'

const BodyCard = () => {
    return (
        <div className='BodyCardWrap'>
            <div className='BodyCard'>
                <BodyCarditem src={heightUrl} title='身高' />
                <BodyCarditem src={weightUrl} title='体重' />
                <BodyCarditem src={fatUrl} title='体脂' />
                <BodyCarditem src={ageUrl} title='年龄' />
            </div>
        </div>
    )
}


export default connect()(BodyCard);


