import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import {
  createCategoryDashboardAction,
  updateCategoryDashboardAction,
} from "../../../store/actions";
import InputField from "../../shared/InputField";

const AddCategoryForm = ({ setOpen, open, category, update = false }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const addNewCategoryHandler = (data) => {
    if (!update) {
      //dispatch createCategoryDashboardAction
      dispatch(createCategoryDashboardAction(data, setOpen, reset, toast));
    } else {
      //dispatch updateCategoryDashboardAction
      dispatch(
        updateCategoryDashboardAction(data, setOpen, category.id, reset, toast)
      );
    }
  };
  useEffect(() => {
    if (update && category) {
      setValue("categoryName", category?.categoryName);
    }
  }, [update, category]);

  return (
    <div className="py-5">
      <form
        className="space-y-6"
        onSubmit={handleSubmit(addNewCategoryHandler)}
      >
        <InputField
          label="Category Name"
          required
          id="categoryName"
          type="text"
          message="This field is required*"
          placeholder="e.g. Electronics"
          register={register}
          errors={errors}
        />

        <div className="flex w-full justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setOpen(false)}
            type="button"
            className="border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 py-2.5 px-6 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-custom-blue hover:bg-blue-700 text-white py-2.5 px-8 text-sm font-semibold transition-all shadow-md active:scale-95"
          >
            {update ? "Update Category" : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;