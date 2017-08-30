import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import { reducer as courseListReducer } from './CourseList'
import { reducer as BodyCardsReducer } from './BodyCards'
import { reducer as ExerciseDatabaseReducer } from './ExerciseDatabase'
import { reducer as PlanCreatorReducer } from './PlanCreator'

import sagas from './saga'



const reducer = combineReducers({
  courseList: courseListReducer,
  bodyCard: BodyCardsReducer,
  ExerciseDatabase: ExerciseDatabaseReducer,
  PlanCreator: PlanCreatorReducer
});

const win = window;

const sagaMiddleware = createSagaMiddleware()


const middlewares = [thunkMiddleware, sagaMiddleware];


const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

const enhancedStore = createStore(reducer, {}, storeEnhancers)
sagaMiddleware.run(sagas)//运行所有已经注册的saga

export default enhancedStore

