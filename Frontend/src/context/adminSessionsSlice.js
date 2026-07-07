import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "../services/adminService";
import { setError, setSuccess } from "./messageSlice";

export const fetchAdminSessions = createAsyncThunk(
  "adminSessions/fetch",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await adminService.getSessions();
      return response.data?.data || response.data || [];
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch session data.";
      dispatch(setError(msg));
      return rejectWithValue(msg);
    }
  }
);

export const killAdminSession = createAsyncThunk(
  "adminSessions/kill",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await adminService.killSession(id);
      dispatch(setSuccess("Session terminated successfully."));
      return id;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to terminate session.";
      dispatch(setError(msg));
      return rejectWithValue(msg);
    }
  }
);

const adminSessionsSlice = createSlice({
  name: "adminSessions",
  initialState: {
    sessions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminSessions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchAdminSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(killAdminSession.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter((s) => s._id !== action.payload);
      });
  },
});

export default adminSessionsSlice.reducer;
