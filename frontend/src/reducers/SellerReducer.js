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
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    CLEAR_ERRORS,
    FORGOT_PASSWORD_REQUEST,
    RESET_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    ALL_SELLERS_REQUEST,
    ALL_SELLERS_SUCCESS,
    ALL_SELLERS_FAIL,
    SELLER_DETAILS_REQUEST,
    SELLER_DETAILS_SUCCESS,
    SELLER_DETAILS_FAIL,
    UPDATE_SELLER_REQUEST,
    UPDATE_SELLER_SUCCESS,
    UPDATE_SELLER_RESET,
    UPDATE_SELLER_FAIL,
    DELETE_SELLER_REQUEST,
    DELETE_SELLER_SUCCESS,
    DELETE_SELLER_RESET,
    DELETE_SELLER_FAIL,
    REMOVE_SELLER_DETAILS,
    OTP_SEND_REQUEST,
    OTP_SEND_SUCCESS, 
    OTP_SEND_FAIL
} from '../constants/SellerConstants'; 

export const SellerReducer = (state = { seller: {} }, { type, payload, payloadSellerData }) => {

    switch (type) {
        case LOGIN_SELLER_REQUEST:
        case REGISTER_SELLER_REQUEST:
        case LOAD_SELLER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false, 
            };
        case LOGIN_SELLER_SUCCESS:
        case REGISTER_SELLER_SUCCESS:
        case LOAD_SELLER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                seller: payload,
                payloadSellerData: payloadSellerData,
            };
        case LOGOUT_SELLER_SUCCESS:
            return {
                loading: false,
                seller: null,
                isAuthenticated: false,
                payloadSellerData: null,
            };
        case LOGIN_SELLER_FAIL:
        case REGISTER_SELLER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                payloadSellerData: null,
                seller: null,
                error: payload,
            };
        case LOAD_SELLER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                payloadSellerData: null,
                seller: null,
                error: payload,
            }
        case LOGOUT_SELLER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const forgotPasswordSellerReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: payload,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload,
            };
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const profileSellerReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_SELLER_REQUEST:
        case DELETE_SELLER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_SELLER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload,
            };
        case DELETE_SELLER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_SELLER_FAIL:
        case DELETE_SELLER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_SELLER_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case DELETE_SELLER_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const allSellersReducer = (state = { sellers: [] }, { type, payload }) => {
    switch (type) {
        case ALL_SELLERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_SELLERS_SUCCESS:
            return {
                ...state,
                loading: false,
                sellers: payload,
            };
        case ALL_SELLERS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const sellerDetailsReducer = (state = { seller: {} }, { type, payload }) => {
    switch (type) {
        case SELLER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SELLER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                seller: payload,
            };
        case SELLER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case REMOVE_SELLER_DETAILS:
            return {
                ...state,
                seller: {},
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const otpSendReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case OTP_SEND_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case OTP_SEND_SUCCESS:
            return {
                ...state,
                loading: false,
                seller: payload,
                isOTPSent: true,
            };

        case OTP_SEND_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
                isOTPSent: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};