import React from 'react';
import {
    Card, CardContent, Typography, Chip,
    Box, Avatar
} from '@mui/material';
import { useQuery } from 'react-query';
import { getAllInvitations } from '../../../features/api/api';
import { useStore } from '../../../state/store';
import { formatDate } from '../utils';
import SkeletonList from '../../../components/shared/SkeletonList';

const Invitation: React.FC<any> = () => {

    const token = useStore((state: any) => state.token);

    //get all activity invitation sent between employees
    const { data: allInvitations, isLoading } = useQuery('allInvitations', () =>
        getAllInvitations(token));

    if (isLoading) return <SkeletonList rowsNum={3} h={185.6} />
    return (
        <>
            {allInvitations?.map((inv: any) =>
                <Card key={inv.id} variant="outlined" sx={{ mb: 2, boxShadow: 4 }} >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box display={"flex"} justifyContent={'space-between'} alignItems={'center'}>
                            <Box display={'flex'} alignItems={'center'} gap={10}>
                                <Avatar
                                    src={inv.sender.image}
                                    alt={"user-avatar"}
                                    sx={{
                                        border: '4px solid #4ace3c',
                                        width: 50,
                                        height: 50,
                                        mr: -8,
                                    }}
                                />
                                <Typography display={'flex'} gap={1} variant="h6" component="div" >
                                    Invitation Sent  from
                                    <Box color='red'>{inv.sender.name}</Box>
                                    to <Box color='red'>{inv.recipient.name}</Box>
                                </Typography>

                                <Avatar
                                    src={inv.recipient.image}
                                    alt={"user-avatar"}
                                    sx={{
                                        border: '4px solid #4ace3c',
                                        width: 50,
                                        height: 50,
                                        ml: -8,
                                    }}
                                />
                            </Box>

                            <Box display={'flex'} alignItems={'center'} marginRight={25} gap={1} >
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
                            </Box>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} gap={1} marginTop={1} >
                            <img src={inv.activity.image} height={80} style={{ borderRadius: '50%' }} />
                            <Typography variant="h6" sx={{ mt: 1 }} display={'flex'}>
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
        </>
    );

}
export default Invitation;
