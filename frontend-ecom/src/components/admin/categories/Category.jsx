import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesDashboard, deleteCategoryDashboardAction } from "../../../store/actions";
import { FaEdit, FaTrash, FaPlus, FaListUl } from "react-icons/fa";
import Modal from "../../shared/Modal";
import AddCategoryForm from "./AddCategoryForm";
import toast from "react-hot-toast";

const Category = () => {
  const dispatch = useDispatch();
  const { categories, pagination } = useSelector((state) => state.products);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    dispatch(getAllCategoriesDashboard());
  }, [dispatch]);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsUpdate(true);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsUpdate(false);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryDashboardAction(setOpen, id, toast));
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* ── Header Section ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Category Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Create and manage your store's product categories.</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-custom-blue hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-all shadow-md active:scale-95 font-medium"
        >
          <FaPlus size={16} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* ── Stats Card ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                  <FaListUl size={24} />
              </div>
              <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Total Categories</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{pagination?.totalElements || 0}</h3>
              </div>
          </div>
      </div>

      {/* ── Table View ── */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {categories && categories.length > 0 ? (
                categories.map((cat) => (
                  <tr key={cat.categoryId} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 font-medium">#{cat.categoryId}</td>
                    <td className="px-6 py-4 text-sm text-slate-800 dark:text-white font-semibold">{cat.categoryName}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit({ id: cat.categoryId, categoryName: cat.categoryName })}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="Edit Category"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.categoryId)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete Category"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-gray-400 dark:text-gray-500 italic">
                    No categories found. Click "Add New Category" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add/Edit Modal ── */}
      <Modal open={open} setOpen={setOpen} title={isUpdate ? "Update Category" : "Add New Category"}>
        <AddCategoryForm setOpen={setOpen} category={selectedCategory} update={isUpdate} />
      </Modal>
    </div>
  );
};

export default Category;