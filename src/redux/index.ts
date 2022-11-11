import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
  Store,
} from "redux";
import global from "./modules/global/reducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";

const reducer = combineReducers({
  global,
});

const persistConfig = {
  key: "redux-state",
  storage: storage,
};
const persistReducerConfig = persistReducer(persistConfig, reducer);

const middleWares = applyMiddleware(reduxThunk, reduxPromise);

const store: Store = createStore(persistReducerConfig, middleWares);

const persistor = persistStore(store);

export { store, persistor };
