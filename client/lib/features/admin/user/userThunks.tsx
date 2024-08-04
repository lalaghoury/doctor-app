import { messageSuccess } from "@/components/message";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { signin as signinAction } from "@/lib/features/auth/authSlice";

export const userThunks = {
  getAllUsers: createAsyncThunk(
    "user/getAllUsers",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/admin/all`
        );
        if (data.success) {
          return data.users;
        }
      } catch (error: any) {
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  updateUser: createAsyncThunk(
    "user/updateUser",
    async (
      { values, url }: { values: any; url: string },
      { dispatch, rejectWithValue }
    ) => {
      try {
        const { data } = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}${url}`,
          values
        );
        if (data.success) {
          dispatch(signinAction({ user: data.user }));
          messageSuccess(data.message);
          return data.user;
        }
      } catch (error: any) {
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  deleteUser: createAsyncThunk(
    "user/deleteUser",
    async ({ url }: any, { rejectWithValue }) => {
      try {
        const { data } = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}${url}`
        );
        if (data.success) {
          messageSuccess(data.message);
          return data.user._id;
        }
      } catch (error: any) {
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
};
