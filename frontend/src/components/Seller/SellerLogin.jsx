import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginSeller } from '../../actions/SellerAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import Logo from '../../assets/images/logo.png';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const { loading, isAuthenticated, error } = useSelector((state) => state.seller);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginSeller(email, password));
    }

    const redirect = location.search ? location.search.split("=")[1] : "seller/dashboard";

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(`/${redirect}`)
        }
    }, [dispatch, error, isAuthenticated, redirect, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Seller Login | RedCart24X7" />

            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">

                <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 py-12 text-center text-white">
                    <img src={Logo} alt="RedCart24X7 Logo" className="mx-auto mb-4 w-28 h-auto" />
                    <h1 className="text-4xl font-bold">Sell Online with RedCart24X7</h1>
                    <p className="mt-2 text-lg">Reach thousands of customers and grow your business effortlessly!</p>
                    <div className="mt-6 space-x-4">
                    </div>
                </div>

                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-2xl rounded-2xl overflow-hidden">

                    {/* Sidebar */}
                    <div className="loginSidebar bg-red-600 p-10 pr-12 hidden sm:flex flex-col justify-center gap-6 w-2/5">
                        <h1 className="font-extrabold text-white text-4xl">Welcome Back, Seller!</h1>
                    </div>

                    {/* Login Form */}
                    <div className="flex-1 overflow-hidden bg-white">

                        <div className="text-center py-10 px-4 sm:px-14">

                            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Seller login to Your Account</h2>

                            <form onSubmit={handleLogin}>
                                <div className="flex flex-col w-full gap-4">

                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                    <div className="flex flex-col gap-3 mt-4 mb-20">
                                        <p className="text-xs text-gray-500 text-left">
                                            By continuing, you agree to RedCart24X7's
                                            <a href="https://www.RedCart24X7.com/pages/terms" className="text-red-600 font-semibold ml-1">Terms of Use</a> and
                                            <a href="https://www.RedCart24X7.com/pages/privacypolicy" className="text-red-600 font-semibold ml-1">Privacy Policy.</a>
                                        </p>
                                        <button
                                            type="submit"
                                            className="text-white py-3 w-full bg-red-600 shadow-md hover:bg-red-700 rounded-md font-medium transition-all"
                                        >
                                            Login
                                        </button>

                                        <Link
                                            to="/seller/otp/based/login"
                                            className="text-white py-3 w-full bg-red-500 shadow-md hover:bg-red-600 rounded-md text-center font-medium transition-all"
                                        >
                                            OTP-based Login
                                        </Link>

                                        <Link
                                            to="/seller/forgot"
                                            className="text-red-600 text-sm font-medium hover:underline text-center"
                                        >
                                            Forgot Password?
                                        </Link>
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

export default Login;
