import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDeleteForever } from 'react-icons/md';

const DeleteModal = ({ open, setOpen, onDeleteHandler, loader, title = "Delete Item" }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center">
          <div className="flex justify-center mb-4">
            <MdDeleteForever className="text-red-500 text-6xl" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">{title}</h2>
          <p className="text-slate-500 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
          <div className="flex justify-center gap-4">
            <button
              disabled={loader}
              onClick={() => setOpen(false)}
              className="border border-blue-500 text-blue-500 px-5 py-2 rounded-md font-medium hover:bg-blue-50 transition"
            >
              Cancel
            </button>
            <button
              disabled={loader}
              onClick={onDeleteHandler}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md font-medium transition"
            >
              {loader ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
