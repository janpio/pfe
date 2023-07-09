import { useState } from 'react';
import {
    Card, CardContent, Typography, Chip,
    Box, Avatar, IconButton, Pagination,
    CircularProgress
} from '@mui/material';
import SkeletonList from '../../../components/shared/SkeletonList';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getInvitationsSent, deleteInvitation } from '../../../features/api/api';
import { useStore } from '../../../state/store';
import { formatDate } from '../../admin/utils';
import { IconTrashXFilled } from '@tabler/icons-react';

import '../style.css'


const InvitationsSent: React.FC<any> = () => {

    const token = useStore((state: any) => state.token)
    const { id } = useStore((state: any) => state.user)

    const queryClient = useQueryClient()

    const [clickedItem, SetClickItem] = useState(0)


    const { data: invisSent, isLoading } = useQuery('invisSent', () =>
        getInvitationsSent(id, token))

    const { mutate: deleteInvi, isLoading: deleteLoading } =
        useMutation((invitationId: number) =>
            deleteInvitation(invitationId, token), {
            onSuccess: () => {
                queryClient.invalidateQueries('invisSent')
                console.log('success')
            }

        });

    //pagination 
    const items = 4;
    const [current, setCurrent] = useState(1);
    const NbPage = Math.ceil(invisSent?.length / items);

    const startIndex = (current - 1) * items;
    const endIndex = startIndex + items;

    const DataPerPage = invisSent?.slice(startIndex, endIndex);
    const handleChangePage = (e: any, page: any) => {
        setCurrent(page)
    }


    if (isLoading) return <SkeletonList rowsNum={3} h={185.6} />;
    if (!invisSent) return <></>;

    return (
        <>
            {invisSent && DataPerPage?.map((inv: any) =>
                <Card key={inv.id} variant="outlined" sx={{ mb: 2, boxShadow: 4 }} >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}  >
                        <Box display={"flex"} gap={10} alignItems={'center'}>
                            <Box display={'flex'} alignItems={'center'} gap={2}>
                                <Avatar
                                    src={inv.recipient.image}
                                    alt={"user-avatar"}
                                    sx={{
                                        border: '4px solid #4ace3c',
                                        width: 50,
                                        height: 50,
                                    }}
                                />
                                <Typography display={'flex'} gap={1} variant="h6" component="div">
                                    Invitation sent to
                                    <Box color='red'>
                                        {inv.recipient.name}
                                    </Box>
                                </Typography>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} gap={1} >
                                <Typography variant="h6" component="div">
                                    State :
                                </Typography>
                                <Typography variant="h6" component="div">
                                    <Chip
                                        label={inv.status}
                                        color={inv.status === 'PENDING' ? 'warning'
                                            : inv.status === "ACCEPTED" ? 'primary'
                                                : 'error'} sx={{ color: 'white' }} />
                                </Typography>
                                <IconButton onClick={() => {
                                    deleteInvi(inv.id);
                                    SetClickItem(inv.id);
                                }}
                                    color='error'
                                    sx={{ position: 'absolute', right: 120 }}>
                                    {deleteLoading && clickedItem == inv.id ?
                                        <CircularProgress size={30} color='error' /> : <IconTrashXFilled />
                                    }
                                </IconButton>                            </Box>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} marginTop={1}  >
                            <img src={inv.activity.image} height={80} style={{ borderRadius: '50%' }} />
                            <Typography variant="h6" marginTop={1} marginLeft={1} display={'flex'}>
                                <Box color='#539BFF'>Activity</Box> : {inv.activity.type}
                            </Typography>
                            <Typography
                                variant='h6'
                                display={'flex'}
                                marginLeft={10}
                                marginTop={1}>
                                <Box color='#539BFF'> Date : </Box>
                                {formatDate(inv.date)}

                            </Typography>
                        </Box>


                    </CardContent>
                </Card >)
            }
            {!invisSent &&
                (NbPage != 1 && <Pagination color='primary'
                    count={NbPage}
                    page={current}
                    onChange={handleChangePage} />)
            }
        </>
    );

}
export default InvitationsSent;
