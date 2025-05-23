// Fonts & Libraries
export { default as WebFont } from 'webfontloader';
export { Routes, Route, useLocation } from 'react-router-dom';
export { useEffect } from 'react';
export { useDispatch } from 'react-redux';

// Actions
export { loadUser } from './actions/userAction';
export { loadSeller } from './actions/SellerAction';

// Layouts
export { default as Header } from './components/Layouts/Header/Header';
export { default as Footer } from './components/Layouts/Footer/Footer';

// Chat box
export { default as ChatBox } from './components/Chat/chatBox';

// User Components
export { default as Login } from './components/User/Login';
export { default as Register } from './components/User/Register';
export { default as UpdateProfile } from './components/User/UpdateProfile';
export { default as UpdatePassword } from './components/User/UpdatePassword';
export { default as ForgotPassword } from './components/User/ForgotPassword';
export { default as ResetPassword } from './components/User/ResetPassword';
export { default as Account } from './components/User/Account';
export { default as OTP } from './components/User/OTP';

// Seller Auth
export { default as SellerLogin } from './components/Seller/SellerLogin';
export { default as SellerOTPBasedLogin } from './components/Seller/SellerOTPBasedLogin';
export { default as SellerRegister } from './components/Seller/SellerRegister';
export { default as SellerForgotPassword } from './components/Seller/SellerForgotPassword';
export { default as SellerResetPassword } from './components/Seller/SellerResetPassword';

// Seller Dashboard & Routes
export { default as SellerDashboard } from './components/Seller/SellerDashBoard';
export { SellerProtectedRoute, SellerOnBoardingProtectedRoute } from './Routes/SellerProtectedRoute';

// Seller Onboarding
export { default as CreateStore } from './components/Seller/OnBoarding/CreateStore';
export { default as SellerBankAccountADDForm } from './components/Seller/OnBoarding/BankAccountSetup';
export { default as BusinessInfo } from './components/Seller/OnBoarding/BusinessInformation';
export { default as DocumentUpload } from './components/Seller/OnBoarding/DocumentUpload';
export { default as SellerVerification } from './components/Seller/OnBoarding/Verification';
export { default as ReadyToSell } from './components/Seller/OnBoarding/ReadyToSell';
export { default as SellerEditStoreInfo } from './components/Seller/SellerEditStoreInfo';

// Seller Products
export { default as SellerAddProducts } from './components/Seller/Products/AddProducts';
export { default as SellerProtectedDashboard } from './components/Seller/Products/Dashboard';
export { default as SellerProducts } from './components/Seller/Products/Products';
export { default as SellerUpdateProfile } from './components/Seller/UpdateProfile';
export { default as SellerProductHome } from './components/Seller/Products/Home';
export { default as SellerProductOrders } from './components/Seller/Products/OrderTable';
export { default as SellerProductsReviews } from './components/Seller/Products/ReviewsTable';
export { default as SellerUpdateProducts } from './components/Seller/Products/UpdateProduct';

// Routes
export { default as ProtectedRoute } from './Routes/ProtectedRoute';

// Pages
export { default as Home } from './components/Home/Home';
export { default as ProductDetails } from './components/ProductDetails/ProductDetails';
export { default as Products } from './components/Products/Products';
export { default as Cart } from './components/Cart/Cart';
export { default as Shipping } from './components/Cart/Shipping';
export { default as OrderConfirm } from './components/Cart/OrderConfirm';
export { default as Payment } from './components/Cart/Payment';
export { default as OrderStatus } from './components/Cart/OrderStatus';
export { default as OrderSuccess } from './components/Cart/OrderSuccess';
export { default as MyOrders } from './components/Order/MyOrders';
export { default as OrderDetails } from './components/Order/OrderDetails';
export { default as Wishlist } from './components/Wishlist/Wishlist';
export { default as NotFound } from './components/NotFound';

// Admin
export { default as Dashboard } from './components/Admin/Dashboard';
export { default as MainData } from './components/Admin/MainData';
export { default as OrderTable } from './components/Admin/OrderTable';
export { default as UpdateOrder } from './components/Admin/UpdateOrder';
export { default as ProductTable } from './components/Admin/ProductTable';
export { default as UpdateProduct } from './components/Admin/UpdateProduct';
export { default as AccountsTable } from './components/Admin/accountsTable';
export { default as UpdateUserAndSeller } from './components/Admin/UpdateUserAndSeller';
export { default as ReviewsTable } from './components/Admin/ReviewsTable';

// Temp Pages
export { default as DownloadAppPage } from './components/Temp_pages/DownloadAPPPage';
export { default as GiftCards } from './components/Temp_pages/GiftCards';
export { default as HelpCenter } from './components/Temp_pages/HelpCenter';
export { default as SellOnRedKart24X7 } from './components/Seller/SellOnWebsite';
