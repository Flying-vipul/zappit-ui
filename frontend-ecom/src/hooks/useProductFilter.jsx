import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom"
import { fetchProducts } from "../store/actions";

const useProductFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();

        // 1. Handle Page
        const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
        params.set("pageNumber", currentPage - 1);

        // 2. Handle Sort
        const sortOrder = searchParams.get("sortby") || "asc";
        params.set("sortBy", "price");
        params.set("sortOrder", sortOrder);

        // 3. Handle Category
        const categoryParams = searchParams.get("category") || null;
        if (categoryParams) {
            params.set("category", categoryParams);
        }

        // 4. Handle Keyword (FIXED HERE)
        // ✅ Read "keyword" from URL, not "category"
        const keyword = searchParams.get("keyword") || null; 
        if (keyword) {
            params.set("keyword", keyword);
        }

        const queryString = params.toString();
        
        // Debug to verify
        console.log("DEBUG: Query sent to backend:", queryString);

        dispatch(fetchProducts(queryString));

    }, [dispatch, searchParams]);
};

export default useProductFilter;