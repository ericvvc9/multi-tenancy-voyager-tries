import { combineReducers } from "redux"
import auth from "./auth/"
import {saveReducer} from './saveReducer';

const rootReducer = combineReducers({
  auth: auth,
  saveReducer
})

export default rootReducer
