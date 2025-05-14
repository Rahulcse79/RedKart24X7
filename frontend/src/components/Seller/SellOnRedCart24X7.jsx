import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';

const SellOnRedCart24X7 = () => {

    const { loading, isAuthenticated } = useSelector(state => state.seller);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemOFCard, setSelectedItemOFCard] = useState(null);
    const navigate = useNavigate();

    const highlights = [
        {
            icon: "👥",
            title: "1k+ RedCart24X7 Customers",
            highlights: "",
            description: "Join over 1,000 trusted customers who have already chosen RedCart24X7 to grow their businesses. Our platform provides everything you need to succeed online."
        },
        {
            icon: "📞",
            title: "One-Click Seller Support",
            highlights: "Reach us at +91-9752079591",
            description: "Need help? Our one-click support system ensures you get assistance fast. No more waiting in long queues – support is just a click away! For direct support."
        },
        {
            icon: "🎉",
            title: "Festival Sales & More",
            highlights: "20% off on seller fees with coupon code FIRST20",
            description: "Take advantage of special sales events during peak seasons. Boost your sales with limited-time offers and festive promotions that attract more customers."
        }
    ];


    const sellerStories = [
        { name: "Vinay Garg, Activa & Digi Smart", quote: "Joining RedCart24X7 boosted my business reach. The platform’s payment system and customer support are excellent!", image: "https://via.placeholder.com/80?text=Vinay" },
        { name: "Priya Sharma, Trendy Threads", quote: "RedCart24X7 helped me turn my hobby into a real business. Sales are smooth and customer engagement is fantastic!", image: "https://via.placeholder.com/80?text=Priya" },
        { name: "Rohit Mehra, Home Essentials", quote: "Thanks to RedCart24X7, my small home decor store now reaches customers all over India.", image: "https://via.placeholder.com/80?text=Rohit" },
        { name: "Anjali Patel, Craft Corner", quote: "I started with zero knowledge, but RedCart24X7’s seller support made it easy to grow.", image: "https://via.placeholder.com/80?text=Anjali" },
        { name: "Aman Verma, TechBuzz", quote: "Tech sales skyrocketed after I joined RedCart24X7. The interface is clean and seller-friendly.", image: "https://via.placeholder.com/80?text=Aman" },
        { name: "Sneha Jain, Ethnic Wears", quote: "My ethnic fashion brand found its audience faster than I imagined, thanks to RedCart24X7.", image: "https://via.placeholder.com/80?text=Sneha" },
        { name: "Arjun Malhotra, GadgetHub", quote: "Highly recommended for gadget sellers! Timely payments and genuine buyers.", image: "https://via.placeholder.com/80?text=Arjun" },
        { name: "Pooja Kaur, Kitchen Karma", quote: "My kitchenware brand became a household name with the help of RedCart24X7's wide reach.", image: "https://via.placeholder.com/80?text=Pooja" },
        { name: "Ramesh Bhatia, Daily Needs Mart", quote: "RedCart24X7 made local delivery and customer management super easy for my grocery store.", image: "https://via.placeholder.com/80?text=Ramesh" },
        { name: "Neha Khanna, Decor Dreams", quote: "Decor Dreams scaled from 10 orders a month to 500+ after joining RedCart24X7!", image: "https://via.placeholder.com/80?text=Neha" }
    ];

    const ReadItems = [
        {
            name: "Create Account",
            text: `Create Your RedCart24X7 Seller Account
    Starting your journey as a seller on RedCart24X7 is simple, fast, and hassle-free! Setting up your account takes less than 10 minutes — and you only need 3 basic documents to begin.
    
    We’ve created an easy-to-follow checklist to help you prepare. With your documents ready, you’ll breeze through the setup and unlock the opportunity to showcase your products to thousands of eager shoppers on RedCart24X7.
    
    Don’t wait — join the growing community of sellers, grow your business, and reach new customers with RedCart24X7’s trusted and secure platform.
    
    ✅ Fast registration
    ✅ Only 3 documents required
    ✅ No hidden fees — only growth opportunities!
    
    Get started today and turn your products into profits with RedCart24X7 — where online selling becomes easy and rewarding.`
        },
        {
            name: "List Products",
            text: `List Your Products — Make Them Shine on RedCart24X7
    What is product listing?
    Listing is the process of adding your products to RedCart24X7’s marketplace, making them visible and accessible to millions of potential customers. This step involves creating a detailed and attractive product page that showcases your items with essential information like the product title, description, images, pricing, and specifications.
    
    A well-structured and complete listing not only builds trust but also increases the chances of your product being discovered and purchased on RedCart24X7.
    
    💡 Pro Tip: Sellers who upload clear, high-quality images and write accurate, detailed descriptions see up to 15% more visibility and engagement from customers on RedCart24X7.`
        },
        {
            name: "Storage & Shipping",
            text: `At RedCart24X7, we make sure your products not only reach the right customer but arrive safe and on time. Whether you manage your own inventory or use our trusted fulfillment network, we’ve designed flexible storage and shipping solutions to help your business grow smoothly.
    
    Our reliable shipping partners and efficient logistics system ensure that your orders are picked, packed, and delivered with care — every single time.
    
    📦 Why choose RedCart24X7 for storage & shipping?
    
    Hassle-free dispatch: Once an order is placed, you pack — we handle the rest.
    
    Nationwide delivery network: Reach customers across the country, fast and securely.
    
    Real-time tracking: Keep both you and your buyers updated, every step of the way.
    
    Storage options: Whether you store products yourself or choose RedCart24X7 warehousing, your inventory is always ready for dispatch.
    
    Focus on growing your brand while we handle the heavy lifting.
    RedCart24X7’s storage and shipping service makes sure your products are always on the move — from your store to your customer’s doorstep.`
        },
        {
            name: "Receive Payments",
            text: `Receive Payments — Fast, Secure & Transparent
    At RedCart24X7, we believe your hard work deserves a smooth and reliable payout process. As soon as you make a sale, our system ensures that your payments are processed quickly, securely, and without unnecessary delays.
    
    No more chasing payments or worrying about transaction safety — your earnings are transferred directly to your registered bank account on time, every time.
    
    💸 Why RedCart24X7 payment system stands out?
    
    Timely Settlements: Get paid on a predictable schedule, so you can plan your business confidently.
    
    Safe & Secure Transactions: Advanced encryption and fraud protection keep your earnings secure.
    
    Clear Payment Dashboard: Track every order, refund, and payment status in real-time from one simple dashboard.
    
    Flexible Payment Options: Support for multiple payment methods — UPI, wallets, credit cards, COD — to ensure customer convenience and smooth business growth for you.
    
    With RedCart24X7, your focus stays on selling, while we take care of ensuring your earnings reach you on time — without the guesswork.`
        },
        {
            name: "Grow Faster",
            text: `Grow Faster with RedCart24X7 — Your Success, Our Mission
    At RedCart24X7, we don’t just help you set up shop — we empower your business to scale and thrive in the digital marketplace. Whether you’re a new seller or an experienced entrepreneur, our platform offers the tools and insights you need to grow your brand and boost your sales.
    
    🚀 Why sellers grow faster on RedCart24X7?
    
    Powerful Promotions: Unlock marketing campaigns and discount tools designed to attract more customers and increase conversions.
    
    Data-Driven Insights: Get access to real-time analytics, customer trends, and performance reports to make smarter decisions and refine your strategies.
    
    Wider Reach: List your products once and connect with thousands of active buyers across India, 24/7.
    
    Dedicated Support: Our expert seller support team is always here to help you overcome challenges and keep your business moving forward.
    
    Join RedCart24X7 today and transform your small shop into a growing online brand. The faster you start, the sooner you sell — and the higher you soar.`
        },
        {
            name: "Seller App",
            text: `Seller App — Manage Your Shop Anytime, Anywhere!
    Running your online store is now as easy as using your phone! With the RedCart24X7 Seller App, you can stay connected to your business whether you're at home, in the office, or on the go.
    
    📱 Why choose the RedCart24X7 Seller App?
    
    Real-Time Order Alerts: Get instant notifications every time a customer places an order.
    
    Inventory at Your Fingertips: Easily update stock, edit product details, and manage your listings anytime.
    
    Track Payments & Settlements: Keep an eye on your earnings and payouts with transparent and easy-to-understand reports.
    
    Customer Communication: Answer buyer queries directly from the app to build trust and close more sales.
    
    Performance Insights: View your daily sales, product rankings, and growth stats to plan your next big move.
    
    The RedCart24X7 Seller App puts your entire shop in your pocket, so you’re always in control — no matter where life takes you.`
        },
        {
            name: "Help & Support",
            text: `Help & Support — We're Here for You, Always!
    At RedCart24X7, your success is our priority. Whether you're setting up your store, managing orders, or scaling your business — our dedicated support team is always ready to help you at every step.
    
    💡 How RedCart24X7 Supports You:
    
    24/7 Customer Support: Get assistance anytime via chat, email, or call — because we know business doesn’t stop.
    
    Step-by-Step Guides: Access easy tutorials, FAQs, and how-to videos designed to help you manage your store smoothly.
    
    Dedicated Account Managers: Need one-on-one help? Our experts are here to guide you through promotions, sales strategies, and more.
    
    Community & Forums: Connect with fellow sellers, share experiences, and grow together. Learn from the best — and become one!
    
    Your journey with RedCart24X7 isn’t just about selling — it’s about growing confidently, knowing help is always just a click away.`
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? sellerStories.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex === sellerStories.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex === sellerStories.length - 1 ? 0 : prevIndex + 1));
        }, 3000);

        if (isAuthenticated) {
            navigate('/seller/dashboard')
        }

        return () => clearInterval(interval);
    }, [sellerStories.length, isAuthenticated, navigate]);

    return (
        <>
            <MetaData title="Sell on RedCart24X7" />
            {loading ? <Loader /> : (
                <>
                    <MinCategory />

                    <main className="w-full mt-12 sm:mt-0 flex flex-col items-center bg-white">

                        <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 py-12 text-center text-white">
                            <img src={Logo} alt="RedCart24X7 Logo" className="mx-auto mb-4 w-28 h-auto" />
                            <h1 className="text-4xl font-bold">Sell Online with RedCart24X7</h1>
                            <p className="mt-2 text-lg">Reach thousands of customers and grow your business effortlessly!</p>
                            <div className="mt-6 space-x-4">
                                {!isAuthenticated ? (
                                    <>
                                        <Link to="/seller/login" className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition">Login</Link>
                                        <Link to="/seller/register" className="bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition">Register</Link>
                                    </>
                                ) : (
                                    <Link to="/seller/dashboard" className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition">Go to Dashboard</Link>
                                )}
                            </div>
                        </div>

                        <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 py-12 text-center text-white">
                            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 max-w-6xl mx-auto cursor-pointer">
                                {highlights.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedItemOFCard(item)}
                                        className="flex flex-col items-center bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        <div className="text-4xl mb-4">{item.icon}</div>
                                        <h3 className="font-semibold text-lg text-center text-gray-700">{item.title}</h3>
                                    </div>
                                ))}
                            </section>

                            {selectedItemOFCard && (
                                <div className="flex justify-center sm:w-11/12 sm:mt-4 mx-auto mb-7">
                                    <div className="flex-1 flex flex-col gap-6">
                                        <div className="overflow-hidden shadow-lg bg-white rounded-2xl w-full sm:w-3/4 max-w-4xl mx-auto">
                                            <div className="flex flex-col justify-between h-full p-6 sm:p-8">
                                                <div className="flex flex-col gap-5 items-start">
                                                    {selectedItemOFCard ? (
                                                        <>
                                                            <span className="font-medium text-2xl text-gray-800">{selectedItemOFCard.title}</span>
                                                            <p className="font-semibold text-lg text-gray-800">{selectedItemOFCard.description}</p>
                                                            <div className="text-center">
                                                                {/* Ensure highlights content is displayed only if it's present */}
                                                                {selectedItemOFCard.highlights && (
                                                                    <span className="blinking font-bold text-2xl text-red-600">
                                                                        {selectedItemOFCard.highlights}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <span className="font-medium text-2xl text-center text-gray-600">Sell Online with RedCart24X7!</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <section className="w-full p-9 max-w-4xl mx-auto" >
                            <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Seller Success Stories</h2>
                            <div className="relative flex items-center justify-center">
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-0 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
                                >
                                    ◀
                                </button>

                                <div className="w-full flex justify-center">
                                    <div className="bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center max-w-2xl text-center transition-all duration-500">
                                        <img
                                            src={sellerStories[currentIndex].image}
                                            alt={sellerStories[currentIndex].name}
                                            className="w-24 h-24 rounded-full object-cover mb-6 shadow-lg"
                                        />
                                        <h3 className="font-semibold text-2xl text-gray-800">{sellerStories[currentIndex].name}</h3>
                                        <p className="text-gray-600 mt-4 text-lg italic">"{sellerStories[currentIndex].quote}"</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleNext}
                                    className="absolute right-0 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
                                >
                                    ▶
                                </button>
                            </div>
                        </section>

                        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                            <div className="hidden sm:flex flex-col gap-4 w-1/4 px-1">
                                {ReadItems.map((item, index) => (
                                    <div key={index} className="flex flex-col bg-white rounded-sm shadow">
                                        <div className="flex items-center gap-5 px-4 py-4">
                                            <p className="flex w-full justify-between font-medium text-gray-500 cursor-pointer" onClick={() => setSelectedItem(item)}>
                                                {item.name}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>


                            <div className="flex-1 flex flex-col gap-6">
                                <div className="overflow-hidden shadow bg-white rounded-2xl w-3/4">
                                    <div className="flex flex-col justify-between h-full m-4 sm:mx-8 sm:my-6">
                                        <div className="flex flex-col gap-5 items-start">
                                            {selectedItem ? (
                                                <>
                                                    <span className="font-medium text-2xl">{selectedItem.name}</span>
                                                    <p>{selectedItem.text}</p>
                                                </>
                                            ) : (
                                                <span className="font-medium text-2xl">Sell Online with RedCart24X7 !</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="bg-blue-50 py-10 text-center w-full">
                            <h3 className="text-2xl font-bold text-gray-800">Ready to start selling?</h3>
                            <p className="text-gray-600 mt-2">Join RedCart24X7 today and unlock your business growth!</p>
                            <Link to="/seller/register" className="mt-4 inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition">Register Now</Link>
                        </section>

                        <section className="p-8 text-center text-gray-500 text-sm">
                            <p>RedCart24X7 is here to empower small and large businesses alike. Start your journey today!</p>
                        </section>

                    </main>
                </>
            )}
        </>
    );
};

export default SellOnRedCart24X7;
