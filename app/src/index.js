import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import TrainNoteApp from './TrainNoteApp'
import store from './Store.js'
import {
    BrowserRouter as Router
} from 'react-router-dom'



ReactDOM.render(
    <Router>
        <Provider store={store}>
            <TrainNoteApp />
        </Provider>
    </Router>,
    document.getElementById('root')
);