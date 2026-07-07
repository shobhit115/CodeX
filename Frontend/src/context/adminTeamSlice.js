import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setError, setSuccess } from "./messageSlice";

export const fetchAdminTeam = createAsyncThunk(
  "adminTeam/fetch",
  async (filterYear, { dispatch, rejectWithValue }) => {
    try {
      const queryParams = filterYear && filterYear !== "ALL" ? `?academicYear=${filterYear}` : "";
      const response = await axios.get(`/api/v1/teams${queryParams}`, {
        withCredentials: true,
      });
      return response.data?.data || [];
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch team data.";
      dispatch(setError(msg));
      return rejectWithValue(msg);
    }
  }
);

export const createAdminTeamMember = createAsyncThunk(
  "adminTeam/create",
  async (submitData, { dispatch, rejectWithValue }) => {
    try {
      await axios.post("/api/v1/teams", submitData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(setSuccess("Team member added successfully."));
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add member.";
      dispatch(setError(msg));
      return rejectWithValue(msg);
    }
  }
);

export const updateAdminTeamMember = createAsyncThunk(
  "adminTeam/update",
  async ({ id, submitData }, { dispatch, rejectWithValue }) => {
    try {
      await axios.patch(`/api/v1/teams/${id}`, submitData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(setSuccess("Team member updated successfully."));
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update member.";
      dispatch(setError(msg));
      return rejectWithValue(msg);
    }
  }
);

export const deleteAdminTeamMember = createAsyncThunk(
  "adminTeam/delete",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/teams/${id}`, { withCredentials: true });
      dispatch(setSuccess("Team member deleted successfully."));
      return id;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete member.";
      dispatch(setError(msg));
      return rejectWithValue(msg);
    }
  }
);

const adminTeamSlice = createSlice({
  name: "adminTeam",
  initialState: {
    members: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(fetchAdminTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAdminTeamMember.fulfilled, (state, action) => {
        state.members = state.members.filter((m) => m._id !== action.payload);
      });
  },
});

export default adminTeamSlice.reducer;
