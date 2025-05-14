import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerSeller } from '../../actions/SellerAction';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import Logo from '../../assets/images/logo.png';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, isAuthenticated, error } = useSelector((state) => state.seller);

    const [seller, setSeller] = useState({
        name: "",
        email: "",
        gender: "",
        password: "",
        cpassword: "",
    });

    const { name, email, gender, password, cpassword } = seller;

    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("preview.png");

    const handleRegister = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
            return;
        }
        if (password !== cpassword) {
            enqueueSnackbar("Password Doesn't Match", { variant: "error" });
            return;
        }
        if (!avatar) {
            enqueueSnackbar("Select Avatar", { variant: "error" });
            return;
        }

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("gender", gender);
        formData.set("password", password);
        formData.set("avatar", avatar);

        dispatch(registerSeller(formData));
    }

    const handleDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);

        } else {
            setSeller({ ...seller, [e.target.name]: e.target.value });
        }
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/seller/dashboard')
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Seller Register | Shop200" />

            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">

                <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 py-12 text-center text-white">
                    <img src={Logo} alt="Shop200 Logo" className="mx-auto mb-4 w-28 h-auto" />
                    <h1 className="text-4xl font-bold">Join Shop200 as a Seller</h1>
                    <p className="mt-2 text-lg">
                        Start your online store today and showcase your products to a wide audience across the country.
                        Simple setup, secure payments, and powerful tools — all in one place.
                    </p>
                    <p className="mt-1 text-sm text-blue-100">
                        Register now and take the first step toward growing your business with Shop200.
                    </p>
                    <div className="mt-6 space-x-4">
                    </div>
                </div>

                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-2xl rounded-2xl overflow-hidden">
                    <div className="loginSidebar bg-red-600 p-10 pr-12 hidden sm:flex flex-col justify-center gap-6 w-2/5">
                        <h1 className="font-extrabold text-white text-4xl">Start Your Selling Journey Today!</h1>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <form
                            onSubmit={handleRegister}
                            encType="multipart/form-data"
                            className="p-5 sm:p-10"
                        >
                            <div className="flex flex-col gap-4 items-start">
                                <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                                    <TextField
                                        fullWidth
                                        id="full-name"
                                        label="Full Name"
                                        name="name"
                                        value={name}
                                        onChange={handleDataChange}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={handleDataChange}
                                        required
                                    />
                                </div>
                                {/* <!-- input container column --> */}

                                {/* <!-- gender input --> */}
                                <div className="flex gap-4 items-center">
                                    <h2 className="text-md">Your Gender :</h2>
                                    <div className="flex items-center gap-6" id="radioInput">
                                        <RadioGroup
                                            row
                                            aria-labelledby="radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel name="gender" value="male" onChange={handleDataChange} control={<Radio required />} label="Male" />
                                            <FormControlLabel name="gender" value="female" onChange={handleDataChange} control={<Radio required />} label="Female" />
                                        </RadioGroup>
                                    </div>
                                </div>
                                {/* <!-- gender input --> */}

                                {/* <!-- input container column --> */}
                                <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                                    <TextField
                                        id="password"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={handleDataChange}
                                        required
                                    />
                                    <TextField
                                        id="confirm-password"
                                        label="Confirm Password"
                                        type="password"
                                        name="cpassword"
                                        value={cpassword}
                                        onChange={handleDataChange}
                                        required
                                    />
                                </div>
                                {/* <!-- input container column --> */}

                                <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                                    <Avatar
                                        alt="Avatar Preview"
                                        src={avatarPreview}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white w-full py-2 px-2.5 shadow hover:shadow-lg">
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleDataChange}
                                            className="hidden"
                                        />
                                        Choose File
                                    </label>
                                </div>
                                <button type="submit" className="text-white py-3 w-full bg-red-600 shadow hover:shadow-lg rounded-sm font-medium">Signup</button>
                                <button onClick={() => navigate('/seller/login')} className="text-white py-3 w-full bg-red-600 shadow hover:shadow-lg rounded-sm font-medium">Existing seller? Log in</button>
                            </div>
                        </form>
                    </div>
                </div>

            </main>
        </>
    );
};

export default Register;
