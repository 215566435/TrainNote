import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as courseListReducer } from './CourseList';
import { reducer as BodyCardsReducer } from './BodyCards';
import { reducer as ExerciseDatabaseReducer } from './ExerciseDatabase'
import thunkMiddleware from 'redux-thunk';




const reducer = combineReducers({
  courseList: courseListReducer,
  bodyCard: BodyCardsReducer,
  ExerciseDatabase:ExerciseDatabaseReducer
});

const win = window;

const middlewares = [thunkMiddleware];

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default createStore(reducer, {}, storeEnhancers);

