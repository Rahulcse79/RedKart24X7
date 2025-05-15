import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MetaData from '../../Layouts/MetaData';
import Loader from '../../Layouts/Loader';
import SellerOnBoarding from '../SellerOnBoarding';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { BusinessInformationSetupAction, clearErrors } from '../../../actions/storeAction';
import { BUSINESS_INFORMATION_SETUP_RESET } from "../../../constants/storeConstants";
import BackdropLoader from '../../Layouts/BackdropLoader';

const BusinessInfo = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { loading, payloadSellerData } = useSelector(state => state.seller);
    const { error, loading: saveLoading, isCreated } = useSelector(state => state.sellerBusinessInformation);

    useEffect(() => {

        if (payloadSellerData.businessPoints) {
            setBusinessPoints({
                isRegisteredBusiness: true,
                hasValidPAN_GST: true,
                correctAddressProvided: true,
                authorizedRepresentativeAvailable: true,
                documentsAvailable: true,
            });
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isCreated) {
            enqueueSnackbar("Business information Updated or created Successfully", { variant: "success" });
            dispatch({ type: BUSINESS_INFORMATION_SETUP_RESET });
        }
    }, [dispatch, error, isCreated, enqueueSnackbar, payloadSellerData.businessPoints]);


    const [businessPoints, setBusinessPoints] = useState({
        isRegisteredBusiness: false,
        hasValidPAN_GST: false,
        correctAddressProvided: false,
        authorizedRepresentativeAvailable: false,
        documentsAvailable: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const allChecked = Object.values(businessPoints).every(Boolean);
        if (!allChecked) {
            enqueueSnackbar("Please confirm all the business information points.", { variant: "warning" });
            return;
        }

        const formData = new FormData();
        formData.set("email", payloadSellerData.email);
        formData.set("allCheck", allChecked);

        dispatch(BusinessInformationSetupAction(formData))
    };

    const getStatus = (step) => {
        switch (payloadSellerData.onBoarding[step]) {
            case 1:
                return (
                    <span className="text-green-600 font-medium border border-green-600 px-3 py-1 rounded-md text-sm">
                        APPROVED
                    </span>
                );
            case 2:
                return (
                    <span className="text-red-600 font-medium border border-red-600 px-3 py-1 rounded-md text-sm">
                        REJECTED
                    </span>
                );
            case 0:
                return (
                    <span className="text-yellow-600 font-medium border border-yellow-600 px-3 py-1 rounded-md text-sm">
                        STATE OF APPROVAL
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <MetaData title="Business Information" />
            {loading ? <Loader /> :
                <>
                    <SellerOnBoarding steps={payloadSellerData.onBoarding} />
                    {(saveLoading) ? <BackdropLoader /> : null}
                    <main className="w-full mt-12 sm:mt-0">
                        <form onSubmit={handleSubmit} className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                            <div className="flex-1 overflow-hidden shadow bg-white">
                                <div className="flex flex-col gap-5 m-4 sm:mx-8 sm:my-6">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-semibold text-gray-800">Onboarding Step 3: Business Information</h2>
                                        {getStatus(2)}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-lg font-medium">Please confirm the following:</label>

                                        <Checkbox
                                            label="1. My business is officially registered."
                                            checked={businessPoints.isRegisteredBusiness}
                                            onChange={(e) => setBusinessPoints({ ...businessPoints, isRegisteredBusiness: e.target.checked })}
                                        />
                                        <Checkbox
                                            label="2. I have a valid PAN and GST registration."
                                            checked={businessPoints.hasValidPAN_GST}
                                            onChange={(e) => setBusinessPoints({ ...businessPoints, hasValidPAN_GST: e.target.checked })}
                                        />
                                        <Checkbox
                                            label="3. The address provided is accurate and up-to-date."
                                            checked={businessPoints.correctAddressProvided}
                                            onChange={(e) => setBusinessPoints({ ...businessPoints, correctAddressProvided: e.target.checked })}
                                        />
                                        <Checkbox
                                            label="4. I have an authorized representative to manage legal matters."
                                            checked={businessPoints.authorizedRepresentativeAvailable}
                                            onChange={(e) => setBusinessPoints({ ...businessPoints, authorizedRepresentativeAvailable: e.target.checked })}
                                        />
                                        <Checkbox
                                            label="5. All required business documents are available and valid."
                                            checked={businessPoints.documentsAvailable}
                                            onChange={(e) => setBusinessPoints({ ...businessPoints, documentsAvailable: e.target.checked })}
                                        />
                                    </div>


                                    <div className="flex flex-col sm:flex-row justify-center sm:gap-6 gap-3 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => navigate("/seller/bank-account")}
                                            className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-8 rounded-md shadow-md font-medium"
                                        >
                                            prev
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-md shadow-md font-medium"
                                        >
                                            Save
                                        </button>
                                        <button business-info
                                            type="button"
                                            onClick={() => navigate("/seller/upload-documents")}
                                            className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-8 rounded-md shadow-md font-medium"
                                        >
                                            Next
                                        </button>
                                    </div>

                                    <img
                                        draggable="false"
                                        className="w-full object-contain"
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

const Checkbox = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
    </label>
);


export default BusinessInfo;
