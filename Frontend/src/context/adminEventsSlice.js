import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setError, setSuccess } from "./messageSlice";

export const fetchAdminEvents = createAsyncThunk(
  "adminEvents/fetch",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/events", {
        withCredentials: true,
      });
      return response.data?.data || [];
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch events.";
      dispatch(setError(msg));
      return rejectWithValue(msg);
    }
  }
);

export const createAdminEvent = createAsyncThunk(
  "adminEvents/create",
  async (submitData, { dispatch, rejectWithValue }) => {
    try {
      await axios.post("/api/v1/events", submitData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(setSuccess("Event created successfully."));
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create event.";
      dispatch(setError(msg));
      return rejectWithValue(msg);
    }
  }
);

export const updateAdminEvent = createAsyncThunk(
  "adminEvents/update",
  async ({ id, submitData }, { dispatch, rejectWithValue }) => {
    try {
      await axios.patch(`/api/v1/events/${id}`, submitData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(setSuccess("Event updated successfully."));
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update event.";
      dispatch(setError(msg));
      return rejectWithValue(msg);
    }
  }
);

export const deleteAdminEvent = createAsyncThunk(
  "adminEvents/delete",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/events/${id}`, { withCredentials: true });
      dispatch(setSuccess("Event deleted successfully."));
      return id;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete event.";
      dispatch(setError(msg));
      return rejectWithValue(msg);
    }
  }
);

const adminEventsSlice = createSlice({
  name: "adminEvents",
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchAdminEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAdminEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e._id !== action.payload);
      });
  },
});

export default adminEventsSlice.reducer;
