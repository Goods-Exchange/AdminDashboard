import { createSlice } from "@reduxjs/toolkit";
import { getPostCategoryDetailThunk } from './../../apiThunk/postCategoryThunk';

export const postCategoryDetailSlice = createSlice({
    name: "postCategoryDetail",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getPostCategoryDetailThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getPostCategoryDetailThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getPostCategoryDetailThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default postCategoryDetailSlice.reducer;
