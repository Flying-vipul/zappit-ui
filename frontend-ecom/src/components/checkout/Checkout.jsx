import { Button, Step, StepLabel, Stepper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddressInfo from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import toast from 'react-hot-toast';
import ErrorPage from '../shared/ErrorPage';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import PayPalPayment from './PayPalPayment';
import RazorpayPayment from './RazorpayPayment';

const Checkout = () => {

    const [activeStep, setActiveStep] = useState(0);

    const dispatch = useDispatch();

    const { address, selectedUserAddress } = useSelector((state) => state.auth);
    const { isLoading, errorMessage } = useSelector((state) => state.errors);
    const { cart, totalPrice } = useSelector((state) => state.carts);

    const steps = [
        "Address",
        "Payment Method",
        "Order Summary",
        "payment",
    ];

    useEffect(() => {
        dispatch(getUserAddresses());
    }, [dispatch]);



    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    }

    const { paymentMethod } = useSelector((state) => state.payment);

    const handleNext = () => {
        if (activeStep === 0 && !selectedUserAddress) {
            toast.error("Please select checkout address before proceeding.");
            return;
        }

        if (activeStep === 1 && (!selectedUserAddress || !paymentMethod)) {
            toast.error("Please select payment address before proceeding.");
            return;
        }
        setActiveStep((prevStep) => prevStep + 1);
    }
    return (
        <div className='py-14 min-h-[calc(100vh-100px)] '>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index} >
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}

            </Stepper>


            {isLoading ? (
                <div className='mt-5 max-w-5xl mx-auto'>
                    {/* Skeletons based on activeStep */}
                    {activeStep === 0 && (
                        <div className="space-y-4 max-w-md mx-auto">
                            {[1, 2].map((sk) => (
                                <div key={sk} className={`animate-pulse p-4 border border-slate-200 rounded-xl bg-slate-50 relative ${sk === 2 ? 'hidden sm:block' : ''}`}>
                                    <div className='flex items-start'>
                                        <div className='w-full pr-10 space-y-4'>
                                            <div className="flex items-center gap-3">
                                                <div className="h-5 w-5 bg-slate-300 rounded-md shrink-0"></div>
                                                <div className="h-5 bg-slate-300 rounded w-1/3"></div>
                                            </div>
                                            <div className="pl-8 space-y-3">
                                                <div className="h-3 bg-slate-200 rounded w-4/5"></div>
                                                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                                                <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                                                <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Action Buttons placeholder */}
                                    <div className='flex gap-2 absolute top-4 right-4'>
                                        <div className="h-5 w-5 bg-slate-200 rounded-md"></div>
                                        <div className="h-5 w-5 bg-slate-200 rounded-md"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeStep === 1 && (
                        <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border animate-pulse">
                            <div className="h-6 bg-slate-300 rounded w-[60%] mb-6"></div>
                            <div className="space-y-5">
                                <div className="flex items-center gap-3">
                                    <div className="h-5 w-5 bg-slate-300 rounded-full shrink-0"></div>
                                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-5 w-5 bg-slate-300 rounded-full shrink-0"></div>
                                    <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeStep === 2 && (
                        <div className="flex flex-wrap animate-pulse px-4 mb-8">
                            <div className="w-full lg:w-8/12 lg:pr-4 space-y-4">
                                <div className="p-4 border rounded-lg shadow-sm">
                                    <div className="h-6 bg-slate-300 rounded w-1/4 mb-4"></div>
                                    <div className="space-y-3">
                                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-3 bg-slate-200 rounded w-2/3 max-w-[300px]"></div>)}
                                    </div>
                                </div>
                                <div className="p-4 border rounded-lg shadow-sm">
                                    <div className="h-6 bg-slate-300 rounded w-1/4 mb-4"></div>
                                    <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                                </div>
                                <div className="p-4 border rounded-lg shadow-sm">
                                    <div className="h-6 bg-slate-300 rounded w-1/4 mb-4"></div>
                                    <div className="space-y-4">
                                        {[1, 2].map(i => (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className="w-16 h-16 sm:w-12 sm:h-12 bg-slate-300 rounded shrink-0"></div>
                                                <div className="space-y-3 flex-1">
                                                    <div className="h-4 bg-slate-200 rounded w-[80%] max-w-[300px]"></div>
                                                    <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 mt-4 lg:mt-0">
                                <div className="border rounded-lg shadow-sm p-4 space-y-5">
                                    <div className="h-6 bg-slate-300 rounded w-1/2 mb-2"></div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between"><div className="h-3 bg-slate-200 rounded w-1/4"></div><div className="h-3 bg-slate-200 rounded w-1/4"></div></div>
                                        <div className="flex justify-between"><div className="h-3 bg-slate-200 rounded w-1/4"></div><div className="h-3 bg-slate-200 rounded w-1/4"></div></div>
                                        <div className="flex justify-between pt-4 border-t"><div className="h-4 bg-slate-300 rounded w-1/3"></div><div className="h-4 bg-slate-300 rounded w-1/3"></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeStep === 3 && (
                        <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border animate-pulse">
                            <div className="flex justify-center mb-6">
                                <div className="h-12 bg-slate-300 rounded w-full max-w-[200px]"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-3 bg-slate-200 rounded w-[80%] mx-auto"></div>
                                <div className="h-3 bg-slate-200 rounded w-[60%] mx-auto"></div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (<div className='mt-5'>
                {activeStep === 0 && <AddressInfo address={address} />}
                {activeStep === 1 && <PaymentMethod />}
                {activeStep === 2 && <OrderSummary
                    totalPrice={totalPrice}
                    cart={cart}
                    address={selectedUserAddress}
                    paymentMethod={paymentMethod} />}
                {activeStep === 3 &&
                    <>
                        {paymentMethod === "Razorpay" ? (
                            <RazorpayPayment cartTotal={totalPrice} addressId={selectedUserAddress?.id} />
                        ) : (
                            <PayPalPayment />
                        )}
                    </>}
            </div>
            )}

            <div className='flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-200'
                style={{ boxShadow: "0 -2px 4px rgba(100,100,100,0.15)" }}>
                <Button
                    variant='outlined'
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    Back
                </Button>
                {activeStep !== steps.length - 1 && (
                    <button
                        onClick={handleNext}
                        disabled={
                            isLoading ||
                            errorMessage || (
                                (activeStep === 0 ? !selectedUserAddress
                                    : activeStep === 1 ? !paymentMethod
                                        : false
                                )
                            )
                        }
                        className={`bg-custom-blue font-semibold px-6 h-10 rounded-md text-white
                  ${isLoading || errorMessage ||
                                (activeStep === 0 && !selectedUserAddress) ||
                                (activeStep === 1 && !paymentMethod)
                                ? "opacity-60 cursor-not-allowed"
                                : ""
                            }`}
                    >
                        Procceed
                    </button>
                )}
            </div>

            {errorMessage && <ErrorPage message={errorMessage} />}
        </div>
    );
}

export default Checkout;