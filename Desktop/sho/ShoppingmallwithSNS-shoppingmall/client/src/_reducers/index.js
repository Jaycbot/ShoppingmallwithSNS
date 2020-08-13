import { combineReducers } from 'redux';
import user from './user_reducer';
import sns from './sns_reducer';

const rootReducer = combineReducers({
	user,
	sns,
});

export default rootReducer;
