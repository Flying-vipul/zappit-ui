import { Box } from '@mui/material';
import React from 'react'
import Skeleton from '@mui/material/Skeleton';

const SkeletonItem = () => {
    return (
        <><Box sx={{ width: 400 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
        </Box>
        <div className='mt-3'></div>
        <Box sx={{ width: 400 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </Box></>
    );
}

export default SkeletonItem;