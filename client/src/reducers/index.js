//Bring together all the reducers together todo, off, error reducers
import {combineReducers} from 'redux';
import itemReducer from './itemReducer';

export default combineReducers({
    item: itemReducer
    //auth: authReducer (To combine the reducer together)
});