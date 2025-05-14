import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../actions/SellerAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import Logo from '../../assets/images/logo.png';

const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { error, success, loading } = useSelector((state) => state.forgotPasswordSeller);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword.length < 8) {
            enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
            return;
        }
        if (newPassword !== confirmPassword) {
            enqueueSnackbar("Password Doesn't Match", { variant: "error" });
            return;
        }
        const formData = new FormData();
        formData.set("password", newPassword);
        formData.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(params.token, formData));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Password Updated Successfully", { variant: "success" });
            navigate("/login")
        }
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Seller Password Reset | Shop200" />

            {loading && <BackdropLoader />}
            <main class="w-full mt-12 sm:pt-20 sm:mt-0">
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
                    <div class="flex-1 overflow-hidden">
                        <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Reset Password</h2>
                        <div class="text-center py-10 px-4 sm:px-14">
                            <form onSubmit={handleSubmit}>
                                <div class="flex flex-col w-full gap-4">
                                    <TextField
                                        fullWidth
                                        label="New Password"
                                        type="password"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Confirm New Password"
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <div class="flex flex-col gap-3 mt-4 mb-20">
                                        <p className="text-xs text-gray-500 text-left">
                                            By continuing, you agree to Shop200's
                                            <a href="https://www.Shop200.com/pages/terms" className="text-red-600 font-semibold ml-1">Terms of Use</a> and
                                            <a href="https://www.Shop200.com/pages/privacypolicy" className="text-red-600 font-semibold ml-1">Privacy Policy.</a>
                                        </p>
                                        <button type="submit" class="text-white py-3 w-full bg-red-600 shadow-md hover:bg-red-700 rounded-md font-medium transition-all">Submit</button>
                                    </div>
                                </div>
                            </form>
                            <div className="mt-4">
                                <Link to="/seller/register" className="text-sm text-gray-600">
                                    New to Shop200? <span className="text-red-600 font-semibold hover:underline">Create an seller account</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div >
            </main >
        </>
    );
};

export default ResetPassword;
