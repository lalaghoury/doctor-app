import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import doctorReducer from "./features/doctor/doctorSlice";
import appointmentsReducer from "./features/appointments/appointmentsSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      doctor: doctorReducer,
      appointments: appointmentsReducer,
      sidebar: sidebarReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];