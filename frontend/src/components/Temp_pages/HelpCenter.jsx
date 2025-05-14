import { useState } from 'react';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Images from '../../assets/images/image.png';

const HelpCenter = () => {

    const navigate = useNavigate();

    const { loading, isAuthenticated } = useSelector(state => state.user);
    const [showAll, setShowAll] = useState(false);
    const [issueItems, setIssueItems] = useState([
        {
            id: 1,
            name: "AAV WORLD Pack of 6 Ceramic CUPS WITH GOLDEN Electric Line DESIGN",
            deliveredDate: "Apr 13",
            status: "Delivered",
            image: "https://via.placeholder.com/80?text=Cup"
        },
        {
            id: 2,
            name: "RK EMPIRE frosty Plastic Food Grade Fridge Square 1000 ml Bottle",
            deliveredDate: "Apr 12",
            status: "Delivered",
            image: "https://via.placeholder.com/80?text=Bottle"
        },
        {
            id: 3,
            name: "Kraftiq Homes 180 TC Microfiber Double Floral Flat Bedsheet",
            deliveredDate: "Mar 19",
            status: "Pending",
            image: "https://via.placeholder.com/80?text=Bedsheet"
        },
        {
            id: 4,
            name: "Philips Sonicare ProtectiveClean 6100 Sonic Electric Toothbrush",
            deliveredDate: "Apr 10",
            status: "Delivered",
            image: "https://via.placeholder.com/80?text=Toothbrush"
        },
        {
            id: 5,
            name: "Samsung 55-inch 4K UHD Smart TV",
            deliveredDate: "Apr 8",
            status: "Pending",
            image: "https://via.placeholder.com/80?text=TV"
        },
        {
            id: 6,
            name: "Apple AirPods Pro (2nd Generation)",
            deliveredDate: "Apr 6",
            status: "Delivered",
            image: "https://via.placeholder.com/80?text=AirPods"
        },
        {
            id: 7,
            name: "Sony PlayStation 5 Console",
            deliveredDate: "Apr 4",
            status: "Delivered",
            image: "https://via.placeholder.com/80?text=PS5"
        },
        {
            id: 8,
            name: "Dyson V11 Torque Drive Cordless Vacuum Cleaner",
            deliveredDate: "Apr 2",
            status: "Pending",
            image: "https://via.placeholder.com/80?text=Vacuum"
        },
        {
            id: 9,
            name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
            deliveredDate: "Mar 30",
            status: "Delivered",
            image: "https://via.placeholder.com/80?text=Pressure+Cooker"
        },
        {
            id: 10,
            name: "Fitbit Charge 5 Fitness and Health Tracker",
            deliveredDate: "Mar 28",
            status: "Pending",
            image: "https://via.placeholder.com/80?text=Fitbit"
        },
        {
            id: 11,
            name: "Amazon Echo Show 8",
            deliveredDate: "Mar 25",
            status: "Delivered",
            image: "https://via.placeholder.com/80?text=Echo+Show"
        },
        {
            id: 12,
            name: "Bose QuietComfort 45 Bluetooth Headphones",
            deliveredDate: "Mar 22",
            status: "Pending",
            image: "https://via.placeholder.com/80?text=Bose+Headphones"
        },
        {
            id: 13,
            name: "GoPro HERO10 Black Action Camera",
            deliveredDate: "Mar 20",
            status: "Delivered",
            image: "https://via.placeholder.com/80?text=GoPro"
        },
        {
            id: 14,
            name: "Canon EOS 90D DSLR Camera",
            deliveredDate: "Mar 18",
            status: "Delivered",
            image: "https://via.placeholder.com/80?text=Camera"
        },
        {
            id: 15,
            name: "Samsung Galaxy S21 5G Smartphone",
            deliveredDate: "Mar 15",
            status: "Pending",
            image: "https://via.placeholder.com/80?text=Samsung+S21"
        }
    ]);
    const [issues, setIssues] = useState([
        { id: 1, title: "I want to manage my order", description: "View, cancel or return an order" },
        { id: 2, title: "I want help with returns & refunds", description: "Manage and track returns" }
    ]);

    const itemsToShow = showAll ? issueItems : issueItems.slice(0, 3);

    return (
        <>
            <MetaData title="Help Center" />

            {loading ? <Loader /> :
                <>
                    <MinCategory />
                    <main className="w-full mt-12 sm:mt-0">
                        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                            <div className="flex-1 overflow-hidden shadow bg-white rounded-2xl">
                                <div className="flex flex-col gap-12 m-4 sm:mx-8 sm:my-6">
                                    <div className="flex flex-col gap-5 items-start">
                                        <span className="font-medium text-2xl">Help Center</span>
                                        <p className="text-gray-600 text-base leading-relaxed">
                                            Welcome to the RedCart24X7 Help Center! Whether you need assistance tracking orders, handling returns and refunds,
                                            or solving payment queries, we’re here for you 24x7. Explore our resources and get your questions resolved quickly,
                                            so you can get back to enjoying your shopping experience.
                                            Reach out anytime — we’re happy to help!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                            <Sidebar />

                            <div className="flex-1 flex flex-col gap-6">
                                <div className="overflow-hidden shadow bg-white rounded-2xl">
                                    <div className="flex flex-col justify-between h-full m-4 sm:mx-8 sm:my-6">
                                        {isAuthenticated ? (
                                            <div className="flex flex-col gap-5 items-start">
                                                <span className="font-medium text-2xl">Which item are you facing an issue with?</span>
                                                <div className="flex flex-col gap-6 w-full mt-2">
                                                    {itemsToShow.length > 0 ? (
                                                        itemsToShow.map((item) => (
                                                            <div
                                                                key={item.id}
                                                                className="flex gap-4 items-center border-b pb-3 cursor-pointer"
                                                            >
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="w-20 h-20 object-cover rounded-lg shadow"
                                                                />
                                                                <div className="flex items-center gap-2">
                                                                    <div className="flex flex-col">
                                                                        <span className="font-medium text-lg text-gray-800">{item.name}</span>
                                                                        <div className="flex items-center gap-2 mt-1">
                                                                            <span
                                                                                className={`w-3 h-3 rounded-full ${item.status === "Delivered" ? "bg-green-500" : "bg-red-500"}`}
                                                                            ></span>
                                                                            <span className="text-sm text-gray-500">
                                                                                {item.status === "Delivered"
                                                                                    ? `Delivered on ${item.deliveredDate}`
                                                                                    : "Not Delivered"}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-gray-500">No items found.</p>
                                                    )}

                                                    <button
                                                        onClick={() => setShowAll(!showAll)}
                                                        className="text-blue-500 hover:underline mt-4"
                                                    >
                                                        {showAll ? "View Less" : "View More"}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col justify-between items-center text-center h-full w-full">
                                                <p className="text-lg text-gray-700 mt-10">
                                                    Login to get help with your recent orders and issues
                                                </p>
                                                <img
                                                    src={Images}
                                                    alt="Help Center Illustration"
                                                    className="my-8 w-40 h-40 object-contain"
                                                />
                                                <div className="w-full flex justify-center mb-[60px]">
                                                    <button
                                                        type="button"
                                                        className="text-white py-3 px-10 bg-red-600 shadow hover:shadow-lg rounded font-semibold text-base"
                                                        onClick={() => navigate("/login")}
                                                    >
                                                        Log in
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="overflow-hidden shadow bg-white rounded-2xl">
                                    <div className="flex flex-col gap-12 m-4 sm:mx-8 sm:my-6">
                                        <div className="flex flex-col gap-5 items-start">
                                            <span className="font-medium text-2xl">What issue are you facing?</span>
                                            <div className="flex flex-col gap-4 w-full">
                                                {issues.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex gap-4 items-center border-b pb-3 cursor-pointer"
                                                        onClick={() => navigate('/')}
                                                    >
                                                        <span className="font-medium text-lg">{item.title}</span>
                                                        <span className="text-sm text-gray-500">{item.description}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                            <div className="flex-1 overflow-hidden shadow bg-white rounded-2xl">
                                <div className="flex flex-col gap-12 m-4 sm:mx-8 sm:my-6">
                                    <div className="flex flex-col gap-5 items-start">
                                        <span className="font-medium text-2xl">RedCart24X7 Help Centre: Get All Your Shopping Solutions Here</span>
                                        <p>
                                            Once you place an order on any online store, the next step is the excitement of waiting for your product to arrive. At RedCart24X7, we know this wait can sometimes feel uncertain if you don’t receive timely updates or helpful support after your order is placed. That’s exactly why the RedCart24X7 Help Centre is designed to make your experience smooth, easy, and stress-free by offering reliable assistance for all your shopping-related queries.

                                            With RedCart24X7, online shopping has become more convenient than ever. Whether you’re shopping for electronics, fashion, groceries, home essentials, or personal care — everything you need is just a few clicks away. But we also understand that even the smallest issue can turn a great shopping experience into a frustrating one. To ensure that your journey with us stays positive, the RedCart24X7 Help Centre is always ready to assist you — from resolving order-related concerns to helping you manage your returns, payments, and account settings.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                </>
            }
        </>
    );
};

export default HelpCenter;