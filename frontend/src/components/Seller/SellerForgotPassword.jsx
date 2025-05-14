import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/SellerAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import Logo from '../../assets/images/logo.png';

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { error, message, loading } = useSelector((state) => state.forgotPasswordSeller);

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("email", email);
        dispatch(forgotPassword(formData));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (message) {
            enqueueSnackbar(message, { variant: "success" });
        }
    }, [dispatch, error, message, enqueueSnackbar]);


    return (
        <>
            <MetaData title="Seller Forgot Password" />

            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">
                <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 py-12 text-center text-white">
                    <img src={Logo} alt="Forge Logo" className="mx-auto mb-4 w-28 h-auto" />
                    <h1 className="text-4xl font-bold">Forgot Your Password?</h1>
                    <p className="mt-2 text-lg">
                        Don’t worry — it happens to the best of us! Enter your registered email address, and we’ll send you a secure link to reset your password.
                    </p>
                    <p className="mt-1 text-sm text-blue-100">
                        Keep your account safe by choosing a strong and memorable password.
                    </p>
                    <div className="mt-6 space-x-4">
                    </div>
                </div>

                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-2xl rounded-2xl overflow-hidden">

                    <div className="loginSidebar bg-red-600 p-10 pr-12 hidden sm:flex flex-col justify-center gap-6 w-2/5">
                        <h1 className="font-extrabold text-white text-4xl">Welcome Back, Seller!</h1>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Forgot Password</h2>

                        <div className="text-center py-10 px-4 sm:px-14">

                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col w-full gap-4">

                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <div className="flex flex-col gap-2.5 mt-2 mb-32">
                                        <p className="text-xs text-gray-500 text-left">
                                            By continuing, you agree to RedCart24X7's
                                            <a href="https://www.RedCart24X7.com/pages/terms" className="text-red-600 font-semibold ml-1">Terms of Use</a> and
                                            <a href="https://www.RedCart24X7.com/pages/privacypolicy" className="text-red-600 font-semibold ml-1">Privacy Policy.</a>
                                        </p>
                                        <button type="submit" className="text-white py-3 w-full bg-red-600 shadow hover:shadow-lg rounded-sm font-medium">Submit</button>
                                    </div>
                                </div>
                            </form>
                            <div className="mt-4">
                                <Link to="/seller/register" className="text-sm text-gray-600">
                                    New to RedCart24X7? <span className="text-red-600 font-semibold hover:underline">Create an seller account</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
};

export default ForgotPassword