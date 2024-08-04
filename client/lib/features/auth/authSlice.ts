import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authThunks } from "./authThunks";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/lib/hooks";
import { toast } from "sonner";

// Define a type for the slice state
interface authState {
  user:
    | {
        name: string;
        avatar: string;
        email: string;
        phone: string;
        role: string;
        _id: string;
      }
    | {};
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

// Define the initial state using that type
const initialState: authState = {
  user: {
    name: "",
    avatar: "",
    email: "",
    phone: "",
    role: "",
    _id: "",
  },
  loading: false,
  error: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<any>) => {
      const { user: data } = action.payload;
      const user = {
        name: data.name,
        avatar: data.avatar,
        email: data.email,
        phone: data.phone,
        role: data.role,
        _id: data._id,
      };
      Object.assign(state, {
        user,
        isLoggedIn: true,
      });
    },
    signout: (state) => {
      Object.assign(state, initialState);
    },
    initializeAuthState: (state) => {
      const auth = Cookies.get("auth");
      if (auth) {
        const user = JSON.parse(auth);

        Object.assign(state, {
          user,
          isLoggedIn: true,
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authThunks.signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.signup.fulfilled, (state) => {
        Object.assign(state, initialState);
        state.loading = false;
      })
      .addCase(
        authThunks.signup.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          toast.error(action.payload);
          state.error = action.payload;
        }
      )

      .addCase(authThunks.doctorSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.doctorSignup.fulfilled, (state) => {
        Object.assign(state, initialState);
        state.loading = false;
      })
      .addCase(
        authThunks.doctorSignup.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          toast.error(action.payload);
          state.error = action.payload;
        }
      )

      .addCase(authThunks.signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        authThunks.signin.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        authThunks.signin.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          toast.error(action.payload);
          state.error = action.payload;
        }
      )

      .addCase(authThunks.signout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.signout.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        authThunks.signout.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        }
      )

      .addCase(authThunks.forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        authThunks.forgotPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        }
      )

      .addCase(authThunks.resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.resetPassword.fulfilled, (state) => {
        Object.assign(state, initialState);
        state.loading = false;
      })
      .addCase(
        authThunks.resetPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        }
      )

      .addCase(authThunks.updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        authThunks.updateUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        authThunks.updateUser.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          toast.error(action.payload);
          state.error = action.payload;
        }
      )

      .addCase(authThunks.deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.deleteUser.fulfilled, (state) => {
        state.loading = false;
        authSlice.actions.signout();
      })
      .addCase(
        authThunks.deleteUser.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          toast.error(action.payload);
          state.error = action.payload;
        }
      );
  },
});

export const { signin, signout, initializeAuthState } = authSlice.actions;

export const useAuthActions = () => {
  const dispatch = useAppDispatch();

  const logOut = () => {
    dispatch(authThunks.signout());
  };

  return { logOut };
};

export default authSlice.reducer;
