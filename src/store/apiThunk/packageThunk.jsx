import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    buyPackage,
    createPackage,
    deletePackage,
    getPackages,
    updatePackage,
    getPackageDetail,
    getAllSubscription,
    setPriorityPackage,
    setStandardPackage
} from "../../api/package";

export const getPackageDetailThunk = createAsyncThunk(
    "package/getPackageDetail",
    async (id, thunkAPI) => {
        try {
            const response = await getPackageDetail(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const buyPackageThunk = createAsyncThunk(
    "package/buyPackage",
    async (data, thunkAPI) => {
        try {
            const response = await buyPackage(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createPackageThunk = createAsyncThunk(
    "package/createPackage",
    async (data, thunkAPI) => {
        try {
            const response = await createPackage(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
            
        }
    }
);

export const setStandardPackageThunk = createAsyncThunk(
    "package/setStandardPackage",
    async (susbcriptionId, thunkAPI) => {
        try {
            const response = await setStandardPackage(susbcriptionId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
            
        }
    }
);

export const setPriorityPackageThunk = createAsyncThunk(
    "package/setPriorityPackage",
    async (susbcriptionId, thunkAPI) => {
        try {
            const response = await setPriorityPackage(susbcriptionId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
            
        }
    }
);

export const deletePackageThunk = createAsyncThunk(
    "package/deletePackage",
    async (id, thunkAPI) => {
        try {
            const response = await deletePackage(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
//GetAllSubscription
export const getPackagesThunk = createAsyncThunk(
    "package/getPackages",
    async (thunkAPI) => {
        try {
            const response = await getPackages();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

//GetAllSubscription
export const getAllSubscriptionThunk = createAsyncThunk(
    "package/getPackages",
    async (thunkAPI) => {
        try {
            const response = await getAllSubscription();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
//UPDATESubscription
export const updatePackageThunk = createAsyncThunk(
    "package/updatePackage",
    async (data, thunkAPI) => {
        try {
            const response = await updatePackage(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
