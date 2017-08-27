import React from 'react'
import { Card } from 'antd'

import { Exercise } from './planContent'
import { view as ResponseCalender } from '../../Calender'

import "./planDashboard.less"


const PlanDashBoard = ({ scrollTarget }) => {
    function onSelect(date) {
        console.log(date);
    }
    return (
        <div>
            <div className='PlanDashBoard' style={{ marginTop: '8px', padding: 24, background: '#fff' }}>
                    <ResponseCalender />
                <div>
                    <div className='PlanContent'>
                        <Exercise />
                        <Exercise />
                        <Exercise />
                        <Exercise />
                        <Exercise />
                        <Exercise />
                        <Exercise />
                        <Exercise />
                    </div>
                </div>
            </div>
        </div>
    )

}


export default PlanDashBoard