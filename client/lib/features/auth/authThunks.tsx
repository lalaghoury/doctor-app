import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { signin as signinAction, signout as signoutAction } from "./authSlice";
import Cookies from "js-cookie";
import { DoctorSignup } from "@/models/User";
import { toast } from "sonner";

export const authThunks = {
  signup: createAsyncThunk(
    "auth/signup",
    async (
      {
        values,
        router,
      }: {
        values: {
          name: string;
          email: string;
          password: string;
          phone: string;
          role: string;
        };
        router: any;
      },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.post(`/auth/sign-up`, values);
        const { message, success } = data;
        if (success) {
          toast.success(message);
          router.push("/auth/sign-in");
        }
      } catch (error: any) {
        return rejectWithValue(error.response.data.message);
      }
    }
  ),

  doctorSignup: createAsyncThunk(
    "auth/doctorSignup",
    async (
      {
        values,
        router,
      }: {
        values: DoctorSignup;
        router: any;
      },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.post(`/auth/sign-up/doctor`, values);
        const { message, success } = data;
        if (success) {
          toast.success(message);
          router.push("/auth/sign-in");
        }
      } catch (error: any) {
        return rejectWithValue(error.response.data.message);
      }
    }
  ),

  signin: createAsyncThunk(
    "auth/signin",
    async (
      {
        values,
        router,
      }: {
        values: { email: string; password: string };
        router: any;
      },
      { rejectWithValue, dispatch }
    ) => {
      try {
        const { data } = await axios.post(`/auth/sign-in`, values);

        if (data.success) {
          dispatch(signinAction({ user: data.user }));
          Cookies.get("token") && Cookies.remove("token");
          Cookies.set("token", data.token, { expires: 7, path: "/" });
          Cookies.get("auth") && Cookies.remove("auth");
          Cookies.set("auth", JSON.stringify(data.user), {
            expires: 7,
            path: "/",
          });
          toast.success(data.message);
          router.push(`/`);
          return data.user;
        }
      } catch (error: any) {
        return rejectWithValue(error.response.data.message);
      }
    }
  ),

  signout: createAsyncThunk(
    "auth/signout",
    async (router: any, { rejectWithValue, dispatch }) => {
      try {
        const { data } = await axios.post(`/auth/sign-out`);
        if (data.success) {
          toast.success(data.message);
          Cookies.get("auth") && Cookies.remove("auth");
          Cookies.get("token") && Cookies.remove("token");
          dispatch(signoutAction());
          router.push("/auth/sign-in");
          return true;
        }
      } catch (error: any) {
        return rejectWithValue(error.response.data.message);
      }
    }
  ),

  forgotPassword: createAsyncThunk(
    "auth/forgotPassword",
    async (
      {
        values,
      }: {
        values: { email: string };
      },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.post(`/auth/forgot-password`, values);

        if (data.success) {
          toast.success(data.message);
          return true;
        }
      } catch (error: any) {
        return rejectWithValue(error.response.data.message);
      }
    }
  ),

  resetPassword: createAsyncThunk(
    "auth/resetPassword",
    async (
      {
        values,
        resetToken,
        router,
      }: {
        values: { password: string };
        resetToken: string;
        router: any;
      },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await axios.post(
          `/auth/reset-password/${resetToken}`,
          values
        );

        if (data.success) {
          toast.success(data.message);
          router.push(`/auth/sign-in`);
          return true;
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
        const { data } = await axios.put(`${url}`, values);
        if (data.success) {
          dispatch(signinAction({ user: data.user }));
          toast.success(data.message);
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
        const { data } = await axios.delete(`${url}`);
        if (data.success) {
          toast.success(data.message);
          return data.user._id;
        }
      } catch (error: any) {
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
};
