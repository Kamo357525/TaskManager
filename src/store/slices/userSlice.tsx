import {createSlice} from '@reduxjs/toolkit';
import {Auth, Users} from "../../services/Api";
import {setCookie} from "../../helpers/cookie";
import {helperCreateAsyncThunk} from "../../helpers/utils";

const initialState = {
    user: false,
    setUserDataSuccess: false,
    setUserDataLoad: false,
    setUserDataError: false,
    setPasswordLoad: false,
    setPasswordError: false,
    setPasswordSuccess: false,
    isRegister: false,
    registerLoad: false,
    registerError: false,
    token: null,
    tokenError: null,
    loadToken: null,
    userLoginError: null,
    userLoginLoad: false,
    saveToke: false,
};

const userLogin = helperCreateAsyncThunk('userLogin', Auth.userLogin);
const userRegister = helperCreateAsyncThunk('userRegister', Auth.userRegister);
const updateUserPassword = helperCreateAsyncThunk('updateUserPassword', Auth.updatePassword);

const getUserProfile = helperCreateAsyncThunk('getUserProfile', Users.getUserProfile);
const updateUserProfile = helperCreateAsyncThunk('updateUserProfile', Users.updateUser);


const userSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        deleteUser: (state) => {
            state.token = false;
            state.user = null;
        },
        setSaveToken: (state) => {
            state.saveToke = !state.saveToke
        },
        registerInitialState: (state) => {
            state.isRegister = false;
            state.registerError = false;
        },
        setUserDataInitialState: (state) => {
            state.setUserDataSuccess = false;
            state.setUserDataLoad = false;
            state.setUserDataError = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.userLoginError = null;
                state.userLoginLoad = true;
            })
            .addCase(userLogin.fulfilled, (state, action,) => {
                const {accessToken, refreshToken} = action.payload.data;
                setCookie('Token', accessToken, 1);
                setCookie('RefreshToken', refreshToken, 2);
                state.token = accessToken;
                state.userLoginLoad = false;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.userLoginLoad = false;
                state.userLoginError = action.error.code;
            })
            .addCase(userRegister.pending, (state) => {
                state.isRegister = false;
                state.registerLoad = true;
                state.registerError = false;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.isRegister = true;
                state.registerLoad = false;
                state.registerError = false;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.registerLoad = false;
                state.registerError = action.error.message;
            })
            .addCase(getUserProfile.pending, (state) => {
                state.tokenError = false;
                state.loadToken = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loadToken = false;
                state.user = action.payload.data;
                // state.userImagePath = action.payload.data.file ? slicePath(action.payload.data.file.imagePath) : false
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.user = null;
                state.loadToken = false;
                state.tokenError = action.error.code;
            })
            .addCase(updateUserPassword.pending, (state) => {
                state.setPasswordLoad = true;
                state.setPasswordError = false;
                state.setPasswordSuccess = false;
            })
            .addCase(updateUserPassword.fulfilled, (state, action) => {
                const {accessToken, refreshToken} = action.payload.data;
                setCookie('Token', accessToken, 1);
                setCookie('RefreshToken', refreshToken, 2);
                state.token = accessToken;
                state.setPasswordLoad = false;
                state.setPasswordError = false;
                state.setPasswordSuccess = true;
            })
            .addCase(updateUserPassword.rejected, (state, action) => {
                    state.setPasswordLoad = false;
                    state.setPasswordError = action.error.code;
                    state.setPasswordSuccess = false;
                }
            )
            .addCase(updateUserProfile.pending, (state) => {
                state.setUserDataSuccess = false;
                state.setUserDataLoad = true;
                state.setUserDataError = false;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.setUserDataSuccess = true;
                state.setUserDataLoad = false;
                state.setUserDataError = false;
                state.user = action.payload.data;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.setUserDataSuccess = false;
                state.setUserDataLoad = false;
                state.setUserDataError = action.error.code;
            })
    },
});

const {
    deleteUser,
    registerInitialState,
    setUserDataInitialState,
    } = userSlice.actions;

export {
    updateUserProfile,
    updateUserPassword,
    userLogin,
    getUserProfile,
    deleteUser,
    setUserDataInitialState,
    userRegister,
    registerInitialState,
};

export default userSlice.reducer;
