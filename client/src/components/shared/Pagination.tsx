import { useState } from 'react';
import { Pagination as Pag } from '@mui/material';


export const Pagination = ({ data }: any) => {

    const items = 4;

    const [current, setCurrent] = useState(1);
    const NbPage = Math.ceil(data?.length / items);

    const startIndex = (current - 1) * items;
    const endIndex = startIndex + items;

    const DataPerPage = data?.slice(startIndex, endIndex);

    const handleChange = (e: any, page: any) => {
        setCurrent(page)
    }

    return (
        <Pag count={NbPage} page={current} onChange={handleChange} />
    )
}

