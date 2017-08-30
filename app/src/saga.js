import { fork, take } from 'redux-saga/effects'

import { actions as ExerciseDatabase } from './ExerciseDatabase'
import { actions as PlanCreator } from './PlanCreator'

export default function* rootSaga() {
    yield [
        fork(ExerciseDatabase.watchSagaDatabase),
        fork(PlanCreator.watchSagaPlanCreator)
    ]
}