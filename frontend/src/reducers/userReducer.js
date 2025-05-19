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
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    CREATE_OFFER_USER_REQUEST,
    CREATE_OFFER_USER_SUCCESS,
    CREATE_OFFER_USER_RESET,
    CREATE_OFFER_USER_FAIL,
    GET_OFFER_USER_REQUEST,
    GET_OFFER_USER_SUCCESS,
    GET_OFFER_USER_RESET,
    GET_OFFER_USER_FAIL,
    UPDATE_OFFER_USER_REQUEST,
    UPDATE_OFFER_USER_SUCCESS,
    UPDATE_OFFER_USER_RESET,
    UPDATE_OFFER_USER_FAIL,
    DELETE_OFFER_USER_REQUEST,
    DELETE_OFFER_USER_SUCCESS,
    DELETE_OFFER_USER_RESET,
    DELETE_OFFER_USER_FAIL,
    GET_ALL_OFFER_USER_REQUEST,
    GET_ALL_OFFER_USER_SUCCESS,
    GET_ALL_OFFER_USER_RESET,
    GET_ALL_OFFER_USER_FAIL,
    REMOVE_USER_DETAILS,
    DELETE_REQUEST_USER_REQUEST_REQUEST,
    DELETE_REQUEST_USER_REQUEST_SUCCESS,
    DELETE_REQUEST_USER_REQUEST_FAIL,
    DELETE_REQUEST_USER_REQUEST_RESET,
    DEACTIVATE_REQUEST_USER__REQUEST,
    DEACTIVATE_REQUEST_USER__SUCCESS,
    DEACTIVATE_REQUEST_USER__FAIL,
    DEACTIVATE_REQUEST_USER__RESET,
    
} from '../constants/userConstants';

export const userReducer = (state = { user: {} }, { type, payload }) => {
    switch (type) {
        case LOGIN_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_USER_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: payload,
            };
        case LOGOUT_USER_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            };
        case LOGIN_USER_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: payload,
            };
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: payload,
            }
        case LOGOUT_USER_FAIL:
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

export const profileReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case DELETE_USER_RESET:
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

export const forgotPasswordReducer = (state = {}, { type, payload }) => {
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

export const allUsersReducer = (state = { users: [] }, { type, payload }) => {
    switch (type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: payload,
            };
        case ALL_USERS_FAIL:
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

export const userDetailsReducer = (state = { user: {} }, { type, payload }) => {
    switch (type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload,
            };
        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case REMOVE_USER_DETAILS:
            return {
                ...state,
                user: {},
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

export const createOfferReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case CREATE_OFFER_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_OFFER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                offer: payload,
            };
        case CREATE_OFFER_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case CREATE_OFFER_USER_RESET:
            return {
                ...state,
                success: false,
                offer: null,
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

export const getOfferReducer = (state = { offer: null }, { type, payload }) => {
    switch (type) {
        case GET_OFFER_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_OFFER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                offer: payload,
            };
        case GET_OFFER_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case GET_OFFER_USER_RESET:
            return {
                ...state,
                offer: null,
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

export const updateOfferReducer = (state = { offer: null }, { type, payload }) => {
    switch (type) {
        case UPDATE_OFFER_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_OFFER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                offer: payload,
            };
        case UPDATE_OFFER_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case UPDATE_OFFER_USER_RESET:
            return {
                ...state,
                success: false,
                offer: null,
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

export const deleteOfferReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case DELETE_OFFER_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_OFFER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: payload,
            };
        case DELETE_OFFER_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case DELETE_OFFER_USER_RESET:
            return {
                ...state,
                success: false,
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

const initialState = {
    loading: false,
    offers: [],
    error: null,
    success: false,
};

export const getAllOfferReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_OFFER_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_OFFER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                offers: payload,
            };
        case GET_ALL_OFFER_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case GET_ALL_OFFER_USER_RESET:
            return {
                ...state,
                success: false,
                offers: [],
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

export const deleteRequestUserReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case DELETE_REQUEST_USER_REQUEST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_REQUEST_USER_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };
        case DELETE_REQUEST_USER_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case DELETE_REQUEST_USER_REQUEST_RESET:
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

export const deactivateUserReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case DEACTIVATE_REQUEST_USER__REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DEACTIVATE_REQUEST_USER__SUCCESS:
            return {
                ...state,
                loading: false,
                isDeactivate: payload,
            };
        case DEACTIVATE_REQUEST_USER__FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case DEACTIVATE_REQUEST_USER__RESET:
            return {
                ...state,
                isDeactivate: false,
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