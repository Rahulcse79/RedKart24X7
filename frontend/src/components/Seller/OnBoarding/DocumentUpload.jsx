import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import MetaData from '../../Layouts/MetaData';
import Loader from '../../Layouts/Loader';
import SellerOnBoarding from '../SellerOnBoarding';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DocumentUpload = () => {
    
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [logoFile, setLogoFile] = useState(null);
    const [DOB, setDOB] = useState(null);
    const [aadharFile, setAadharFile] = useState(null);
    const [previewAadhar, setPreviewAadhar] = useState(null);
    const [panFile, setPanFile] = useState(null);
    const [previewPan, setPreviewPan] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [previewPhoto, setPreviewPhoto] = useState(null);
    const [aadharNumber, setAadharNumber] = useState('');
    const [panNumber, setPanNumber] = useState('');
    const { loading, payloadSellerData } = useSelector(state => state.seller);

    const handleFileChange = (e, setter, previewSetter) => {
        const file = e.target.files[0];
        setter(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => previewSetter(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Form submitted with:", {
            aadharNumber,
            panNumber,
            logoFile,
            aadharFile,
            panFile,
            photoFile,
            DOB
        });
        enqueueSnackbar("Form submitted successfully!", { variant: "success" });
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
            <MetaData title="Documents upload" />
            {loading ? <Loader /> :
                <>
                    <SellerOnBoarding steps={payloadSellerData.onBoarding} />
                    <main className="w-full mt-12 sm:mt-0">
                        <form onSubmit={handleSubmit} className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                            <div className="flex-1 overflow-hidden shadow bg-white">
                                <div className="flex flex-col gap-5 m-4 sm:mx-8 sm:my-6">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-semibold text-gray-800">Onboarding Step 4: Documents upload</h2>
                                        {getStatus(3)}
                                    </div>

                                    <div className="flex gap-5 flex-col sm:flex-row">
                                        <InputField
                                            label="Aadhar number"
                                            value={aadharNumber}
                                            setValue={setAadharNumber}
                                            type="number"
                                            required
                                        />

                                        <InputField
                                            label="Date of birth"
                                            value={DOB}
                                            setValue={setDOB}
                                            type="date"
                                            required
                                        />
                                    </div>

                                    <InputField
                                        label="PAN Number"
                                        value={panNumber}
                                        setValue={setPanNumber}
                                        type="text"
                                        required
                                    />
                                    
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:gap-[50px] gap-5">
                                        <div className="flex flex-col gap-2 w-full sm:w-1/2">
                                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                                Upload Aadhar card photo <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                accept=".png,.jpg,.jpeg"
                                                onChange={(e) => handleFileChange(e, setAadharFile, setPreviewAadhar)}
                                                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700"
                                                required
                                            />
                                            {previewAadhar && (
                                                <img
                                                    src={previewAadhar}
                                                    alt="Aadhar Preview"
                                                    className="w-32 h-32 object-contain border mt-2"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* PAN Card Upload */}
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:gap-[50px] gap-5">
                                        <div className="flex flex-col gap-2 w-full sm:w-1/2">
                                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                                Upload PAN card photo <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                accept=".png,.jpg,.jpeg"
                                                onChange={(e) => handleFileChange(e, setPanFile, setPreviewPan)}
                                                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700"
                                                required
                                            />
                                            {previewPan && (
                                                <img
                                                    src={previewPan}
                                                    alt="PAN Preview"
                                                    className="w-32 h-32 object-contain border mt-2"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Photo Upload */}
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:gap-[50px] gap-5">
                                        <div className="flex flex-col gap-2 w-full sm:w-1/2">
                                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                                Upload Profile photo <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                accept=".png,.jpg,.jpeg"
                                                onChange={(e) => handleFileChange(e, setPhotoFile, setPreviewPhoto)}
                                                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700"
                                                required
                                            />
                                            {previewPhoto && (
                                                <img
                                                    src={previewPhoto}
                                                    alt="Photo Preview"
                                                    className="w-32 h-32 object-contain border mt-2"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-center sm:gap-6 gap-3 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => navigate("/seller/business-info")}
                                            className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-8 rounded-md shadow-md font-medium"
                                        >
                                            Prev
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-md shadow-md font-medium"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => navigate("/seller/verification")}
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

const InputField = ({ label, value, setValue, type = "text", required = false }) => (
    <div className="w-full">
        <label className="block text-sm font-medium text-gray-600 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
            placeholder={`Enter ${label.toLowerCase()}`}
            required={required}
        />
    </div>
);

export default DocumentUpload;
