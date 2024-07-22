import { createSlice } from "@reduxjs/toolkit";
import { getAllVerifyUsersThunk } from "../../apiThunk/userThunk";

export const allVerifyUsersSlice = createSlice({
    name: "allVerifyUsers",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getAllVerifyUsersThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getAllVerifyUsersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getAllVerifyUsersThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default allVerifyUsersSlice.reducer;
