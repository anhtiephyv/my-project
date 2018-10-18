import { combineReducers } from 'redux';
import categories from './categories';
import auth from './auth';
const appReducer = combineReducers({
    categories,
    auth
});
export default appReducer;