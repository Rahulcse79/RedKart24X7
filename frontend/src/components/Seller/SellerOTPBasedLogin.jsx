import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, OTPSend, OTPloginSeller } from '../../actions/SellerAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import { useNavigate, useLocation } from "react-router-dom";
import Logo from '../../assets/images/logo.png';

const OTP = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { error, isOTPSent, loading } = useSelector((state) => state.otpSendReducer);

    const [email, setEmail] = useState("");
    const [OTP, setOTP] = useState("");
    const [timerShow, setTimerShow] = useState(false);
    const [timeLeft, setTimeLeft] = useState(localStorage.getItem('timeLeft') ? parseInt(localStorage.getItem('timeLeft')) : 1);
    const { isAuthenticated } = useSelector((state) => state.seller);
    const location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : "seller/dashboard";

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(OTPloginSeller(
            email,
            OTP,
            () => {
                enqueueSnackbar("OTP Verified Successfully!", { variant: "success" });
                setTimeLeft(1);
                navigate("/");
                window.location.reload();
            },
            (errorMessage) => {
                enqueueSnackbar(errorMessage || "OTP Verification Failed!", { variant: "error" });
            }
        ));
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isOTPSent) {
            enqueueSnackbar("OTP send successfully", { variant: "success" });
        }
    }, [dispatch, error, isOTPSent, enqueueSnackbar]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(`/${redirect}`)
        }
        if (timeLeft > 1 && timerShow === false) {
            setTimerShow(true)
        }
        if (!timerShow) return;
        const timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                setTimerShow(false);
            } else {
                setTimeLeft(prevTime => {
                    const newTime = prevTime - 1;
                    localStorage.setItem('timeLeft', newTime);
                    return newTime;
                });
            }
        }, 2000);
        return () => clearInterval(timerInterval);
    }, [timerShow, timeLeft, isAuthenticated, navigate, redirect]);

    const handleSendOTP = (e) => {
        e.preventDefault();
        if (timerShow) {
            alert(`Please wait... Time remaining: ${formatTime(timeLeft)}`);
            return;
        }
        dispatch(OTPSend(
            email,
            () => {
                setTimerShow(true);
                setTimeLeft(() => {
                    const fiveMinutesInSeconds = 2 * 60;
                    localStorage.setItem('timeLeft', fiveMinutesInSeconds);
                    return fiveMinutesInSeconds;
                });

                enqueueSnackbar("OTP sent successfully!", { variant: "success" });
            },
            (errorMessage) => {
                enqueueSnackbar(errorMessage || "Failed to send OTP!", { variant: "error" });
            }
        ));
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
    };

    return (
        <>
            <MetaData title="Seller login by OTP" />

            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">

                <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 py-12 text-center text-white">
                    <img src={Logo} alt="RedKart24X7 Logo" className="mx-auto mb-4 w-28 h-auto" />
                    <h1 className="text-4xl font-bold">Welcome to RedKart24X7 Seller Portal</h1>
                    <p className="mt-2 text-lg">
                        Unlock your business potential — connect with thousands of customers, manage orders with ease,
                        and grow smarter with RedKart24X7.
                    </p>
                    <p className="mt-1 text-sm text-blue-100">
                        Secure OTP login ensures fast and safe access to your seller account.
                    </p>
                    <div className="mt-6 space-x-4">
                    </div>
                </div>

                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-2xl rounded-2xl overflow-hidden">
                    <div className="loginSidebar bg-red-600 p-10 pr-12 hidden sm:flex flex-col justify-center gap-6 w-2/5">
                        <h1 className="font-extrabold text-white text-4xl">Welcome Back, Seller!</h1>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Seller OTP Based login</h2>
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
                                    <button type="button" onClick={handleSendOTP} className="text-white py-3 w-full bg-blue-600 shadow hover:shadow-lg rounded-sm font-medium">Send OTP</button>
                                    <TextField
                                        fullWidth
                                        label="OTP"
                                        type="Number"
                                        value={OTP}
                                        onChange={(e) => setOTP(e.target.value)}
                                        required
                                    />
                                    {timerShow && (
                                        <div
                                            className="timer"
                                            style={{ color: 'red', fontSize: '20px', fontWeight: 'bold', marginTop: '5px' }}
                                        >
                                            {formatTime(timeLeft)}
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-2.5 mt-2 mb-32">
                                        <p className="text-xs text-gray-500 text-left">
                                            By continuing, you agree to RedKart24X7's
                                            <a href="https://www.RedKart24X7.com/pages/terms" className="text-red-600 font-semibold ml-1">Terms of Use</a> and
                                            <a href="https://www.RedKart24X7.com/pages/privacypolicy" className="text-red-600 font-semibold ml-1">Privacy Policy.</a>
                                        </p>
                                        <button type="submit" className="text-white py-3 w-full bg-red-600 shadow hover:shadow-lg rounded-sm font-medium">Submit</button>
                                        <button type="button" className="text-white py-3 w-full bg-red-600 shadow hover:shadow-lg rounded-sm font-medium" onClick={() => navigate("/seller/login")}>Login by Password</button>
                                    </div>
                                </div>
                            </form>
                            <div className="mt-4">
                                <Link to="/seller/register" className="text-sm text-gray-600">
                                    New to RedKart24X7? <span className="text-red-600 font-semibold hover:underline">Create an seller account</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default OTP