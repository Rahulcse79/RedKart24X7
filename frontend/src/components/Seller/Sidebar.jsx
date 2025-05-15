import { useDispatch, useSelector } from 'react-redux';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { logoutSeller } from '../../actions/SellerAction';

const SellerSidebar = ({ activeTab }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { seller } = useSelector(state => state.seller);

    const handleLogout = () => {
        dispatch(logoutSeller());
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        navigate("/seller/login");
    }

    return (
        <>
            <div className="hidden sm:flex flex-col gap-4 w-1/4 px-1">

                <div className="flex items-center gap-4 p-3 bg-white rounded-sm shadow">

                    <div className="w-12 h-12 rounded-full">
                        <img draggable="false" className="h-full w-full object-cover rounded-full" src={seller.avatar.url} alt="Avatar" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-xs">Hello,</p>
                        <h2 className="font-medium">{seller.name}</h2>
                    </div>
                </div>

                <div className="flex flex-col bg-white rounded-sm shadow">

                    <div className="flex items-center gap-5 px-4 py-4">
                        <span className="text-primary-blue"><DashboardIcon /></span>
                        <p className="flex w-full justify-between font-medium text-gray-500">Product dashboard</p>
                    </div>
                    <div className="flex flex-col pb-3 border-b text-sm">
                        <Link to="/seller/product/home" className={`${activeTab === "product dashboard" ? "bg-blue-50 text-primary-blue font-medium" : "hover:bg-blue-50 hover:text-primary-blue"} p-3 pl-14`}>Home</Link>
                    </div>

                    <div className="flex items-center gap-5 px-4 py-4">
                        <span className="text-primary-blue"><PersonIcon /></span>
                        <p className="flex w-full justify-between font-medium text-gray-500">ACCOUNT SETTINGS</p>
                    </div>
                    <div className="flex flex-col pb-3 border-b text-sm">
                        <Link to="/seller/dashboard" className={`${activeTab === "profile" ? "bg-blue-50 text-primary-blue font-medium" : "hover:bg-blue-50 hover:text-primary-blue"} p-3 pl-14`}>Profile Information</Link>
                        <Link to="/seller/edit/store" className={`${activeTab === "store" ? "bg-blue-50 text-primary-blue font-medium" : "hover:bg-blue-50 hover:text-primary-blue"} p-3 pl-14`} >Edit Information</Link>
                    </div>


                    <div className="flex items-center gap-5 px-4 py-4">
                        <span className="text-primary-blue"><AccountBalanceWalletIcon /></span>
                        <p className="flex w-full justify-between font-medium text-gray-500">PAYMENTS</p>
                    </div>
                    <div className="flex flex-col pb-3 border-b text-sm">
                        <Link className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue flex justify-between pr-6" to="/">Gift Cards <span className="font-medium text-primary-green">₹0</span></Link>
                        <Link className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue" to="/">Saved UPI</Link>
                        <Link className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue" to="/">Saved Cards</Link>
                    </div>

                    <div className="flex items-center gap-5 px-4 py-4 border-b">
                        <span className="text-primary-blue"><ChatIcon /></span>
                        <Link className="flex w-full justify-between font-medium text-gray-500 hover:text-primary-blue" to="/">
                            MY CHATS
                            <span><ChevronRightIcon /></span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-5 px-4 py-4 border-b">
                        <span className="text-primary-blue"><PowerSettingsNewIcon /></span>
                        <div className="flex w-full justify-between font-medium text-gray-500 hover:text-primary-blue cursor-pointer" onClick={handleLogout}>
                            Logout
                            <span><ChevronRightIcon /></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SellerSidebar;
