import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import MetaData from '../../Layouts/MetaData';
import Loader from '../../Layouts/Loader';
import SellerOnBoarding from '../SellerOnBoarding';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VerificationAction, clearErrors } from '../../../actions/storeAction';
import { VERIFICATION_SETUP_RESET } from "../../../constants/storeConstants";
import BackdropLoader from '../../Layouts/BackdropLoader';

const Verification = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { loading, payloadSellerData } = useSelector(state => state.seller);
    const { error, loading: saveLoading, isCreated } = useSelector(state => state.sellerVerification);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isCreated) {
            enqueueSnackbar("Verification request send Successfully", { variant: "success" });
            dispatch({ type: VERIFICATION_SETUP_RESET });
        }
    }, [dispatch, error, isCreated, enqueueSnackbar]);


    const handleSubmit = (e) => {
        e.preventDefault();
        let VerificationRequest = false;
        if (payloadSellerData.onBoarding[4] === 0 || payloadSellerData.onBoarding[4] === 2) {
            VerificationRequest = true;
        } else {
            enqueueSnackbar("Verification request already received.", { variant: "warning" });
            return;
        }
        const formData = new FormData();
        formData.set("Verification", VerificationRequest);
        formData.set("email", payloadSellerData.email);

        dispatch(VerificationAction(formData))
    };

    const getStatus = (step) => {
        switch (payloadSellerData.onBoarding[step]) {
            case 1:
                return (
                    <span className="text-green-600 font-medium border border-green-600 px-3 py-1 rounded-md text-sm">
                        Verification successful.
                    </span>
                );
            case 2:
                return (
                    <span className="text-red-600 font-medium border border-red-600 px-3 py-1 rounded-md text-sm">
                        Verification rejected.
                    </span>
                );
            case 0:
                return (
                    <span className="text-yellow-600 font-medium border border-yellow-600 px-3 py-1 rounded-md text-sm">
                        Please send verification request.
                    </span>
                );
            case -1:
                return (
                    <span className="text-yellow-600 font-medium border border-yellow-600 px-3 py-1 rounded-md text-sm">
                        Pending verification request.
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <MetaData title="Verification" />
            {loading ? <Loader /> :
                <>
                    <SellerOnBoarding steps={payloadSellerData.onBoarding} />
                    {(saveLoading) ? <BackdropLoader /> : null}
                    <main className="w-full mt-12 sm:mt-0">
                        <form onSubmit={handleSubmit} className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                            <div className="flex-1 overflow-hidden shadow bg-white">
                                <div className="flex flex-col gap-5 m-4 sm:mx-8 sm:my-6">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-semibold text-gray-800">Onboarding Step 5: Verification</h2>
                                    </div>

                                    <div className="mb-6">
                                        <div className="mb-6 flex items-center">
                                            <h3 className="text-xl font-semibold mr-3">Your Status:</h3>
                                            {getStatus(4)}
                                        </div>
                                        {!(payloadSellerData.onBoarding[4] === 1) && (<p className="mt-3 text-red-600">
                                            Please note, if you have already submitted the verification request, it will be processed within 1-3 working days. Thank you for your patience.
                                        </p>)}
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-center sm:gap-6 gap-3 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => navigate("/seller/upload-documents")}
                                            className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-8 rounded-md shadow-md font-medium"
                                        >
                                            Prev
                                        </button>

                                        {(payloadSellerData.onBoarding[4] === 2 || payloadSellerData.onBoarding[4] === 0) && (
                                            <button
                                                type="submit"
                                                className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-md shadow-md font-medium"
                                            >
                                                Send Verification Request
                                            </button>
                                        )}

                                        {(payloadSellerData.onBoarding[4] === 1) && (<button
                                            type="button"
                                            onClick={() => navigate("/seller/ready-to-sell")}
                                            className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-8 rounded-md shadow-md font-medium"
                                        >
                                            Next
                                        </button>)}
                                    </div>

                                    <img
                                        draggable="false"
                                        className="w-full object-contain mt-6"
                                        src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/myProfileFooter_4e9fe2.png"
                                        alt="footer"
                                    />
                                </div>
                            </div>
                        </form>
                    </main>
                </>
            }
        </>
    );
};

export default Verification;
