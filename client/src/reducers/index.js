//Bring together all the reducers together todo, off, error reducers
import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer
    //auth: authReducer (To combine the reducer together)
});