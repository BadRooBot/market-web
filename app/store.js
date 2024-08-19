import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import dbReducer from '../slices/dbSlice'
import cartReducer from '../slices/cartSlice'
import orderReducer from '../slices/orderSlice'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig={
    key:'root',
    version:1,
    storage,
}

const rootReducer = combineReducers({
  user: userReducer,
  db:dbReducer,
  cart: cartReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    }),
});


 const persistor = persistStore(store);
export default store
export {  persistor };
