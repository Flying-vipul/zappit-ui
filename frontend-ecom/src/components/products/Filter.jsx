import { FormControl, InputLabel, MenuItem, Select, Tooltip, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
const Filter = ({categories}) => {
    // const categories = [
    //     { categoryId: 1, categoryName: "Electronics" },
    //     { categoryId: 2, categoryName: "Clothing" },
    //     { categoryId: 3, categoryName: "Furniture" },
    //     { categoryId: 4, categoryName: "Books" },
    //     { categoryId: 5, categoryName: "Toys" },
    //     { categoryId: 5, categoryName: "Sports" },


    // ];

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const currentSortOrder = searchParams.get("sortby") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";

        setCategory(currentCategory);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);
    }, [searchParams]);

    useEffect(()=>{
        const handler = setTimeout(() => {
            if(searchTerm){
                searchParams.set("keyword",searchTerm);
            }else{
                searchParams.delete("keyword");
            }
            navigate(`${pathname}?${searchParams.toString()}`)
        }, 700);

        return () => {
            clearTimeout(handler);
        }
    },[searchParams,searchTerm,navigate,pathname])



    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;

        if (selectedCategory == "all") {
            params.delete("category")
        } else {
            params.set("category", selectedCategory)
        }
        navigate(`${pathname}?${params}`);
        setCategory(event.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => {
            const newOrder = (prevOrder === "asc") ? "desc" : "asc";
            params.set("sortby", newOrder);
            navigate(`${pathname}?${params}`);
            return newOrder;
        })
    };

    const handleSearch = (e) => {
    const keyword = e.target.value;
    
    // FIX: If the user types only spaces, don't update the URL
    if (keyword.trim() === "") {
        setSearchParams({}); // Clear the query
    } else {
        setSearchParams({ keyword: keyword });
    }
}

    const handleClearFilters = () => {
        navigate({ pathname : window .location.pathname });

    };

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            {/* ----SEARCH BAR---- */}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input
                    onClick={handleSearch}
                    type="text"
                    placeholder="Search Products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className=" border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]" />
                <FiSearch className="absolute left-3 text-slate-800 size={20}" />
            </div>

            {/* --Category Selection */}
            <div className="flex sm:flex-row flex-col gap-4 items-center">
                <FormControl
                    className="text-slate-800 border-slate-700"
                    variant="outlined"
                    size="small">
                    <InputLabel>Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                        className="min-w-[120px] text-slate-800 border-slate-700"
                    >
                        <MenuItem value="all">All</MenuItem>
                        {categories.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>
                                {item.categoryName}
                            </MenuItem>
                        ))}
                    </Select>

                </FormControl>

                {/* SORT BUTTON & CLEAR BUTTON */}
                <Tooltip title="Sorted by price:asc">
                    <Button variant="contained"
                        color="primary"
                        className="flex items-center gap-2 h-10"
                        onClick={toggleSortOrder}>
                        Sort By
                        {sortOrder === "asc" ? (
                            <FiArrowUp size={20} />
                        ) : (
                            <FiArrowDown size={20} />
                        )}
                    </Button>

                </Tooltip>
                <button
                onClick={handleClearFilters}
                    className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none ">
                    <FiRefreshCw className="font-semibold" size={16} />
                    <span className="font-semibold ">Clear</span>
                </button>
            </div>
        </div>
    )
}

export default Filter;