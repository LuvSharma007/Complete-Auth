import { configureStore } from '@reduxjs/toolkit'
import {persistStore , persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducer from "./authSlice"
import profileReducer from "./profileSlice"
import { combineReducers } from 'redux'

const persistConfig = {
    key:'root',
    storage,
}

const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
})

export const persistor = persistStore(store);


