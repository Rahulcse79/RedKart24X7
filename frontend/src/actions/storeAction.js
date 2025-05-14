import {

    CREATE_STORE_SETUP_REQUEST,
    CREATE_STORE_SETUP_SUCCESS,
    CREATE_STORE_SETUP_FAIL,
    BANK_ACCOUNT_SETUP_REQUEST,
    BANK_ACCOUNT_SETUP_SUCCESS,
    BANK_ACCOUNT_SETUP_FAIL,
    BUSINESS_INFORMATION_SETUP_REQUEST,
    BUSINESS_INFORMATION_SETUP_SUCCESS,
    BUSINESS_INFORMATION_SETUP_FAIL,
    DOCUMENT_UPLOAD_SETUP_REQUEST,
    DOCUMENT_UPLOAD_SETUP_SUCCESS,
    DOCUMENT_UPLOAD_SETUP_FAIL,
    VERIFICATION_SETUP_REQUEST,
    VERIFICATION_SETUP_SUCCESS,
    VERIFICATION_SETUP_FAIL,
    GET_STORE_REQUEST,
    GET_STORE_SUCCESS,
    GET_STORE_FAIL,
    CLEAR_ERRORS

} from '../constants/storeConstants';
import axios from 'axios';

// Create store setup action. 
export const CreateStoreSetupAction = (createStoreData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_STORE_SETUP_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(
            '/api/v1/seller/createStore-setup',
            createStoreData,
            config
        );

        dispatch({
            type: CREATE_STORE_SETUP_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_STORE_SETUP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// Bank account setup action.
export const bankAccountSetupAction = ( bankAccountData ) => async (dispatch) => {
    try {

        dispatch({ type: BANK_ACCOUNT_SETUP_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post(
            '/api/v1/seller/bankAccount-setup',
            bankAccountData,
            config
        );

        dispatch({
            type: BANK_ACCOUNT_SETUP_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: BANK_ACCOUNT_SETUP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// Business information setup action.
export const BusinessInformationSetupAction = ( businessInfoData ) => async (dispatch) => {
    try {

        dispatch({ type: BUSINESS_INFORMATION_SETUP_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post(
            '/api/v1/seller/businessInfo-setup',
            businessInfoData,
            config
        );

        dispatch({
            type: BUSINESS_INFORMATION_SETUP_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: BUSINESS_INFORMATION_SETUP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// Document upload setup action.
export const DocumentUploadSetupAction = ( documentUploadData ) => async (dispatch) => {
    try {

        dispatch({ type: DOCUMENT_UPLOAD_SETUP_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post(
            '/api/v1/seller/documentUpload-setup',
            documentUploadData,
            config
        );

        dispatch({
            type: DOCUMENT_UPLOAD_SETUP_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: DOCUMENT_UPLOAD_SETUP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// Verification setup action.
export const VerificationAction = ( verificationData ) => async (dispatch) => {
    try {

        dispatch({ type: VERIFICATION_SETUP_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post(
            '/api/v1/seller/verification',
            verificationData,
            config
        );

        dispatch({
            type: VERIFICATION_SETUP_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: VERIFICATION_SETUP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// Get store action. 
export const GetStoreAction = (email) => async (dispatch) => {
    try {
        dispatch({ type: GET_STORE_REQUEST });
        
        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.get(
            `/api/v1/seller/admin/get/storeData?email=${encodeURIComponent(email)}`,
            config
        );
        dispatch({
            type: GET_STORE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_STORE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// Clear All Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};