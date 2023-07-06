import { CircularProgress } from '@mui/material';

const Spinner = () => {
    return (
        <CircularProgress size={90} sx={{ position: 'absolute', left: '50%', top: '50%' }} />)
}

export default Spinner