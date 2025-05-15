import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { useNavigate, Link } from 'react-router-dom';
import SellerOnBoarding from './SellerOnBoarding';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader';

const SellerEditStoreInfo = () => {

    const navigate = useNavigate();
    const { loading, isAuthenticated, payloadSellerData } = useSelector(state => state.seller);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/seller/login")
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
                <MetaData title="Store Information" />
                {loading ? <Loader /> :
                    <>
                        {(payloadSellerData.onBoarding[5] !== 1) && <SellerOnBoarding steps={payloadSellerData.onBoarding} />}
                        <main className="w-full mt-12 sm:mt-24">
                            <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                                <Sidebar activeTab={"store"} />
                                <div className="flex-1 overflow-hidden shadow bg-white">
                                    <div className="flex flex-col gap-12 m-4 sm:mx-8 sm:my-6">
                                        <div className="flex flex-col gap-5 items-start">
                                            <span className="font-medium text-lg">Store Information <Link className="text-sm text-primary-blue font-medium ml-8 cursor-pointer">Edit</Link></span>
                                        </div>
                                        <div className="flex flex-col gap-5 items-start">
                                            <span className="font-medium text-lg">Bank account Information <Link className="text-sm text-primary-blue font-medium ml-8 cursor-pointer">Edit</Link></span>
                                        </div>
                                        <div className="flex flex-col gap-5 items-start">
                                            <span className="font-medium text-lg">Business Information <Link className="text-sm text-primary-blue font-medium ml-8 cursor-pointer">Edit</Link></span>
                                        </div>
                                        <div className="flex flex-col gap-5 items-start">
                                            <span className="font-medium text-lg">Document upload Information <Link className="text-sm text-primary-blue font-medium ml-8 cursor-pointer">Edit</Link></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </>
                }
        </>
    );
};

export default SellerEditStoreInfo