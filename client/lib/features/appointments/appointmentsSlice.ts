import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { appointmentsThunks } from "./appointmentsThunks";
import { toast } from "sonner";

// Define a type for the slice state
interface appointmentsState {
  appointments: Array<any> | [];
  singleAppointment: any;
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: appointmentsState = {
  appointments: [],
  singleAppointment: {},
  loading: false,
  error: null,
};

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(appointmentsThunks.getAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        appointmentsThunks.getAllAppointments.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.appointments = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        appointmentsThunks.getAllAppointments.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          toast.error(action.payload);
          state.error = action.payload;
        }
      )
      .addCase(appointmentsThunks.getRecentAppointmentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        appointmentsThunks.getRecentAppointmentList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.appointments = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        appointmentsThunks.getRecentAppointmentList.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          toast.error(action.payload);
          state.error = action.payload;
        }
      );
  },
});

export const {} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
