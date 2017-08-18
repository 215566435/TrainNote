import React from 'react'
import ContentItem from './contentItem'
import { connect } from 'react-redux'
import { getCourseAsync } from '../action'
import { uploadAsync } from '../action'

import './style.css';
class Content extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <div className='course-wrap'>
                <ContentItem
                    upload={this.props.uploads} />
            </div>
        )
    }
}

const mapState = (state) => {
    console.log(state.courseList.model)
    return {
    }
}


const mapDispatch = (dispatch) => {
    return {
        getCourseModel: () => { dispatch(getCourseAsync()) },
        uploads: (data) => { dispatch(uploadAsync(data)) }
    }
}



export default connect(mapState, mapDispatch)(Content);
