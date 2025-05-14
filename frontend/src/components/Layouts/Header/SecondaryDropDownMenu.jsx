import NotificationsIcon from '@mui/icons-material/Notifications';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import DownloadIcon from '@mui/icons-material/Download';

const SecondaryDropDownMenu = () => {

    const navs = [
        {
            title: "Notification Preferences",
            icon: <NotificationsIcon sx={{ fontSize: "18px" }} />,
            redirect: "notification",
        },
        {
            title: "Sell on RedCart24X7",
            icon: <BusinessCenterIcon sx={{ fontSize: "18px" }} />,
            redirect: "/seller/home",
        },
        {
            title: "24x7 Customer Care",
            icon: <LiveHelpIcon sx={{ fontSize: "18px" }} />,
            redirect: "/helpCenter",
        },
        {
            title: "Download App",
            icon: <DownloadIcon sx={{ fontSize: "18px" }} />,
            redirect: "/downloadapp",
        },
    ]

    return (
        <div className="absolute w-60 -right-2 top-9 bg-white shadow-2xl rounded flex-col text-sm">

            {navs.map((item, i) => {

                const { title, icon, redirect } = item;

                return (
                    <a className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t" href={redirect} key={i}>
                        <span className="text-primary-blue">{icon}</span>
                        {title}
                    </a>
                )
            })}

            <div className="absolute right-1/2 -top-2.5">
                <div className="arrow_down"></div>
            </div>
        </div>
    );
};

export default SecondaryDropDownMenu;
