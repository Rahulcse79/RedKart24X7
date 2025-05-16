import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, OTPSend, OTPloginUser } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';
import { useNavigate, useLocation } from "react-router-dom";

const OTP = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");
    const [OTP, setOTP] = useState("");
    const [timerShow, setTimerShow] = useState(false);
    const [timeLeft, setTimeLeft] = useState(localStorage.getItem('timeLeft') ? parseInt(localStorage.getItem('timeLeft')) : 1);
    const { isAuthenticated } = useSelector((state) => state.user);
    const location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : "account";

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(OTPloginUser(
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
        if (message) {
            enqueueSnackbar(message, { variant: "success" });
        }
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
    }, [dispatch, error, message, enqueueSnackbar, timerShow, timeLeft, isAuthenticated, navigate, redirect]);

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
            <MetaData title="Login by OTP" />

            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">

                {/* <!-- row --> */}
                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">

                    <FormSidebar
                        title="OTP Based login?"
                        tag="Enter the email address associated with your account."
                    />

                    {/* <!-- login column --> */}
                    <div className="flex-1 overflow-hidden">
                        <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">OTP Based login</h2>

                        {/* <!-- edit info container --> */}
                        <div className="text-center py-10 px-4 sm:px-14">

                            {/* <!-- input container --> */}
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

                                    {/* <!-- button container --> */}
                                    <div className="flex flex-col gap-2.5 mt-2 mb-32">
                                        <p className="text-xs text-primary-grey text-left">By continuing, you agree to RedKart24X7's <a href="https://www.RedKart24X7.com/pages/terms" className="text-primary-blue"> Terms of Use</a> and <a href="https://www.RedKart24X7.com/pages/privacypolicy" className="text-primary-blue"> Privacy Policy.</a></p>
                                        <button type="submit" className="text-white py-3 w-full bg-red-600 shadow hover:shadow-lg rounded-sm font-medium">Submit</button>
                                        <button type="button" className="text-white py-3 w-full bg-red-600 shadow hover:shadow-lg rounded-sm font-medium" onClick={()=> navigate("/login")}>Login by Password</button>
                                    </div>
                                    {/* <!-- button container --> */}

                                </div>
                            </form>
                            {/* <!-- input container --> */}

                            <Link to="/register" className="font-medium text-sm text-primary-blue">New to RedKart24X7? Create an account</Link>
                        </div>
                        {/* <!-- edit info container --> */}

                    </div>
                    {/* <!-- login column --> */}
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default OTP