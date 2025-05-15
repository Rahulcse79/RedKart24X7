import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { logoutSeller } from '../../../actions/SellerAction';

const SellerPrimaryDropDownMenu = ({ setTogglePrimaryDropDown, seller }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleLogout = () => {
        dispatch(logoutSeller());
        navigate("/seller/login");
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        setTogglePrimaryDropDown(false);
    }

    const navs = [
        {
            title: "Product dashboard",
            icon: <DashboardIcon sx={{ fontSize: "18px" }} />,
            redirect: "/seller/d2/dashboard",
        },
        {
            title: "My Chats",
            icon: <ChatIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
        {
            title: "Gift Cards",
            icon: <CardGiftcardIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
        {
            title: "Notifications",
            icon: <NotificationsIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
    ]

    return (
        <div className="absolute w-60 -left-24 ml-2 top-9 bg-white shadow-2xl rounded flex-col text-sm">

            {seller.role === "admin" &&
                <Link className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t" to="/seller/admin/dashboard">
                    <span className="text-primary-blue"><DashboardIcon sx={{ fontSize: "18px" }} /></span>
                    Admin Dashboard
                </Link>
            }

            <Link className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t" to="/seller/dashboard">
                <span className="text-primary-blue"><AccountCircleIcon sx={{ fontSize: "18px" }} /></span>
                My Profile
            </Link>

            {navs.map((item, i) => {
                const { title, icon, redirect } = item;
                return (
                    <>
                        <Link className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50" to={redirect} key={i}>
                            <span className="text-primary-blue">{icon}</span>
                            {title}
                        </Link>
                    </>
                )
            })}

            <div className="pl-3 py-3.5 flex gap-3 items-center hover:bg-gray-50 rounded-b cursor-pointer" onClick={handleLogout} >
                <span className="text-primary-blue"><PowerSettingsNewIcon sx={{ fontSize: "18px" }} /></span>
                Logout
            </div>

            <div className="absolute right-1/2 -top-2.5">
                <div className="arrow_down"></div>
            </div>
        </div>
    );
};

export default SellerPrimaryDropDownMenu;
