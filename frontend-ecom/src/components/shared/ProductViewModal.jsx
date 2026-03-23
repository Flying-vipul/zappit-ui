import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useState, Fragment } from 'react'
import { Divider } from '@mui/material'
import Status from './Status';
import { MdDone, MdClose } from "react-icons/md";

function ProductViewModal({ open, setOpen, product, isAvailable }) {

    const { id, productName, image, description, quantity, price, discount, specialPrice } = product;

    return (
        /* 1. WRAPPER: The Transition controls the Open/Close state animation */
        <Transition show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { }}>

                {/* 2. BACKDROP ANIMATION: Fades in/out smoothly */}
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">

                        {/* 3. MODAL PANEL ANIMATION: Zooms from 95% to 100% (The "Pop" effect) */}
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-2xl transition-all md:max-w-xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
                            >
                                {/* IMAGE SECTION */}
                                {image && (
                                    <div className="w-full h-64 sm:h-80 overflow-hidden bg-slate-50 flex items-center justify-center p-4 sm:p-8">
                                        <img
                                            className='w-full h-full object-contain mix-blend-multiply cursor-pointer transition-transform duration-500 transform hover:scale-110'
                                            src={image}
                                            alt={productName}
                                        />
                                    </div>
                                )}

                                {/* CONTENT SECTION */}
                                <div className='px-6 pt-6 pb-2'>
                                    <DialogTitle as="h1" className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800 mb-4">
                                        {productName}
                                    </DialogTitle>

                                    <div className='space-y-2 text-gray-700 pb-4'>
                                        <div className='flex items-center justify-between gap-2'>
                                            {specialPrice ? (
                                                <div className='flex items-center gap-2'>
                                                    <span className='text-gray-400 line-through'>
                                                        ${Number(price).toFixed(2)}
                                                    </span>
                                                    <span className='sm:text-xl font-semibold text-slate-700'>
                                                        ${Number(specialPrice).toFixed(2)}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className='text-xl font-bold'>
                                                    ${Number(price).toFixed(2)}
                                                </span>
                                            )}

                                            {isAvailable ? (
                                                <Status
                                                    text="In Stock"
                                                    icon={MdDone}
                                                    bg="bg-teal-200"
                                                    color="text-teal-900"
                                                />
                                            ) : (
                                                <Status
                                                    text="Out-Of-Stock"
                                                    icon={MdClose}
                                                    bg="bg-rose-200"
                                                    color="text-rose-700"
                                                />
                                            )}
                                        </div>

                                        <Divider className="my-4" />

                                        <p className="text-gray-600 leading-relaxed mt-4">
                                            {description}
                                        </p>
                                    </div>
                                </div>

                                {/* BUTTON SECTION */}
                                <div className='px-6 py-4 flex justify-end gap-4 bg-gray-50'>
                                    <button
                                        onClick={() => setOpen(false)}
                                        type='button'
                                        className='px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors'>
                                        Close
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
export default ProductViewModal;