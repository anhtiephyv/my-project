import { combineReducers } from 'redux';
import categories from './categories';
const appReducer = combineReducers({
    categories
});
export default appReducer;