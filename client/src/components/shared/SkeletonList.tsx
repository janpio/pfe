import { Skeleton } from "@mui/material";

const SkeletonList = ({ rowsNum, h, w }: any) => {
    return <>
        {[...Array(rowsNum)].map((row, i) =>
            <Skeleton variant="rectangular"
                key={i}
                height={h}
                width={w}
                sx={{ mb: 2, mr: 2 }} />
        )}
    </>
};

export default SkeletonList
