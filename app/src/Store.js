import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { reducer as BodyCardsReducer } from './BodyCards'
import { reducer as ExerciseDatabaseReducer } from './ExerciseDatabase'
import { reducer as PlanCreatorReducer } from './PlanCreator'

import sagas from './saga'



const reducer = combineReducers({
  bodyCard: BodyCardsReducer,
  ExerciseDatabase: ExerciseDatabaseReducer,
  PlanCreator: PlanCreatorReducer
});

const win = window;

const sagaMiddleware = createSagaMiddleware()


const middlewares = [thunkMiddleware, sagaMiddleware];


const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
  
);

const enhancedStore = createStore(reducer, {}, storeEnhancers)
sagaMiddleware.run(sagas)//运行所有已经注册的saga

export default enhancedStore

