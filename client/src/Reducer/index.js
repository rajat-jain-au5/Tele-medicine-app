import authReducer from "./authReducers";
import doctorReducer from './doctorReducer'
import patientReducer from './patientReducer'
import { combineReducers, applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";

const rootReducers = combineReducers({
    auth:  authReducer,
    doctor:doctorReducer,
    patient : patientReducer
})

let store = createStore(rootReducers,applyMiddleware(thunk))
export default store