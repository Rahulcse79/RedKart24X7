import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    CLEAR_ERRORS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    ALL_USERS_FAIL,
    ALL_USERS_SUCCESS,
    ALL_USERS_REQUEST,
    OTP_SEND_REQUEST,
    OTP_SEND_SUCCESS,
    OTP_SEND_FAIL,
    OTP_BASED_LOGIN_USER_FAIL,
    OTP_BASED_LOGIN_USER_REQUEST,
    OTP_BASED_LOGIN_USER_SUCCESS,
    CREATE_OFFER_USER_REQUEST,
    CREATE_OFFER_USER_SUCCESS,
    CREATE_OFFER_USER_FAIL,
    GET_OFFER_USER_REQUEST,
    GET_OFFER_USER_SUCCESS,
    GET_OFFER_USER_FAIL,
    UPDATE_OFFER_USER_REQUEST,
    UPDATE_OFFER_USER_SUCCESS,
    UPDATE_OFFER_USER_FAIL,
    DELETE_OFFER_USER_REQUEST,
    DELETE_OFFER_USER_SUCCESS,
    DELETE_OFFER_USER_FAIL,
    GET_ALL_OFFER_USER_REQUEST,
    GET_ALL_OFFER_USER_SUCCESS,
    GET_ALL_OFFER_USER_FAIL,
    DELETE_REQUEST_USER_REQUEST_REQUEST,
    DELETE_REQUEST_USER_REQUEST_SUCCESS,
    DELETE_REQUEST_USER_REQUEST_FAIL,
    DEACTIVATE_REQUEST_USER__REQUEST,
    DEACTIVATE_REQUEST_USER__SUCCESS,
    DEACTIVATE_REQUEST_USER__FAIL

} from '../constants/userConstants';
import axios from 'axios';

// Delete request 
export const deleteRequestUser = () => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REQUEST_USER_REQUEST_REQUEST });
        const { data } = await axios.get(`/api/v1/request/delete`);

        dispatch({
            type: DELETE_REQUEST_USER_REQUEST_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: DELETE_REQUEST_USER_REQUEST_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Deactivate user
export const deactivateUser = () => async (dispatch) => { 
    try {

        dispatch({ type: DEACTIVATE_REQUEST_USER__REQUEST });
        const { data } = await axios.get(`/api/v1/deactivate`);

        dispatch({
            type: DEACTIVATE_REQUEST_USER__SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: DEACTIVATE_REQUEST_USER__FAIL,
            payload: error.response.data.message,
        });
    }
};

// OTP send 
export const OTPSend = (email, onSuccess, onError) => async (dispatch) => {
    try {
        dispatch({ type: OTP_SEND_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            '/api/v1/otp/send',
            { email },
            config
        );

        dispatch({
            type: OTP_SEND_SUCCESS,
            payload: data.user,
        });

        if (onSuccess) onSuccess();

    } catch (error) {
        dispatch({
            type: OTP_SEND_FAIL,
            payload: error.response?.data?.message || error.message,
        });
        if (onError) onError(error.response?.data?.message);
    }
};

// Login User by OTP
export const OTPloginUser = (email, OTP, onSuccess, onError) => async (dispatch) => {
    try {
        dispatch({ type: OTP_BASED_LOGIN_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            '/api/v1/otp/based/login',
            { email, OTP },
            config
        );

        dispatch({
            type: OTP_BASED_LOGIN_USER_SUCCESS,
            payload: data.user,
        });

        if (onSuccess) onSuccess();

    } catch (error) {
        dispatch({
            type: OTP_BASED_LOGIN_USER_FAIL,
            payload: error.response?.data?.message || error.message,
        });

        if (onError) onError(error.response?.data?.message);
    }
};

// Login User
export const loginUser = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post(
            '/api/v1/login',
            { email, password },
            config
        );

        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Register User
export const registerUser = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }

        const { data } = await axios.post(
            'http://localhost:4000/api/v1/register',
            userData,
            config
        );

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load User
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get('/api/v1/me');

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get('/api/v1/logout');
        dispatch({ type: LOGOUT_USER_SUCCESS });
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update User
export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }

        const { data } = await axios.put(
            '/api/v1/me/update',
            userData,
            config
        );

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update User Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.put(
            '/api/v1/password/update',
            passwords,
            config
        );

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post(
            '/api/v1/password/forgot',
            email,
            config
        );

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        );

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Users ---ADMIN
export const getAllUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST });
        const { data } = await axios.get('/api/v1/admin/users');
        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users,
        });

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get User Details ---ADMIN
export const getUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update User Details ---ADMIN
export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.put(
            `/api/v1/admin/user/${id}`,
            userData,
            config
        );

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete User ---ADMIN
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST });
        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Create an offer for a single user
export const createOfferUser = (userId, offerData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_OFFER_USER_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(
            `/api/v1/user/${userId}/offer`,
            offerData,
            config
        );

        dispatch({
            type: CREATE_OFFER_USER_SUCCESS,
            payload: data.offer,
        });
    } catch (error) {
        dispatch({
            type: CREATE_OFFER_USER_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Get all offers for a single user
export const getOfferUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: GET_OFFER_USER_REQUEST });

        const { data } = await axios.get(`/api/v1/user/${userId}/offers`);

        dispatch({
            type: GET_OFFER_USER_SUCCESS,
            payload: data.offers,
        });
    } catch (error) {
        dispatch({
            type: GET_OFFER_USER_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Update an offer by offer index for a user
export const updateOfferUser = (userId, offerIndex, offerData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_OFFER_USER_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(
            `/api/v1/user/${userId}/offer/${offerIndex}`,
            offerData,
            config
        );

        dispatch({
            type: UPDATE_OFFER_USER_SUCCESS,
            payload: data.offer,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_OFFER_USER_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Delete an offer by offer index for a user
export const deleteOfferUser = (userId, offerIndex) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_OFFER_USER_REQUEST });

        const { data } = await axios.delete(`/api/v1/user/${userId}/offer/${offerIndex}`);

        dispatch({
            type: DELETE_OFFER_USER_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: DELETE_OFFER_USER_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Get all offers for all users (admin only)
export const getAllOfferUsers = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_OFFER_USER_REQUEST });

        const { data } = await axios.get(`/api/v1/users/offers`);

        dispatch({
            type: GET_ALL_OFFER_USER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_OFFER_USER_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Clear All Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};