import {combineReducers} from 'redux';
import bookReducers from './book';
import authReducers from './auth';
// import profile from './books';

const reducers = combineReducers({
    book: bookReducers,
    auth: authReducers
})

export default reducers