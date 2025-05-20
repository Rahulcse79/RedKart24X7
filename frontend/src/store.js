import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { forgotPasswordReducer, deleteRequestUserReducer, deactivateUserReducer, profileReducer, userReducer, allUsersReducer, userDetailsReducer, createOfferReducer, getOfferReducer, updateOfferReducer, deleteOfferReducer, getAllOfferReducer, } from './reducers/userReducer';
import { SellerReducer, forgotPasswordSellerReducer, profileSellerReducer, allSellersReducer, sellerDetailsReducer, otpSendReducer, deleteAccountReducer, deactivateAccountReducer, deleteRequestAccountReducer } from './reducers/SellerReducer';
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer, productReviewsReducer, deletReducer, deleteAdminReviewReducer, productAdminReviewsReducer, productAdminReducer } from './reducers/productReducer';
import { createStoreReducer, bankAccountReducer, businessInformationReducer, documentUploadReducer, verificationReducer, getStoreReducer } from './reducers/storeReducer';
import { cartReducer } from './reducers/cartReducer';
import { saveForLaterReducer } from './reducers/saveForLaterReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer, paymentStatusReducer } from './reducers/orderReducer';
import { wishlistReducer } from './reducers/wishlistReducer';

const reducer = combineReducers({

    seller: SellerReducer,
    forgotPasswordSeller: forgotPasswordSellerReducer,
    profileSellerReducer: profileSellerReducer,
    allSellers: allSellersReducer,
    otpSendReducer: otpSendReducer,
    sellerDetails: sellerDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    newReview: newReviewReducer,
    cart: cartReducer,
    saveForLater: saveForLaterReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    paymentStatus: paymentStatusReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    newProduct: newProductReducer,
    product: productReducer,
    users: allUsersReducer,
    userDetails: userDetailsReducer,
    reviews: productReviewsReducer,
    review: deletReducer,
    wishlist: wishlistReducer,
    sellerCreateStore: createStoreReducer,
    sellerBankAccount: bankAccountReducer,
    sellerBusinessInformation: businessInformationReducer,
    sellerDocumentUpload: documentUploadReducer,
    sellerVerification: verificationReducer,
    sellerGetStoreData: getStoreReducer,
    sellerDeleteRequestAccount: deleteRequestAccountReducer,
    sellerDeactivateAccount: deactivateAccountReducer,
    sellerDeleteAccount: deleteAccountReducer,
    createOffer: createOfferReducer,
    getOffer: getOfferReducer,
    updateOffer: updateOfferReducer,
    deleteOffer: deleteOfferReducer,
    getAllOffers: getAllOfferReducer,
    adminDeleteReview: deleteAdminReviewReducer,
    adminReview: productAdminReviewsReducer,
    productAdminAction: productAdminReducer,
    deleteRequestUser: deleteRequestUserReducer,
    deactivateUser: deactivateUserReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
    saveForLater: {
        saveForLaterItems: localStorage.getItem('saveForLaterItems')
            ? JSON.parse(localStorage.getItem('saveForLaterItems'))
            : [],
    },
    wishlist: {
        wishlistItems: localStorage.getItem('wishlistItems')
            ? JSON.parse(localStorage.getItem('wishlistItems'))
            : [],
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;