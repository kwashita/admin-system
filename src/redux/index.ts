import { applyMiddleware, combineReducers } from "redux";
import global from './modules/global/reducer'
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const reducer = combineReducers({
    global,
});

const persistConfig = {
    key: "redux-state",
    storage: storage
}
const persistReducerConfig = persistReducer(persistConfig, reducer);

const middleWares = applyMiddleware(reduxThunk, reduxPromise);