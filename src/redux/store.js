import { configureStore } from '@reduxjs/toolkit'
import AllReducers from './reducers'

const store = configureStore({
  reducer: AllReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

})

export default store