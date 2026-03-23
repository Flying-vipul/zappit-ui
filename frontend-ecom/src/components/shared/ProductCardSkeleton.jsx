// ProductCardSkeleton.jsx — animated shimmer skeleton for product cards
const ProductCardSkeleton = () => {
    return (
        <div className="border rounded-lg shadow-md bg-white overflow-hidden animate-pulse flex flex-row sm:flex-col">
            {/* Image placeholder */}
            <div className="w-2/5 sm:w-full shrink-0 aspect-square sm:aspect-3/2 bg-gray-200" />

            {/* Content */}
            <div className="w-3/5 sm:w-full p-3 sm:p-4 flex flex-col justify-between">
                <div>
                    {/* Product name */}
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 sm:mb-0" />

                    {/* Description lines */}
                    <div className="hidden sm:block space-y-2 mt-2 sm:mt-3">
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-5/6" />
                        <div className="h-3 bg-gray-200 rounded w-4/6" />
                    </div>
                </div>

                {/* Price + Button row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mt-2 sm:mt-4 pt-0 sm:pt-2">
                    <div className="space-y-1">
                        <div className="h-3 bg-gray-200 rounded w-16" />
                        <div className="h-5 bg-gray-200 rounded w-20" />
                    </div>
                    <div className="h-8 sm:h-9 bg-gray-200 rounded-lg w-full sm:w-32 mt-2 sm:mt-0" />
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
