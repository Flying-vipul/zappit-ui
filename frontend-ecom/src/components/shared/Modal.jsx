import { Button, Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'
import { RxCross1 } from 'react-icons/rx';

function Modal({ open,setOpen, children, title=""}){
    return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 overflow-hidden">
            <div className='absolute inset-0 overflow-hidden'>
                <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                    <DialogPanel transition
                            className='pointer-events-auto relative w-screen max-w-[800px] transform duration-500 ease-in-out data-closed:translate-x-full'>
                                <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-2xl'>
                                    <div className='relative flex-1 p-4 sm:p-8'>
                                        <div className='border-b pb-4 sm:pb-6 flex justify-between items-center mb-6'>
                                            <h1 className='font-montserrat font-bold text-slate-800 text-xl sm:text-2xl pt-2 sm:pt-4'>{title}</h1>
                                            <button 
                                                onClick={() => setOpen(false)}
                                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                                            >
                                                <RxCross1 className='text-slate-800 text-xl sm:text-2xl'/>
                                            </button>
                                        </div>
                                        {children}
                                    </div>
                                </div>
                    </DialogPanel>
                </div>
            </div>
        </div>
      </Dialog>
    </>
  )
}

export default Modal;