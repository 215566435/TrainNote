import React from 'react'
import { ExerciseHOC } from '../../PlanDashboard/views/planContent'




export const PlanPreview = () => {
    let ClickableCard = ExerciseHOC({
        width:100,
        bordered:true,
        title:'今天的神奇计划'
    })
    return (
        <div className='PlanPreview'>
            <ClickableCard
            />
        </div>
    )
}