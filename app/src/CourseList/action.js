export const uploadAsync = (data) => {
    return (dispatch, getState) => {
        let Url = 'https://zh.9uhxir.top/django/zongheng/trainer/';
        let myHeaders = new Headers({
            'Access-Control-Allow-Origin': '*'
        });

        fetch(Url, {
            method: 'POST',
            mode: 'cors',
            headers: myHeaders,
            body:JSON.stringify(data)
        }).then((res) => {
            res.json().then((resJson) => {
                location.href="https://zh.9uhxir.top/uploads/"
                dispatch({ type: 'POST_COURSE' })
            }).catch((error) => {
                console.log('err:' + error)
            })
        })
    }
}




export const getCourseAsync = () => {
    return (dispatch, getState) => {
        let Url = 'https://zh.9uhxir.top/django/zongheng/courseModel/';
        let myHeaders = new Headers({
            'Access-Control-Allow-Origin': '*'
        });

        fetch(Url, {
            method: 'GET',
            mode: 'cors',
            headers: myHeaders
        }).then((res) => {
            res.json().then((resJson) => {
                dispatch({ type: 'GET_COURSE', courseList: resJson })
            }).catch((error) => {
                console.log('err:' + error)
            })
        })

        Url = 'https://zh.9uhxir.top/django/zongheng/trainer/?name=all_trainer';
        fetch(Url, {
            method: 'GET',
            mode: 'cors',
            headers: myHeaders
        }).then((res) => {
            res.json().then((resJson) => {
                console.log(resJson)
                dispatch({ type: 'GET_TRAINER', trainer: resJson })
            }).catch((error) => {
                console.log('err:' + error)
            })
        })
    }
}