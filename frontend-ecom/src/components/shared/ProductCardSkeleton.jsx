// ProductCardSkeleton.jsx — animated shimmer skeleton for product cards
const ProductCardSkeleton = () => {
    return (
        <div className="border border-gray-200/60 dark:border-gray-700/50 rounded-2xl bg-white dark:bg-gray-900/50 overflow-hidden flex flex-row sm:flex-col">
            {/* Image placeholder */}
            <div className="w-2/5 sm:w-full shrink-0 aspect-square sm:aspect-3/2 skeleton-shimmer" />

            {/* Content */}
            <div className="w-3/5 sm:w-full p-3 sm:p-5 flex flex-col justify-between">
                <div>
                    {/* Product name */}
                    <div className="h-5 skeleton-shimmer rounded-lg w-3/4 mb-3 sm:mb-0" />

                    {/* Description lines */}
                    <div className="hidden sm:block space-y-2 mt-3">
                        <div className="h-3 skeleton-shimmer rounded-lg w-full" />
                        <div className="h-3 skeleton-shimmer rounded-lg w-5/6" />
                        <div className="h-3 skeleton-shimmer rounded-lg w-4/6" />
                    </div>
                </div>

                {/* Price + Button row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mt-2 sm:mt-5 pt-0 sm:pt-2">
                    <div className="space-y-1.5">
                        <div className="h-3 skeleton-shimmer rounded-lg w-16" />
                        <div className="h-6 skeleton-shimmer rounded-lg w-24" />
                    </div>
                    <div className="h-10 skeleton-shimmer rounded-xl w-full sm:w-32 mt-2 sm:mt-0" />
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
