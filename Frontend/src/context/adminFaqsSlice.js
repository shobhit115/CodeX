import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setError, setSuccess } from "./messageSlice";

export const fetchAdminFaqs = createAsyncThunk(
  "adminFaqs/fetch",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/faqs", {
        withCredentials: true,
      });
      return response.data?.data || [];
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch FAQ manifest.";
      dispatch(setError(msg));
      return rejectWithValue(msg);
    }
  }
);

export const createAdminFaq = createAsyncThunk(
  "adminFaqs/create",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      await axios.post("/api/v1/faqs", formData, { withCredentials: true });
      dispatch(setSuccess("FAQ created successfully."));
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create FAQ.";
      dispatch(setError(msg));
      return rejectWithValue(msg);
    }
  }
);

export const updateAdminFaq = createAsyncThunk(
  "adminFaqs/update",
  async ({ id, formData }, { dispatch, rejectWithValue }) => {
    try {
      await axios.patch(`/api/v1/faqs/${id}`, formData, {
        withCredentials: true,
      });
      dispatch(setSuccess("FAQ updated successfully."));
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update FAQ.";
      dispatch(setError(msg));
      return rejectWithValue(msg);
    }
  }
);

export const deleteAdminFaq = createAsyncThunk(
  "adminFaqs/delete",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/faqs/${id}`, { withCredentials: true });
      dispatch(setSuccess("FAQ entry deleted successfully."));
      return id;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete FAQ.";
      dispatch(setError(msg));
      return rejectWithValue(msg);
    }
  }
);

const adminFaqsSlice = createSlice({
  name: "adminFaqs",
  initialState: {
    faqs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminFaqs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminFaqs.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = action.payload;
      })
      .addCase(fetchAdminFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAdminFaq.fulfilled, (state, action) => {
        state.faqs = state.faqs.filter((f) => f._id !== action.payload);
      });
  },
});

export default adminFaqsSlice.reducer;
