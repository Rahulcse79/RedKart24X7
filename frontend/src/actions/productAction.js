import axios from "axios";
import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    SELLER_PRODUCTS_REQUEST,
    SELLER_PRODUCTS_SUCCESS,
    SELLER_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    ALL_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    SLIDER_PRODUCTS_REQUEST,
    SLIDER_PRODUCTS_SUCCESS,
    SLIDER_PRODUCTS_FAIL,
    ALL_REVIEWS_ADMIN__REQUEST,
    ALL_REVIEWS_ADMIN__SUCCESS,
    ALL_REVIEWS_ADMIN__FAIL,
    DELETE_REVIEW_ADMIN_REQUEST,
    DELETE_REVIEW_ADMIN_SUCCESS,
    DELETE_REVIEW_ADMIN_FAIL,
    ADMIN_UPDATE_PRODUCTS_REQUEST,
    ADMIN_UPDATE_PRODUCTS_SUCCESS,
    ADMIN_UPDATE_PRODUCTS_FAIL,
    ADMIN_DELETE_PRODUCTS_REQUEST,
    ADMIN_DELETE_PRODUCTS_SUCCESS,
    ADMIN_DELETE_PRODUCTS_FAIL,

} from "../constants/productConstants";

// Get All Products --- Filter/Search/Sort
export const getProducts =
    (keyword = "", category, price = [0, 200000], ratings = 0, currentPage = 1) => async (dispatch) => {
        try {
            dispatch({ type: ALL_PRODUCTS_REQUEST });

            let url = `/api/v1/seller/d2/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&page=${currentPage}`;
            if (category) {
                url = `/api/v1/seller/d2/products?keyword=${keyword}&category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&page=${currentPage}`;
            }
            const { data } = await axios.get(url);

            dispatch({
                type: ALL_PRODUCTS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCTS_FAIL,
                payload: error.response.data.message,
            });
        }
    };

// Get All Products Of Same Category
export const getSimilarProducts = (category) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });

        const { data } = await axios.get(`/api/v1/seller/d2/products?category=${category}`);

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/seller/d2/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// New/Update Review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put("/api/v1/review", reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Get All Products ---PRODUCT SLIDER
export const getSliderProducts = () => async (dispatch) => {
    try {
        dispatch({ type: SLIDER_PRODUCTS_REQUEST });

        const { data } = await axios.get('/api/v1/seller/d2/products/all');

        dispatch({
            type: SLIDER_PRODUCTS_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: SLIDER_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Products 
export const getSellerProducts = () => async (dispatch) => {
    try {
        dispatch({ type: SELLER_PRODUCTS_REQUEST });

        const { data } = await axios.get('/api/v1/seller/d2/products');

        dispatch({
            type: SELLER_PRODUCTS_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: SELLER_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// New Product 
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post("/api/v1/seller/d2/product/new", productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/seller/d2/product/${id}`, productData, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Update Product --ADMIN
export const updateAdminProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_UPDATE_PRODUCTS_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config);

        dispatch({
            type: ADMIN_UPDATE_PRODUCTS_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Delete Product 
export const deleteAdminProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_PRODUCTS_REQUEST });
        const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

        dispatch({
            type: ADMIN_DELETE_PRODUCTS_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Delete Product 
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });
        const { data } = await axios.delete(`/api/v1/seller/d2/product/${id}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Get Product Reviews 
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEWS_REQUEST });
        const { data } = await axios.get(`/api/v1/seller/d2/reviews?id=${id}`);

        dispatch({
            type: ALL_REVIEWS_SUCCESS,
            payload: data.reviews,
        });
    } catch (error) {
        dispatch({
            type: ALL_REVIEWS_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Delete Product Review
export const deleteReview = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });
        const { data } = await axios.delete(`/api/v1/seller/d2/reviews?id=${reviewId}&productId=${productId}`);

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Get Product Reviews --ADMIN
export const getAllAdminReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEWS_ADMIN__REQUEST });
        const { data } = await axios.get(`/api/v1/admin/get/reviews?id=${id}`);

        dispatch({
            type: ALL_REVIEWS_ADMIN__SUCCESS,
            payload: data.reviews,
        });
    } catch (error) {
        dispatch({
            type: ALL_REVIEWS_ADMIN__FAIL,
            payload: error.response.data.message,
        });
    }
}

// Delete Product Review --ADMIN
export const deleteAdminReview = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_ADMIN_REQUEST });
        const { data } = await axios.delete(`/api/v1/admin/get/reviews?id=${reviewId}&productId=${productId}`);

        dispatch({
            type: DELETE_REVIEW_ADMIN_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_ADMIN_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}