import { combineReducers } from 'redux'
import profile from './profile-reducers'
import funders from './funders-reducers'
import game from './game-reducers'
import upload from './upload-reducers'

export default combineReducers({
  profile,
  funders,
  game,
  upload,
})