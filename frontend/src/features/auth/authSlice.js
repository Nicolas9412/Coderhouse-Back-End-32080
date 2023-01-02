import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: false,
  user: {},
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    catchError: (state, action) => {
      return {
        ...state,
        error: action.payload.error,
      };
    },
    loadAutentication: (state, action) => {
      return {
        ...state,
        auth: action.payload.auth,
        user: {
          _id: action.payload._id,
          email: action.payload.email,
          fullname: action.payload.fullname,
          phoneNumber: action.payload.phoneNumber,
          isAdmin: action.payload.isAdmin,
        },
      };
    },
    removeSession: (state, action) => {
      return {
        ...initialState,
      };
    },
  },
});

export const { loadAutentication, removeSession, catchError } =
  authSlice.actions;

export const autentication = () => {
  return async (dispatch) => {
    fetch("http://localhost:8080/api/auth/user", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data?.error) throw result.data.error;
        dispatch(loadAutentication({ ...result, auth: true }));
      })
      .catch((error) => dispatch(catchError({ error })));
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      dispatch(removeSession());
    } catch (error) {
      throw error;
    }
  };
};

export default authSlice.reducer;
