import { messageSuccess } from "@/components/message";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { redirect } from "next/navigation";

export const appointmentsThunks = {
  getAllAppointments: createAsyncThunk(
    "appointments/getAllAppointments",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`/appointments/all`);
        const { success, appointments } = data;
        if (success) {
          return appointments;
        }
      } catch (error: any) {
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  getRecentAppointmentList: createAsyncThunk(
    "appointments/getRecentAppointmentList",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`/appointments/recent`);
        const { success, appointments } = data;
        if (success) {
          return appointments;
        }
      } catch (error: any) {
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
};
