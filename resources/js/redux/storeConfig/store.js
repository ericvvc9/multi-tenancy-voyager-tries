import { createStore, applyMiddleware, compose } from "redux"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import createDebounce from "redux-debounced"
import thunk from "redux-thunk"
import rootReducer from "../reducers/rootReducer"

const middlewares = [thunk, createDebounce()]

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['saveReducer'] // navigation will not be persisted
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  persistedReducer,
  {},
  composeEnhancers(applyMiddleware(...middlewares))
)

let persistor = persistStore(store)
export { store,persistor }
