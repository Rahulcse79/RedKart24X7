import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import { useNavigate, Link } from 'react-router-dom';
import SellerOnBoarding from './SellerOnBoarding';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader';
import { deactivateSeller, deleteSeller, clearErrors } from '../../actions/SellerAction';
import { DELETE_SELLER_RESET, DEACTIVATE_SELLER_RESET } from "../../constants/SellerConstants";
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';

const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [showPopup, setShowPopup] = useState(false);
    const [actionType, setActionType] = useState('');
    const { seller, loading, isAuthenticated, payloadSellerData } = useSelector(state => state.seller);
    const { error: isDeletedError, loading: isDeletedLoading, isDeleted } = useSelector(state => state.sellerDeleteAccount);
    const { error: isDeactivateError, loading: isDeactivateLoading, isDeactivate } = useSelector(state => state.sellerDeactivateAccount);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/seller/login")
        }
        if (isDeletedError || isDeactivateError) {
            isDeletedError ? enqueueSnackbar(isDeletedError, { variant: "error" }) : enqueueSnackbar(isDeactivateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted || isDeactivate) {
            enqueueSnackbar(`Your account is ${isDeactivate ? "deactivate" : "delete"} Successfully`, { variant: "success" });
            isDeactivate ? dispatch({ type: DEACTIVATE_SELLER_RESET }) : dispatch({ type: DELETE_SELLER_RESET });
        }
    }, [isAuthenticated, navigate, dispatch, isDeactivate, isDeletedError, isDeactivateError, isDeleted, enqueueSnackbar]);

    const openPopup = (type) => {
        setActionType(type);
        setShowPopup(true);
    };

    const confirmAction = () => {
        setShowPopup(false);
        if (actionType === "Delete") {
            dispatch(deleteSeller(seller.email));
        } else if (actionType === "Deactivate") {
            dispatch(deactivateSeller(seller.email));
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setActionType('');
    };

    const getLastName = () => {
        const nameArray = seller.name.split(" ");
        return nameArray[nameArray.length - 1];
    }

    return (
        <>
                <MetaData title="My Profile" />

                {loading ? <Loader /> :
                    <>
                        {(payloadSellerData.onBoarding[5] !== 1) && <SellerOnBoarding steps={payloadSellerData.onBoarding} />}
                        {(isDeactivateLoading || isDeletedLoading) ? <BackdropLoader /> : null}
                        <main className="w-full mt-12 sm:mt-24">
                            <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                                <Sidebar activeTab={"profile"} />
                                <div className="flex-1 overflow-hidden shadow bg-white">
                                    <div className="flex flex-col gap-12 m-4 sm:mx-8 sm:my-6">
                                        <div className="flex flex-col gap-5 items-start">
                                            <span className="font-medium text-lg">Personal Information <Link to="/seller/dashboard/update" className="text-sm text-primary-blue font-medium ml-8 cursor-pointer">Edit</Link></span>

                                            <div className="flex flex-col sm:flex-row items-center gap-3" id="personalInputs">
                                                <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100 focus-within:border-primary-blue">
                                                    <label className="text-xs text-gray-500">First Name</label>
                                                    <input type="text" value={seller.name.split(" ", 1)} className="text-sm outline-none border-none cursor-not-allowed text-gray-500" disabled />
                                                </div>
                                                <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100 focus-within:border-primary-blue">
                                                    <label className="text-xs text-gray-500">Last Name</label>
                                                    <input type="text" value={getLastName()} className="text-sm outline-none border-none cursor-not-allowed text-gray-500" disabled />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h2 className="text-sm">Your Gender</h2>
                                                <div className="flex items-center gap-8" id="radioInput">
                                                    <div className="flex items-center gap-4 inputs text-gray-500 cursor-not-allowed">
                                                        <input type="radio" name="gender" checked={seller.gender === "male"} id="male" className="h-4 w-4 cursor-not-allowed" disabled />
                                                        <label htmlFor="male" className="cursor-not-allowed">Male</label>
                                                    </div>
                                                    <div className="flex items-center gap-4 inputs text-gray-500 cursor-not-allowed">
                                                        <input type="radio" name="gender" checked={seller.gender === "female"} id="female" className="h-4 w-4 cursor-not-allowed" disabled />
                                                        <label htmlFor="female" className="cursor-not-allowed">Female</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col sm:flex-row items-center gap-3'>
                                            <div className="flex flex-col gap-5 items-start">
                                                <span className="font-medium text-lg"> Email Address </span>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                                                        <label className="text-xs text-gray-500">Email Address</label>
                                                        <input type="email" value={seller.email} className="text-sm outline-none border-none cursor-not-allowed text-gray-500" disabled />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-5 items-start">
                                                <span className="font-medium text-lg">Mobile Number
                                                </span>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                                                        <label className="text-xs text-gray-500">Mobile Number</label>
                                                        <input type="tel" value={payloadSellerData.mobileNumber} className="text-sm outline-none border-none text-gray-500 cursor-not-allowed" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4 mt-4">
                                            <span className="font-medium text-lg mb-2">FAQS</span>
                                            <h4 className="text-sm font-medium">What happens when I update my email address (or mobile number)?</h4>
                                            <p className="text-sm">Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
                                            <h4 className="text-sm font-medium">When will my RedCart24X7 account be updated with the new email address (or mobile number)?</h4>
                                            <p className="text-sm">It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
                                            <h4 className="text-sm font-medium">What happens to my existing RedCart24X7 account when I update my email address (or mobile number)?</h4>
                                            <p className="text-sm">Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
                                            <h4 className="text-sm font-medium">Does my Seller account get affected when I update my email address?</h4>
                                            <p className="text-sm">RedCart24X7 has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
                                        </div>
                                        <div className="flex flex-row justify-start gap-x-8 py-2">
                                            <button
                                                className="text-red-600 font-medium hover:underline"
                                                onClick={() => openPopup('Deactivate')}
                                            >
                                                Deactivate your account
                                            </button>
                                            <button
                                                className="text-red-600 font-medium hover:underline"
                                                onClick={() => openPopup('Delete')}
                                            >
                                                Permanently delete account
                                            </button>
                                        </div>
                                    </div>
                                    {showPopup && (
                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                            <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
                                                <h2 className="text-lg font-semibold text-red-600 mb-3">
                                                    Confirm {actionType}
                                                </h2>
                                                <p className="mb-4">
                                                    Are you sure you want to {actionType.toLowerCase()} your account?
                                                </p>
                                                <div className="flex justify-center gap-4">
                                                    <button
                                                        onClick={closePopup}
                                                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={confirmAction}
                                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <img draggable="false" className="w-full object-contain" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/myProfileFooter_4e9fe2.png" alt="footer" />
                                </div>
                            </div>
                        </main>
                    </>
                }
        </>
    );
};

export default Dashboard