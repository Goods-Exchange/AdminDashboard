import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPostCategory,
  deletePostCategory,
  getPostCategory,
  updatePostCategory,
  getPostCategoryDetail,
} from "../../api/postCategory";

export const updatePostCategoryThunk = createAsyncThunk(
  "postCategory/updatePostCategory",
  async (data, thunkAPI) => {
    try {
      const response = await updatePostCategory(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createPostCategoryThunk = createAsyncThunk(
  "postCategory/createPostCategory",
  async (data, thunkAPI) => {
    try {
      const response = await createPostCategory(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getPostCategoryThunk = createAsyncThunk(
  "postCategory/getPostCategory",
  async (thunkAPI) => {
    try {
      const response = await getPostCategory();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getPostCategoryDetailThunk = createAsyncThunk(
  "postCategory/getPostCategoryDetail",
  async (id, thunkAPI) => {
    try {
      const response = await getPostCategoryDetail(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deletePostCategoryThunk = createAsyncThunk(
  "postCategory/deletePostCategory",
  async (id, thunkAPI) => {
    try {
      const response = await deletePostCategory(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
