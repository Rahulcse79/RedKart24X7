import { useState, useEffect } from 'react';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MinCategory from '../Layouts/MinCategory';
import Images from '../../assets/images/image.png';

const GiftCards = () => {

    const navigate = useNavigate();
    const { loading, isAuthenticated } = useSelector(state => state.user);
    const [showAll, setShowAll] = useState(false);
    const [giftItem, setGiftItem] = useState([]);
    const [personalGiftItem, setPersonalGiftItem] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setGiftItem([
                { id: 1, name: "Amazon Gift Card", status: "Valid", ExpiredDate: "2025-04-20 10:59 AM IST", image: "/images/amazon.png" },
                { id: 2, name: "Spotify Premium Code", status: "Expired", ExpiredDate: "2025-04-20 10:59 AM IST", image: "/images/spotify.png" },
                { id: 3, name: "Netflix Voucher", status: "Valid", ExpiredDate: "2025-04-19 10:59 AM IST", image: "/images/netflix.png" },
                { id: 4, name: "Apple Store Gift Card", status: "Valid", ExpiredDate: "2025-04-18 10:59 AM IST", image: "/images/apple.png" }
            ]);
            
            setPersonalGiftItem([
                { id: 1, name: "Birthday Surprise", status: "Valid", ExpiredDate: "2025-04-15 10:59 AM IST", image: "/images/birthday.png" },
                { id: 2, name: "Anniversary Gift", status: "Expired", ExpiredDate: "2025-04-20 10:59 AM IST", image: "/images/anniversary.png" },
                { id: 3, name: "Custom Gift Box", status: "Valid", ExpiredDate: "2025-04-10 10:59 AM IST", image: "/images/custom.png" }
            ]);            
        }, 1000);
    }, []);

    const itemsToShow = showAll ? giftItem : giftItem.slice(0, 3);
    const itemsToShowPersonal = showAll ? personalGiftItem : personalGiftItem.slice(0, 3);

    return (
        <>
            <MetaData title="Gift Cards" />
            {loading ? <Loader /> :
                <>
                    <MinCategory />
                    <main className="w-full mt-12 sm:mt-0">
                        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                            <div className="flex-1 flex flex-col gap-6">
                                <div className="overflow-hidden shadow bg-white rounded-2xl">
                                    <div className="flex flex-col justify-between h-full m-4 sm:mx-8 sm:my-6">
                                            <div className="flex flex-col gap-5 items-start">
                                                <span className="font-medium text-2xl">General gifts</span>
                                                <div className="flex flex-col gap-6 w-full mt-2">
                                                    {itemsToShow.length > 0 ? (
                                                        itemsToShow.map((item) => (
                                                            <div key={item.id} className="flex gap-4 items-center border-b pb-3 cursor-pointer">
                                                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow" />
                                                                <div className="flex items-center gap-2">
                                                                    <div className="flex flex-col">
                                                                        <span className="font-medium text-lg text-gray-800">{item.name}</span>
                                                                        <div className="flex items-center gap-2 mt-1">
                                                                            <span className={`w-3 h-3 rounded-full ${item.status === "Valid" ? "bg-green-500" : "bg-red-500"}`}></span>
                                                                            <span className="text-sm text-gray-500">
                                                                                {item.status === "Valid" ? `Valid on ${item.ExpiredDate}` : "Expired"}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : <p className="text-gray-500">No gift items found.</p>}

                                                    <button onClick={() => setShowAll(!showAll)} className="text-blue-500 hover:underline mt-4">
                                                        {showAll ? "View Less" : "View More"}
                                                    </button>
                                                </div>
                                            </div>
                                    </div>
                                </div>

                                <div className="overflow-hidden shadow bg-white rounded-2xl">
                                    <div className="flex flex-col justify-between h-full m-4 sm:mx-8 sm:my-6">
                                        {isAuthenticated ? (
                                            <div className="flex flex-col gap-5 items-start">
                                                <span className="font-medium text-2xl">Personal Gifts</span>
                                                <div className="flex flex-col gap-6 w-full mt-2">
                                                    {itemsToShowPersonal.length > 0 ? (
                                                        itemsToShowPersonal.map((item) => (
                                                            <div key={item.id} className="flex gap-4 items-center border-b pb-3 cursor-pointer">
                                                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow" />
                                                                <div className="flex items-center gap-2">
                                                                    <div className="flex flex-col">
                                                                        <span className="font-medium text-lg text-gray-800">{item.name}</span>
                                                                        <div className="flex items-center gap-2 mt-1">
                                                                            <span className={`w-3 h-3 rounded-full ${item.status === "Valid" ? "bg-green-500" : "bg-red-500"}`}></span>
                                                                            <span className="text-sm text-gray-500">
                                                                                {item.status === "Valid" ? `Valid on ${item.ExpiredDate}` : "Expired"}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : <p className="text-gray-500">No personal gift items found.</p>}

                                                    <button onClick={() => setShowAll(!showAll)} className="text-blue-500 hover:underline mt-4">
                                                        {showAll ? "View Less" : "View More"}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col justify-between items-center text-center h-full w-full">
                                                <p className="text-lg text-gray-700 mt-10">Login to view your personal gifts</p>
                                                <img src={Images} alt="Personal Gifts Illustration" className="my-8 w-40 h-40 object-contain" />
                                                <div className="w-full flex justify-center mb-[60px]">
                                                    <button type="button" className="text-white py-3 px-10 bg-red-600 shadow hover:shadow-lg rounded font-semibold text-base" onClick={() => navigate("/login")}>
                                                        Log in
                                                    </button>
                                                </div>
                                            </div>
                                        )}
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

export default GiftCards;
