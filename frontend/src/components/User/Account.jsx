import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';
import { useSnackbar } from 'notistack';
import { deactivateUser, deleteRequestUser, clearErrors } from '../../actions/userAction';
import { DELETE_REQUEST_USER_REQUEST_RESET, DEACTIVATE_REQUEST_USER__RESET } from "../../constants/userConstants";
import BackdropLoader from '../Layouts/BackdropLoader';

const Account = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [showPopup, setShowPopup] = useState(false);
    const [actionType, setActionType] = useState('');

    const { user, loading, isAuthenticated } = useSelector(state => state.user)
    const { error: isDeletedError, loading: isDeletedLoading, isDeleted } = useSelector(state => state.deleteRequestUser);
    const { error: isDeactivateError, loading: isDeactivateLoading, isDeactivate } = useSelector(state => state.deactivateUser);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login")
        }
        if (isDeletedError || isDeactivateError) {
            isDeletedError ? enqueueSnackbar(isDeletedError, { variant: "error" }) : enqueueSnackbar(isDeactivateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted || isDeactivate) {
            enqueueSnackbar(`Your account is ${isDeactivate ? "deactivate" : "delete"} Successfully`, { variant: "success" });
            isDeactivate ? dispatch({ type: DEACTIVATE_REQUEST_USER__RESET }) : dispatch({ type: DELETE_REQUEST_USER_REQUEST_RESET });
        }
    }, [isAuthenticated, navigate, dispatch, isDeactivate, isDeletedError, isDeactivateError, isDeleted, enqueueSnackbar]);

    const getLastName = () => {
        const nameArray = user.name.split(" ");
        return nameArray[nameArray.length - 1];
    }

    const openPopup = (type) => {
        setActionType(type);
        setShowPopup(true);
    };

    const confirmAction = () => {
        setShowPopup(false);
        if (actionType === "Delete") {
            dispatch(deleteRequestUser());
        } else if (actionType === "Deactivate") {
            dispatch(deactivateUser());
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setActionType('');
    };

    return (
        <>
            <MetaData title="My Profile" />

            {loading ? <Loader /> :
                <>
                    <MinCategory />
                    {(isDeactivateLoading || isDeletedLoading) ? <BackdropLoader /> : null}
                    <main className="w-full mt-12 sm:mt-0">
                        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">

                            <Sidebar activeTab={"profile"} />
                            <div className="flex-1 overflow-hidden shadow bg-white">
                                <div className="flex flex-col gap-12 m-4 sm:mx-8 sm:my-6">
                                    <div className="flex flex-col gap-5 items-start">
                                        <span className="font-medium text-lg">Personal Information <Link to="/account/update" className="text-sm text-primary-blue font-medium ml-8 cursor-pointer">Edit</Link></span>

                                        <div className="flex flex-col sm:flex-row items-center gap-3" id="personalInputs">
                                            <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100 focus-within:border-primary-blue">
                                                <label className="text-xs text-gray-500">First Name</label>
                                                <input type="text" value={user.name.split(" ", 1)} className="text-sm outline-none border-none cursor-not-allowed text-gray-500" disabled />
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
                                                    <input type="radio" name="gender" checked={user.gender === "male"} id="male" className="h-4 w-4 cursor-not-allowed" disabled />
                                                    <label htmlFor="male" className="cursor-not-allowed">Male</label>
                                                </div>
                                                <div className="flex items-center gap-4 inputs text-gray-500 cursor-not-allowed">
                                                    <input type="radio" name="gender" checked={user.gender === "female"} id="female" className="h-4 w-4 cursor-not-allowed" disabled />
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
                                                    <input type="email" value={user.email} className="text-sm outline-none border-none cursor-not-allowed text-gray-500" disabled />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-5 items-start">
                                            <span className="font-medium text-lg">Mobile Number
                                            </span>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                                                    <label className="text-xs text-gray-500">Mobile Number</label>
                                                    <input type="tel" value={user.phone} className="text-sm outline-none border-none text-gray-500 cursor-not-allowed" disabled />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4 mt-4">
                                        <span className="font-medium text-lg mb-2">FAQs</span>
                                        <h4 className="text-sm font-medium">What happens when I update my email address or mobile number?</h4>
                                        <p className="text-sm">
                                            Your login email or mobile number will be updated. From then on, you’ll receive all account-related communication on the new email or number you provide.
                                        </p>
                                        <h4 className="text-sm font-medium">When will my RedKart24X7 account reflect the updated email or mobile number?</h4>
                                        <p className="text-sm">
                                            As soon as you verify the code sent to your updated contact details and save the changes, your account will be updated immediately.
                                        </p>
                                        <h4 className="text-sm font-medium">Will updating my email or mobile affect my existing RedKart24X7 account?</h4>
                                        <p className="text-sm">
                                            No, your account remains fully active. You'll still have access to your order history, saved addresses, and personal details.
                                        </p>
                                        <h4 className="text-sm font-medium">Will my user account be affected if I update my email address?</h4>
                                        <p className="text-sm">
                                            RedKart24X7 uses a single sign-on system, so any updates you make will automatically apply across your entire user account.
                                        </p>
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

export default Account;
