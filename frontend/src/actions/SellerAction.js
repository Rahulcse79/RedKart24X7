import {
    LOGIN_SELLER_REQUEST,
    LOGIN_SELLER_SUCCESS,
    LOGIN_SELLER_FAIL,
    REGISTER_SELLER_REQUEST,
    REGISTER_SELLER_SUCCESS,
    REGISTER_SELLER_FAIL,
    LOAD_SELLER_REQUEST,
    LOAD_SELLER_SUCCESS,
    LOAD_SELLER_FAIL,
    LOGOUT_SELLER_SUCCESS,
    LOGOUT_SELLER_FAIL,
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
    UPDATE_SELLER_REQUEST,
    UPDATE_SELLER_SUCCESS,
    UPDATE_SELLER_FAIL,
    DELETE_SELLER_REQUEST,
    DELETE_SELLER_SUCCESS,
    DELETE_SELLER_FAIL,
    SELLER_DETAILS_REQUEST,
    SELLER_DETAILS_SUCCESS,
    SELLER_DETAILS_FAIL,
    ALL_SELLERS_FAIL,
    ALL_SELLERS_SUCCESS,
    ALL_SELLERS_REQUEST,
    OTP_SEND_REQUEST,
    OTP_SEND_SUCCESS,
    OTP_SEND_FAIL,
    OTP_BASED_LOGIN_SELLER_FAIL,
    OTP_BASED_LOGIN_SELLER_REQUEST,
    OTP_BASED_LOGIN_SELLER_SUCCESS
} from '../constants/SellerConstants';
import axios from 'axios';

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
            '/api/v1/seller/otp/send',
            { email },
            config
        );

        dispatch({
            type: OTP_SEND_SUCCESS,
            payload: data.seller,
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

// Login seller by OTP
export const OTPloginSeller = (email, OTP, onSuccess, onError) => async (dispatch) => {
    try {
        dispatch({ type: OTP_BASED_LOGIN_SELLER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            '/api/v1/seller/otp/based/login',
            { email, OTP },
            config
        );

        dispatch({
            type: OTP_BASED_LOGIN_SELLER_SUCCESS,
            payload: data.seller,
            payloadSellerData: data.sellerData,
        });

        if (onSuccess) onSuccess(); 

    } catch (error) {
        dispatch({
            type: OTP_BASED_LOGIN_SELLER_FAIL,
            payload: error.response?.data?.message || error.message,
            payloadSellerData: error.response?.data?.message || error.message,
        });

        if (onError) onError(error.response?.data?.message);
    }
};
 
// Register seller
export const registerSeller = (sellerData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_SELLER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }

        const { data } = await axios.post(
            'http://localhost:4000/api/v1/seller/register',
            sellerData,
            config
        );

        dispatch({
            type: REGISTER_SELLER_SUCCESS,
            payload: data.seller,
            payloadSellerData: data.sellerData,
        });

    } catch (error) {
        dispatch({
            type: REGISTER_SELLER_FAIL,
            payload: error.response.data.message,
            payloadSellerData: error.response.data.message,
        });
    }
};

// Logout seller
export const logoutSeller = () => async (dispatch) => {
    try {
        await axios.get('/api/v1/seller/logout');
        dispatch({ type: LOGOUT_SELLER_SUCCESS });
    } catch (error) {
        dispatch({
            type: LOGOUT_SELLER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update seller
export const updateProfile = (sellerData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }

        const { data } = await axios.put(
            '/api/v1/seller/me/update',
            sellerData,
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

// Login seller
export const loginSeller = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_SELLER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post(
            '/api/v1/seller/login',
            { email, password },
            config
        );

        dispatch({
            type: LOGIN_SELLER_SUCCESS,
            payload: data.seller,
            payloadSellerData: data.sellerData,
        });

    } catch (error) {
        dispatch({
            type: LOGIN_SELLER_FAIL,
            payload: error.response.data.message,
            payloadSellerData: error.response.data.message,
        });
    }
};

// Load Seller
export const loadSeller = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_SELLER_REQUEST });
        const { data } = await axios.get('/api/v1/seller/me');
        dispatch({
            type: LOAD_SELLER_SUCCESS,
            payload: data.seller,
            payloadSellerData: data.sellerData,
        });
    } catch (error) {
        dispatch({
            type: LOAD_SELLER_FAIL,
            payload: error.response.data.message,
            payloadSellerData: error.response.data.message,
        });
    }
};

// Update seller Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.put(
            '/api/v1/seller/password/update',
            passwords,
            config
        );

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success,
            payloadSellerData: data.sellerData,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
            payloadSellerData: error.response.data.message,
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
            '/api/v1/seller/password/forgot',
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
            `/api/v1/seller/password/reset/${token}`,
            passwords,
            config
        );

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success,
            payloadSellerData: data.sellerData,
        });

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
            payloadSellerData: error.response.data.message,
        });
    }
};

// Get All sellers ---ADMIN
export const getAllSellers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_SELLERS_REQUEST });
        const { data } = await axios.get('/api/v1/seller/admin/sellers');
        dispatch({
            type: ALL_SELLERS_SUCCESS,
            payload: data.sellers,
        });

    } catch (error) {
        dispatch({
            type: ALL_SELLERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get seller Details ---ADMIN
export const getSellerDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: SELLER_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/seller/admin/seller/${id}`);

        dispatch({
            type: SELLER_DETAILS_SUCCESS,
            payload: data.seller,
        });

    } catch (error) {
        dispatch({
            type: SELLER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update seller Details ---ADMIN
export const updateSeller = (id, sellerData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_SELLER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.put(
            `/api/v1/seller/admin/seller/${id}`,
            sellerData,
            config
        );

        dispatch({
            type: UPDATE_SELLER_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_SELLER_FAIL,
            payload: error.response.data.message, 
        });
    }
};

// Delete seller ---ADMIN
export const deleteSeller = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SELLER_REQUEST });
        const { data } = await axios.delete(`/api/v1/seller/admin/seller/${id}`);

        dispatch({
            type: DELETE_SELLER_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: DELETE_SELLER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear All Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};