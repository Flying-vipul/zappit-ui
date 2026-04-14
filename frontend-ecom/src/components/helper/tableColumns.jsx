import { FaEdit } from "react-icons/fa";
import { MdDelete, MdImage, MdVisibility } from "react-icons/md";

export const getAdminOrderColumns = (onEdit) => [
  {
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "orderId",
    minWidth: 180,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-slate-800 dark:text-gray-200 font-semibold border dark:border-gray-700",
    cellClassName: "text-slate-700 dark:text-gray-300 font-normal border dark:border-gray-700",
    renderHeader: () => <span className="text-center"> Order ID </span>,
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "email",
    headerName: "Email",
    align: "center",
    minWidth: 250,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-slate-800 dark:text-gray-200 font-semibold border dark:border-gray-700",
    cellClassName: "text-slate-700 dark:text-gray-300 font-normal border dark:border-gray-700",
    renderHeader: () => <span> Email </span>,
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "totalAmount",
    headerName: "Total Amount",
    align: "center",
    minWidth: 180,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-slate-800 dark:text-gray-200 font-semibold text-center border dark:border-gray-700",
    cellClassName: "text-slate-700 dark:text-gray-300 font-normal border dark:border-gray-700 text-center",
    renderHeader: () => <span> Total Amount</span>,
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "status",
    headerName: "Status",
    align: "center",
    minWidth: 200,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-slate-800 dark:text-gray-200 font-semibold border dark:border-gray-700",
    cellClassName: "text-slate-700 dark:text-gray-300 font-normal border dark:border-gray-700",
    renderHeader: () => <span> Status </span>,
  },
  {
    sortable: false,
    disableColumnMenu: true,
    field: "date",
    headerName: "Order Date",
    align: "center",
    minWidth: 180,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-slate-800 dark:text-gray-200 font-semibold border dark:border-gray-700",
    cellClassName: "text-slate-700 dark:text-gray-300 font-normal border dark:border-gray-700",
    renderHeader: () => <span className="text-center"> Order Date</span>,
  },
  {
    sortable: false,
    field: "action",
    headerName: "Action",
    width: 250,
    headerAlign: "center",
    editable: false,
    headerClassName: "text-slate-800 dark:text-gray-200 font-semibold border dark:border-gray-700",
    cellClassName: "text-slate-700 dark:text-gray-300 font-normal border dark:border-gray-700",
    renderHeader: () => <span className="text-center">Action</span>,
    renderCell: (params) => (
      <div className="flex justify-center items-center space-x-2 h-full pt-2">
        <button
          onClick={() => onEdit(params.row)}
          className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md"
        >
          <FaEdit className="mr-2" />
          Edit
        </button>
      </div>
    ),
  },
];

export const sellerTableColumns = [
  {
    field: "id",
    headerName: "ID",
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-slate-800 dark:text-gray-200 font-semibold border dark:border-gray-700",
    cellClassName: "text-slate-700 dark:text-gray-300 font-normal border dark:border-gray-700",
    renderHeader: () => <span>Seller ID</span>,
  },
  {
    field: "username",
    headerName: "Username",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-slate-800 dark:text-gray-200 font-semibold border dark:border-gray-700",
    cellClassName: "text-slate-700 dark:text-gray-300 font-normal border dark:border-gray-700",
    renderHeader: () => <span>Username</span>,
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 250,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-slate-800 dark:text-gray-200 font-semibold border dark:border-gray-700",
    cellClassName: "text-slate-700 dark:text-gray-300 font-normal border dark:border-gray-700",
    renderHeader: () => <span>Email</span>,
  },
];

export const adminProductTableColumn = (onEdit, onDelete, onImageUpload, onView) => [
  {
    field: "id",
    headerName: "ID",
    minWidth: 80,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-slate-800 dark:text-gray-200 font-semibold border dark:border-gray-700",
    cellClassName: "text-slate-700 dark:text-gray-300 font-normal border dark:border-gray-700",
    renderHeader: () => <span>ID</span>,
  },
  {
    field: "productName",
    headerName: "Product Name",
    minWidth: 200,
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-slate-800 dark:text-gray-200 font-semibold border dark:border-gray-700",
    cellClassName: "text-slate-700 dark:text-gray-300 font-normal border dark:border-gray-700",
    renderHeader: () => <span>Product Name</span>,
  },
  {
    field: "price",
    headerName: "Price",
    minWidth: 110,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-slate-800 dark:text-gray-200 font-semibold border dark:border-gray-700",
    cellClassName: "text-slate-700 dark:text-gray-300 font-normal border dark:border-gray-700",
    renderHeader: () => <span>Price</span>,
  },
  {
    field: "discount",
    headerName: "Discount",
    minWidth: 110,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-slate-800 dark:text-gray-200 font-semibold border dark:border-gray-700",
    cellClassName: "text-slate-700 dark:text-gray-300 font-normal border dark:border-gray-700",
    renderHeader: () => <span>Discount %</span>,
  },
  {
    field: "quantity",
    headerName: "Qty",
    minWidth: 90,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-slate-800 dark:text-gray-200 font-semibold border dark:border-gray-700",
    cellClassName: "text-slate-700 dark:text-gray-300 font-normal border dark:border-gray-700",
    renderHeader: () => <span>Qty</span>,
  },
  {
    field: "action",
    headerName: "Actions",
    minWidth: 380,
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-slate-800 dark:text-gray-200 font-semibold border dark:border-gray-700",
    cellClassName: "text-slate-700 dark:text-gray-300 font-normal border dark:border-gray-700",
    renderHeader: () => <span>Actions</span>,
    renderCell: (params) => (
      <div className="flex justify-center items-center gap-2 h-full">
        <button
          onClick={() => onView(params.row)}
          className="flex items-center bg-slate-50 dark:bg-gray-800 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-gray-600 hover:bg-slate-100 dark:hover:bg-gray-700 px-3 h-8 rounded-md text-sm font-medium transition-colors shadow-sm"
        >
          <MdVisibility className="mr-1.5" size={15} /> View
        </button>
        <button
          onClick={() => onEdit(params.row)}
          className="flex items-center bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60 px-3 h-8 rounded-md text-sm font-medium transition-colors shadow-sm"
        >
          <FaEdit className="mr-1.5" size={14} /> Edit
        </button>
        <button
          onClick={() => onImageUpload(params.row)}
          className="flex items-center bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 px-3 h-8 rounded-md text-sm font-medium transition-colors shadow-sm"
        >
          <MdImage className="mr-1.5" size={15} /> Image
        </button>
        <button
          onClick={() => onDelete(params.row)}
          className="flex items-center bg-rose-50 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/60 px-3 h-8 rounded-md text-sm font-medium transition-colors shadow-sm"
        >
          <MdDelete className="mr-1.5" size={15} /> Delete
        </button>
      </div>
    ),
  },
];
