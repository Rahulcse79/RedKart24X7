import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { SiRazorpay } from "react-icons/si";
import CashOnDelivery from "../../assets/images/cashOnDelivery.jpeg";
import { clearErrors, getPaymentRazorpayStatus, getPaymentRazorpayVerifyStatus } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MetaData from '../Layouts/MetaData';
import { useNavigate } from 'react-router-dom';

const Payment = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [payDisable, setPayDisable] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState("razorpay");

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setPayDisable(true);

        if (selectedPayment !== "razorpay") {
            enqueueSnackbar("Only razorpay are supported in this flow", { variant: "error" });
            setPayDisable(false);
            return;
        }

        try {
            const paymentData = {
                amount: Math.round(totalPrice),
                email: user.email,
                phoneNo: shippingInfo.phoneNo,
            };
            const createRes = await dispatch(getPaymentRazorpayStatus(paymentData));
            if (!createRes || !createRes.payload) {
                throw new Error("Something went wrong while creating the Razorpay order");
            }

            const order = createRes.payload.order;
            if (!order?.id) {
                throw new Error("Failed to create Razorpay order");
            }

            const options = {
                key: "rzp_test_A9ARY3IyT4zsWe",
                amount: order.amount,
                currency: order.currency,
                name: "My Shop",
                description: "Order Payment",
                image: "/logo.png",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyData = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        };

                        const verifyRes = await dispatch(getPaymentRazorpayVerifyStatus(verifyData));

                        if (verifyRes?.success) {
                            console.log(verifyData.razorpay_order_id)
                            enqueueSnackbar("Payment successful!", { variant: "success" });
                            navigate(`/order/${verifyData.razorpay_order_id}`);
                        } else {
                            enqueueSnackbar("Payment verification failed", { variant: "error" });
                        }
                    } catch (error) {
                        enqueueSnackbar("Error verifying payment", { variant: "error" });
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                    contact: shippingInfo?.phoneNo,
                },
                notes: {
                    address: `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}`,
                },
                theme: {
                    color: "#3399cc",
                },
            };

            if (window.Razorpay) {
                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                enqueueSnackbar("Razorpay SDK not loaded", { variant: "error" });
            }

        } catch (err) {
            enqueueSnackbar("Something went wrong with payment", { variant: "error" });
        } finally {
            setPayDisable(false);
        }
    };

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            enqueueSnackbar(error, { variant: "error" });
        }
    }, [dispatch, error, enqueueSnackbar]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <>
            <MetaData title="RedKart24X7: Secure Payment | Paytm" />
            <main className="w-full mt-20">
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
                    <div className="flex-1">
                        <Stepper activeStep={3}>
                            <div className="w-full bg-white">
                                <form onSubmit={submitHandler} className="flex flex-col justify-start gap-2 w-full mx-8 my-4">
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="payment-radio-group"
                                            name="payment-radio-button"
                                            value={selectedPayment}
                                            onChange={handlePaymentChange}
                                        >
                                            <div className="flex gap-8 flex-col sm:flex-row">
                                                <FormControlLabel
                                                    value="razorpay"
                                                    control={<Radio />}
                                                    label={
                                                        <div className="flex items-center gap-4">
                                                            <SiRazorpay className="text-blue-400 text-lg" />
                                                            <span>Razorpay</span>
                                                        </div>
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="cashOnDelivery"
                                                    control={<Radio />}
                                                    label={
                                                        <div className="flex items-center gap-4">
                                                            <img className="h-6 w-6" src={CashOnDelivery} alt="COD" />
                                                            <span>Cash on delivery</span>
                                                        </div>
                                                    }
                                                    disabled
                                                />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <input
                                        type="submit"
                                        value={`Pay ₹${totalPrice.toLocaleString()}`}
                                        disabled={payDisable}
                                        className={`w-1/2 sm:w-1/4 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none ${payDisable
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-red-600 hover:bg-red-700 cursor-pointer"
                                            }`}
                                    />
                                </form>
                            </div>
                        </Stepper>
                    </div>

                    <PriceSidebar cartItems={cartItems} />
                </div>
            </main>
        </>
    );
};

export default Payment;
