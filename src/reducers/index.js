import { combineReducers } from 'redux';
import AuthReducer from '../modules/user/auth/store/AuthReducer';

export default combineReducers({
    security: AuthReducer,
})