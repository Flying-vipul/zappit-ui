import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom"
import {  getOrdersForDashboard } from "../store/actions";

const useOrderFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();

        // 1. Handle Page
        const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
        params.set("pageNumber", currentPage - 1);

      
        const queryString = params.toString();
        
        // Debug to verify
        console.log("DEBUG: Query sent to backend:", queryString);

        dispatch(getOrdersForDashboard(queryString));

    }, [dispatch, searchParams]);
};

export default useOrderFilter

