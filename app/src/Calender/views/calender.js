import React from 'react'
import { connect } from 'react-redux'
import { Calendar, Affix, Icon } from 'antd'

import './calendar.less'

class ResponseCalender extends React.Component {
    constructor(props){
        super(...props)
        this.state ={
            collapsed:false,
            color:'#08c'
        }
        this.Trigger = this.Trigger.bind(this)
    }

    Trigger(){
        this.setState({
            collapsed:!this.state.collapsed,
            color:(this.state.collapsed?'#08c':'')
        })
    }

    render() {
        return (
            <div className='CalendarPanel' >
                <Affix>
                    <Icon type="calendar" 
                    className="calendarTrigger" 
                    style={{ fontSize: 22, color: this.state.color }} 
                    onClick={this.Trigger}
                    />
                    <div  className={this.state.collapsed?'ResponseCalender closed':'ResponseCalender'}>
                        <Calendar fullscreen={false} onSelect={this.onSelect} />
                    </div>
                </Affix>
            </div>
        )
    }
}


export default connect()(ResponseCalender)