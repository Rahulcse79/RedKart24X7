import { Link } from 'react-router-dom';

const Sidebar = () => {

    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const { enqueueSnackbar } = useSnackbar();

    // const { user } = useSelector(state => state.user);

    // const handleLogout = () => {
    //     dispatch(logoutUser());
    //     enqueueSnackbar("Logout Successfully", { variant: "success" });
    //     navigate("/login");
    // }

    return (
        <div className="hidden sm:flex flex-col gap-4 w-1/4 px-1">
            <div className="flex flex-col bg-white rounded-sm shadow">
                <div className="flex items-center gap-5 px-4 py-4">
                    <p className="flex w-full justify-between font-medium text-gray-500">TYPE OF ISSUE</p>
                </div>
                <div className="flex flex-col pb-3 border-b text-sm">
                    <Link className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue" >Help with your issues</Link>
                    <Link className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue" >Help with your order</Link>
                    <Link className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue" >Help with other issues</Link>
                </div>
               
                <div className="flex items-center gap-5 px-4 py-4">
                    <p className="flex w-full justify-between font-medium text-gray-500">Help Topics</p>
                </div>
                <div className="flex flex-col pb-3 border-b text-sm">
                    <Link className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue" >Delivery related</Link>
                    <Link className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue" >Login and my account</Link>
                    <Link className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue" >Refunds related</Link>
                    <Link className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue" >Returns & Pickup related</Link>
                    <Link className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue" >Credit Card No Cost EMI</Link>
                    <Link className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue" >Payment</Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
