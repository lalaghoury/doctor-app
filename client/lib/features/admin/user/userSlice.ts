import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { userThunks } from "./userThunks";
import { toast } from "sonner";

interface userState {
  users: Array<any>;
  loading: boolean;
  error: string | null;
}

const initialState: userState = {
  users: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userThunks.getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        userThunks.getAllUsers.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.users = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        userThunks.getAllUsers.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        }
      )
      .addCase(userThunks.updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        userThunks.updateUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          const index = state.users.findIndex(
            (user) => user._id === action.payload._id
          );
          if (index !== -1) {
            state.users[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(
        userThunks.updateUser.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        }
      )
      .addCase(userThunks.deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        userThunks.deleteUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.users = state.users.filter(
            (user) => user._id !== action.payload
          );
          state.loading = false;
        }
      )
      .addCase(
        userThunks.deleteUser.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        }
      );
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
