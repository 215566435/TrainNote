import { fork, take } from 'redux-saga/effects'

import { actions } from './ExerciseDatabase'

export default function* rootSaga() {
    yield [
        fork(actions.watchSagaDatabase)
    ]
}