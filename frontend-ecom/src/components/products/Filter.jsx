import { FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
const Filter = ({categories}) => {

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
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full mb-6 p-4 md:p-4
            bg-white/70 dark:bg-gray-900/50 backdrop-blur-lg md:bg-white/70 md:dark:bg-gray-900/50
            rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800
            md:shadow-sm transition-all duration-300 animate-fade-in-down">
            {/* ----SEARCH BAR---- */}
            <div className="relative flex items-center w-full md:w-auto flex-1 max-w-lg group">
                <input
                    onClick={handleSearch}
                    type="text"
                    placeholder="Search Products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-sm text-slate-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700
                        rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400
                        transition-all duration-300 shadow-sm hover:shadow-md" />
                <FiSearch className="absolute left-3 text-gray-400 dark:text-gray-500 transition-colors duration-200 group-focus-within:text-indigo-500" size={18} />
            </div>

            {/* --Filters & Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
                <FormControl
                    size="small"
                    sx={{ 
                        minWidth: 130, 
                        '& .MuiOutlinedInput-root': { 
                            borderRadius: '12px', 
                            backgroundColor: 'background.paper',
                            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)',
                            }
                        } 
                    }}
                >
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                    >
                        <MenuItem value="all">All Categories</MenuItem>
                        {categories.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>
                                {item.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* SORT BUTTON */}
                <Tooltip title={`Sorted by price: ${sortOrder}`}>
                    <button
                        onClick={toggleSortOrder}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400
                            border border-indigo-100 dark:border-indigo-800/50 rounded-xl shadow-sm
                            hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:shadow-md hover:shadow-indigo-500/10
                            transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 h-[40px]"
                    >
                        <span className="text-sm font-semibold">Price</span>
                        {sortOrder === "asc" ? (
                            <FiArrowUp className="text-indigo-600 dark:text-indigo-400 font-bold" size={16} />
                        ) : (
                            <FiArrowDown className="text-indigo-600 dark:text-indigo-400 font-bold" size={16} />
                        )}
                    </button>
                </Tooltip>

                {/* CLEAR BUTTON */}
                <button
                    onClick={handleClearFilters}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400
                        border border-rose-100 dark:border-rose-800/40 rounded-xl shadow-sm
                        hover:bg-rose-100 dark:hover:bg-rose-900/40 hover:shadow-md hover:shadow-rose-500/10
                        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50 h-[40px]"
                >
                    <FiRefreshCw size={16} className={searchTerm || category !== 'all' ? 'animate-spin-once' : ''} />
                    <span className="text-sm font-semibold">Clear</span>
                </button>
            </div>
        </div>
    )
}

export default Filter;