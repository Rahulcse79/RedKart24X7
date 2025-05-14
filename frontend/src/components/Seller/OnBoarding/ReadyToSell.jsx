import React from 'react';
import { useSnackbar } from 'notistack';
import MetaData from '../../Layouts/MetaData';
import Loader from '../../Layouts/Loader';
import SellerOnBoarding from '../SellerOnBoarding';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Congratulations from '../../../assets/images/congratulations.jpeg';

const ReadyToSell = () => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { loading, payloadSellerData } = useSelector(state => state.seller);

    const handleSubmit = (e) => {
        e.preventDefault();
        enqueueSnackbar("Verification request sent successfully!", { variant: "success" });
    };

    return (
        <>
            <MetaData title="Ready To Sell" />
            {loading ? <Loader /> :
                <>
                    <SellerOnBoarding steps={payloadSellerData.onBoarding} />
                    <main className="w-full mt-12 sm:mt-0">
                        <form onSubmit={handleSubmit} className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7 relative">
                            <div className="flex-1 overflow-hidden shadow bg-white">
                                <div className="flex flex-col gap-5 m-4 sm:mx-8 sm:my-6 bg-cover bg-center p-8" style={{ backgroundImage: `url(${Congratulations})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    <div className="absolute inset-0 bg-black opacity-50"></div>
                                    <div className="relative z-10 text-white text-center">
                                        <h2 className="text-3xl font-semibold text-gray-100 mb-4">Congratulations!</h2>
                                        <h3 className="text-lg font-medium mb-6">You're just one step away from starting your selling journey!</h3>
                                        <p className="text-sm mb-4">At this stage, you’ve completed all the necessary steps, and your account is now ready for business. We’re excited to help you make the most of our platform, providing tools and resources that will allow you to manage your products, track orders, and grow your business with ease.</p>
                                        <p className="text-sm mb-6">If you have any questions or need assistance, our support team is always available to help you succeed.</p>
                                        <div className="flex justify-center gap-6">
                                            <button
                                                type="submit"
                                                onClick={() => navigate("/seller/dashboard")}
                                                className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-md shadow-md font-medium"
                                            >
                                                Go to Dashboard
                                            </button>

                                        </div>
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

export default ReadyToSell;
