import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const SellerProtectedRoute = ({ children, isAdmin }) => {
    const { loading, isAuthenticated, seller } = useSelector(state => state.seller);

    if (loading) return null;

    if (!isAuthenticated) return <Navigate to="/seller/login" />;
    if (isAdmin && seller?.role !== "seller") return <Navigate to="/seller/login" />;

    return children;
};

const SellerOnBoardingProtectedRoute = ({ children }) => {
    const { loading, payloadSellerData, isAuthenticated } = useSelector(state => state.seller);

    if (loading) return null;

    if (!isAuthenticated) return <Navigate to="/seller/login" />;
    if (payloadSellerData?.onBoarding?.[5] === 1) return <Navigate to="/seller/dashboard" />;

    return children;
};

export { SellerProtectedRoute, SellerOnBoardingProtectedRoute };
