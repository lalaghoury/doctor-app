import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { doctorThunks } from "./doctorThunks";
import { toast } from "sonner";

// Define a type for the slice state
interface doctorState {
  doctors: Array<any> | [];
  singleDoctor: any;
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: doctorState = {
  doctors: [],
  singleDoctor: {},
  loading: false,
  error: null,
};

export const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(doctorThunks.getAllDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        doctorThunks.getAllDoctors.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.doctors = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        doctorThunks.getAllDoctors.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          toast.error(action.payload);
          state.error = action.payload;
        }
      )
      
  },
});

export const {} = doctorSlice.actions;

export default doctorSlice.reducer;
