import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MetaData from '../../Layouts/MetaData';
import Loader from '../../Layouts/Loader';
import SellerOnBoarding from '../SellerOnBoarding';
import { useSelector, useDispatch } from 'react-redux';
import BackdropLoader from '../../Layouts/BackdropLoader';
import { CreateStoreSetupAction, clearErrors } from '../../../actions/storeAction';
import { CREATE_STORE_SETUP_RESET } from "../../../constants/storeConstants";
import { useSnackbar } from 'notistack';

const CreateStore = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [storeName, setStoreName] = useState('');
    const [email, setEmail] = useState('');
    const [storeNumber, setStoreNumber] = useState('');
    const [logoFile, setLogoFile] = useState(null);
    const [previewLogo, setPreviewLogo] = useState(null);
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [country, setCountry] = useState('');
    const [businessReg, setBusinessReg] = useState('');
    const [taxId, setTaxId] = useState('');
    const [GSTNumber, setGSTNumber] = useState('');
    const [storeDescription, setStoreDescription] = useState('');
    const { loading: sellerLoading, payloadSellerData } = useSelector(state => state.seller);
    const { error, loading: createLoading, isCreated } = useSelector(state => state.sellerCreateStore);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setLogoFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewLogo(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const isValidPhoneNumber = (number) => {
        return /^[0-9]{10}$/.test(number);
    };

    const isValidIndianPincode = (pincode) => {
        return /^[1-9][0-9]{5}$/.test(pincode);
    };

    const hasMinWords = (text, minWords = 100) => {
        const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
        return wordCount <= minWords;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidPhoneNumber(storeNumber)) {
            enqueueSnackbar("Please enter a valid 10 digit phone number.", { variant: "error" });
            return;
        }

        if (!isValidIndianPincode(pincode)) {
            enqueueSnackbar("Please enter a valid India pincode.", { variant: "error" });
            return;
        }

        if (!hasMinWords(storeDescription, 100)) {
            enqueueSnackbar("Store Description must be at most 100 words.", { variant: "error" });
            return;
        }

        if (!storeName || !storeNumber || !address || !country || !storeDescription) {
            enqueueSnackbar("Please fill all the required fields.", { variant: "error" });
            return;
        }

        const formData = new FormData();
        formData.set("storeName", storeName);
        formData.set("email", payloadSellerData.email);
        formData.set("storeNumber", storeNumber);
        formData.set("address", address);
        formData.set("pincode", pincode);
        formData.set("country", country);
        formData.set("businessReg", businessReg);
        formData.set("taxId", taxId);
        formData.set("GSTNumber", GSTNumber);
        formData.set("storeDescription", storeDescription);
        if (logoFile) {
            formData.append("logo", previewLogo);
        }

        dispatch(CreateStoreSetupAction(formData))
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

    useEffect(() => {
        setStoreName(payloadSellerData.storeName || '')
        setEmail(payloadSellerData.email || '');
        setStoreNumber(payloadSellerData.storeNumber || '');
        setAddress(payloadSellerData.address || '');
        setPincode(payloadSellerData.pincode || '');
        setCountry(payloadSellerData.country || '');
        setBusinessReg(payloadSellerData.businessReg || '');
        setTaxId(payloadSellerData.taxId || '');
        setGSTNumber(payloadSellerData.GSTNumber || '');
        setStoreDescription(payloadSellerData.storeDescription || '');
        const tempLogo = payloadSellerData.logo?.[0]?.url || '';
        if (tempLogo) {
            setPreviewLogo(tempLogo);
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isCreated) {
            enqueueSnackbar("Create store Updated or created Successfully", { variant: "success" });
            dispatch({ type: CREATE_STORE_SETUP_RESET });
        }
    }, [dispatch, error, isCreated, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Create store" />

            {sellerLoading ? <Loader /> :
                <>
                    <SellerOnBoarding steps={payloadSellerData.onBoarding} />
                    {(createLoading) ? <BackdropLoader /> : null}
                    <main className="w-full mt-12 sm:mt-0">
                        <form onSubmit={handleSubmit} className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                            <div className="flex-1 overflow-hidden shadow bg-white">
                                <div className="flex flex-col gap-5 m-4 sm:mx-8 sm:my-6">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-semibold text-gray-800">Onboarding Step 1: Create store</h2>
                                        {getStatus(0)}
                                    </div>
                                    <div className="flex gap-5 flex-col sm:flex-row">
                                        <InputField
                                            label="Store Name"
                                            value={storeName}
                                            setValue={setStoreName}
                                            required
                                        />
                                        <InputField
                                            label="Email"
                                            value={email}
                                            setValue={setEmail}
                                            type="email"
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Store Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            label="Store Description"
                                            value={storeDescription}
                                            onChange={(e) => setStoreDescription(e.target.value)}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
                                            type="text"
                                            required
                                        ></textarea>
                                        <p
                                            className={`text-sm mt-1 ${storeDescription.trim().split(/\s+/).filter(Boolean).length < 100
                                                ? "text-green-500"
                                                : "text-red-600"
                                                }`}
                                        >
                                            Word Count: {storeDescription.trim().split(/\s+/).filter(Boolean).length}/100
                                        </p>

                                    </div>
                                    <div className="flex gap-5 flex-col sm:flex-row">
                                        <InputField
                                            label="Contact Number"
                                            value={storeNumber}
                                            setValue={setStoreNumber}
                                            type="number"
                                            required
                                        />
                                        <InputField
                                            label="Address"
                                            value={address}
                                            setValue={setAddress}
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-5 flex-col sm:flex-row">
                                        <InputField
                                            label="Pincode"
                                            value={pincode}
                                            setValue={setPincode}
                                            type="number"
                                            required
                                        />
                                        <InputField
                                            label="Country"
                                            value={country}
                                            setValue={setCountry}
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-5 flex-col sm:flex-row">
                                        <InputField
                                            label="Business Registration No."
                                            value={businessReg}
                                            setValue={setBusinessReg}
                                        />
                                        <InputField
                                            label="Tax ID"
                                            value={taxId}
                                            setValue={setTaxId}
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-start sm:gap-[22px]">
                                        {/* Upload Logo Section */}
                                        <div className="flex flex-col gap-2 w-full sm:w-1/2">
                                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                                Upload Store Image <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                accept=".png,.jpg,.jpeg"
                                                onChange={handleLogoChange}
                                                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700"
                                            />
                                            {previewLogo && (
                                                <img
                                                    src={previewLogo}
                                                    alt="Preview"
                                                    className="w-32 h-32 object-contain border mt-2"
                                                />
                                            )}
                                        </div>

                                        {/* GST Number Input */}
                                        <div className="w-full sm:w-1/2">
                                            <InputField
                                                label="GST No."
                                                value={GSTNumber}
                                                setValue={setGSTNumber}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-center sm:gap-6 gap-3 mt-4">
                                        <button
                                            type="submit"
                                            className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-md shadow-md font-medium"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => navigate("/seller/bank-account")}
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

const InputField = ({
    label,
    value,
    setValue,
    type = "text",
    required = false,
    disabled = false,
}) => (
    <div className="w-full">
        <label className="block text-sm font-medium text-gray-600 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder={`Enter ${label.toLowerCase()}`}
            required={required}
            disabled={disabled}
        />
    </div>
);


export default CreateStore;
