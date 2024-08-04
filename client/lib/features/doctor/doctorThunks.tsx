import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const doctorThunks = {
  getAllDoctors: createAsyncThunk(
    "doctors/getAllDoctors",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`/doctors/all`);
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
