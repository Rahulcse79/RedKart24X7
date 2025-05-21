import { useEffect, useState, useRef } from 'react';
import MetaData from '../Layouts/MetaData';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';

const ChatBox = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { loading, isAuthenticated, user, error } = useSelector(state => state.user);
    const [messages, setMessages] = useState([
        { sender: "Rahul", message: "Hello", align: "left" },
        { sender: "Akash", message: "Hi there!", align: "right" },
    ]);
    const [phone, setPhone] = useState("");
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((prev) => [
            ...prev,
            { sender: "You", message: input.trim(), align: "right" },
        ]);
        setInput("");
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setPhone(value);
        }
    };

    const handleCall = () => {
        if (phone.length !== 10) {
            enqueueSnackbar("Please enter a valid 10-digit phone number.", { variant: "error" });
            return;
        }
        console.log("Calling", phone);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        // dispatch(getAllOrders());
    }, [dispatch, messages]);

    return (
        <>
            <MetaData title="Chat box | RedKart24X7" />

            <div className="mt-20 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6">
                    <div className="flex flex-col bg-green-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6 items-center">
                        <div className="flex items-center justify-center gap-2">
                            <span className="bg-white text-green-500 rounded-full p-1 text-xs font-bold">🔴</span>
                            <h4 className="text-gray-100 font-medium text-sm">Live</h4>
                        </div>
                        <h2 className="text-2xl font-bold">Rahul Singh</h2>
                    </div>

                    <div className="flex flex-col bg-blue-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6 items-center">
                        <div className="flex items-center justify-center gap-2">
                            <h4 className="text-gray-100 font-medium text-sm">Active</h4>
                        </div>
                        <h2 className="text-2xl font-bold">Akash Gupta</h2>
                    </div>

                    <div className="flex flex-col bg-yellow-500 text-gray-900 gap-2 rounded-xl shadow-lg hover:shadow-xl p-6 items-center">
                        <h4 className="font-medium">Connected user</h4>
                        <h2 className="text-2xl font-bold">Kartik Tyagi</h2>
                    </div>

                    <div className="flex flex-col bg-red-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6 items-center">
                        <h4 className="text-gray-100 font-medium">Last user</h4>
                        <h2 className="text-2xl font-bold">Ayush Garg</h2>
                    </div>
                </div>
            </div>

            <div className="flex gap-8 mx-8 my-8">
                <div className="w-[50vw] bg-white rounded-xl shadow-lg p-6 max-h-[500px] flex flex-col">
                    <h3 className="text-center font-extrabold text-2xl mb-6 border-b pb-2 text-gray-800">
                        Chat Conversation
                    </h3>
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto flex flex-col gap-4 mb-4"
                    >
                        {messages.map(({ sender, message, align }, idx) => (
                            <div
                                key={idx}
                                className={`max-w-[70%] px-4 py-2 rounded-lg ${align === "left"
                                    ? "bg-green-100 text-green-900 self-start"
                                    : "bg-blue-100 text-blue-900 self-end"
                                    }`}
                            >
                                <p className="text-xs font-semibold mb-1">{sender}</p>
                                <p>{message}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-2 w-full">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a reply..."
                            className="border rounded-lg px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            Send
                        </button>
                    </div>
                </div>

                <div className="w-[40vw] bg-white rounded-xl shadow-md p-4 max-h-[500px] flex flex-col">
                    <h3 className="text-center font-extrabold text-2xl mb-6 border-b pb-2 text-gray-800">
                        Customer Care
                    </h3>

                    <div className="flex-1 overflow-y-auto flex flex-col gap-4 mb-6 text-gray-700 text-sm leading-relaxed">
                        <p>
                            <span className="font-semibold text-gray-900">Phone:</span>{" "}
                            <a href="tel:+18001234567" className="text-blue-600 hover:underline">
                                +91-9752079591
                            </a>
                        </p>
                        <p>
                            <span className="font-semibold text-gray-900">Email:</span>{" "}
                            <a
                                href="mailto:redcart24X7@gmail.com"
                                className="text-blue-600 hover:underline break-all"
                            >
                                redcart24X7@gmail.com
                            </a>
                        </p>
                        <p>
                            <span className="font-semibold text-gray-900">Hours:</span> Mon-Fri, 9am - 6pm
                        </p>
                        <p>
                            <span className="font-semibold text-gray-900">Address:</span> Sector 63 A, Noida, Uttar Pradesh (201301), India
                        </p>
                    </div>

                    <div className="w-full flex flex-col gap-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="Enter 10-digit phone number"
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            maxLength={10}
                        />
                        <button
                            onClick={handleCall}
                            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            Request a call
                        </button>
                    </div>

                </div>

            </div>

        </>
    );
};

export default ChatBox;
