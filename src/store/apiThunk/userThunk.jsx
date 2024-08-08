import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserData,
  login,
  sendOTP,
  verifyUser,
  getUserDetail,
  signup,
  checkEmail,
  newPassword,
  sendOTPForgotPassword,
  updatePassword,
  updateUserData,
  verifyForgot,
  loginGG,
  createStaff,
  getStaffs,
  getAllAccounts,
  updateStatusAccount,
  updateStaffPassword,
  getAllVerifyUsers,
  getAllUsers,
  approveUser,
  denyUser,
  banUser,
  unbanUser,
  changeRoleUser
} from "../../api/user";

export const updateStaffPasswordThunk = createAsyncThunk(
  "users/updateStaffPassword",
  async (data, thunkAPI) => {
    try {
      const response = await updateStaffPassword(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllAccountsThunk = createAsyncThunk(
  "users/getAllAccounts",
  async ({ role, pageNumber, pageSize }, thunkAPI) => {
    try {
      const response = await getAllAccounts(role, pageNumber, pageSize);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);


// TODO: API getAllVerifyUsers Thunk
export const getAllVerifyUsersThunk = createAsyncThunk(
  "users/getAllVerifyUsers",
  async (thunkAPI) => {
    try {
      const response = await getAllVerifyUsers();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
// TODO: API getAllUsers Thunk
export const getAllUsersThunk = createAsyncThunk(
  "users/getAllVerifyUsers",
  async (thunkAPI) => {
    try {
      const response = await getAllUsers();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const updateStatusAccountThunk = createAsyncThunk(
  "users/updateStatusAccount",
  async (data, thunkAPI) => {
    try {
      const response = await updateStatusAccount(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const createStaffThunk = createAsyncThunk(
  "users/createStaff",
  async (data, thunkAPI) => {
    try {
      const response = await createStaff(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getStaffsThunk = createAsyncThunk(
  "users/getStaffs",
  async ({ id, pageNumber, pageSize }, thunkAPI) => {
    try {
      const response = await getStaffs(id, pageNumber, pageSize);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const updateUserDataThunk = createAsyncThunk(
  "users/updateUserData",
  async (data, thunkAPI) => {
    try {
      const response = await updateUserData(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

//approve the user in verification
export const approveUserThunk = createAsyncThunk(
  "users/approveUser",
  async (id, thunkAPI) => {
    try {
      const response = await approveUser(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
//unban user from account
export const unbanUserThunk = createAsyncThunk(
  "users/unbanUser",
  async (userId, thunkAPI) => {
    try {
      const response = await unbanUser(userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

//deny the user in verification
export const denyUserThunk = createAsyncThunk(
  "users/denyUser",
  async (id, thunkAPI) => {
    try {
      const response = await denyUser(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
//ban user from account
export const banUserThunk = createAsyncThunk(
  "users/banUser",
  async (userId, thunkAPI) => {
    try {
      const response = await banUser(userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const changeRoleUserThunk = createAsyncThunk(
  "users/changeRoleUser",
  async (userId, thunkAPI) => {
    try {
      const response = await changeRoleUser(userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const updatePasswordThunk = createAsyncThunk(
  "users/updatePassword",
  async (data, thunkAPI) => {
    try {
      const response = await updatePassword(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const sendOTPForgotPasswordThunk = createAsyncThunk(
  "users/sendOTPForgotPassword",
  async (data, thunkAPI) => {
    try {
      const response = await sendOTPForgotPassword(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const newPasswordThunk = createAsyncThunk(
  "users/newPassword",
  async (data, thunkAPI) => {
    try {
      const response = await newPassword(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const checkEmailThunk = createAsyncThunk(
  "users/checkEmail",
  async (data, thunkAPI) => {
    try {
      const response = await checkEmail(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const verifyForgotThunk = createAsyncThunk(
  "users/verifyForgot",
  async (data, thunkAPI) => {
    try {
      const response = await verifyForgot(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const verifyUserThunk = createAsyncThunk(
  "users/verifyUser",
  async (data, thunkAPI) => {
    try {
      const response = await verifyUser(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const sendOTPThunk = createAsyncThunk(
  "users/sendOTP",
  async (thunkAPI) => {
    try {
      const response = await sendOTP();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const loginGGThunk = createAsyncThunk(
  "users/loginGG",
  async (data, thunkAPI) => {
    try {
      const response = await loginGG(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

//API login
export const loginThunk = createAsyncThunk(
  "users/login",
  async (data, thunkAPI) => {
    try {
      const response = await login(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

//API CurrentLoginUserInfo
export const getUserDataThunk = createAsyncThunk(
  "users/getUserData",
  async (thunkAPI) => {
    try {
      const response = await getUserData();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getUserDetailThunk = createAsyncThunk(
  "users/getUserDetail",
  async (id, thunkAPI) => {
    try {
      const response = await getUserDetail(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const signupThunk = createAsyncThunk(
  "users/signup",
  async (data, thunkAPI) => {
    try {
      const response = await signup(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
