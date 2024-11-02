
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Redux/AuthSlice'; // Correct import for the default export

const Store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default Store;
