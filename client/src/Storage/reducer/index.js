import {combineReducers} from 'redux'
import taskReducers from './TaskReducer.js'



export default combineReducers({
    task: taskReducer
})