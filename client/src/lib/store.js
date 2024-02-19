import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./features/userReducer";

const rootReducer = combineReducers({
    //add all your reducers here
    user: userReducer
},);

const presistConfig = {
    key: "root",
    storage,
    version: 1,
}
const persistedReducer = persistReducer(presistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store)

