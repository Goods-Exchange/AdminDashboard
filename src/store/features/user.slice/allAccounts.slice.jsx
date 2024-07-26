import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersThunk } from "../../apiThunk/userThunk";

export const allAccountsSlice = createSlice({
    name: "allAccounts",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getAllUsersThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getAllUsersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getAllUsersThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default allAccountsSlice.reducer;
