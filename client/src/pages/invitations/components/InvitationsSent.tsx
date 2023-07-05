import React from 'react';
import {
    Card, CardContent, Typography, Chip,
    Box, Avatar, IconButton, CircularProgress
} from '@mui/material';

import '../style.css'
import { useQuery } from 'react-query';
import { getInvitationsSent } from '../../../features/api/api';
import { useStore } from '../../../state/store';
import { formatDate } from '../../admin/utils';
import { IconTrashXFilled } from '@tabler/icons-react';


const Invitation: React.FC<any> = () => {

    const token = useStore((state: any) => state.token)
    const { id } = useStore((state: any) => state.user)

    const { data: invisSent, isLoading } = useQuery('invisSent', () =>
        getInvitationsSent(id, token))
    /*    <Avatar
            src={inv.sender.image}
            alt={"user-avatar"}
            sx={{
                border: '4px solid #4ace3c',
                width: 40,
                height: 40,
                mr: -8,
            }}
        />*/
    if (isLoading) return <CircularProgress size={90} sx={{ position: 'absolute', left: '50%', top: '50%' }} />
    return (
        <>
            {invisSent?.map((inv: any) =>
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
                                    Invitation envoyé à
                                    <Box color='red'>
                                        {inv.recipient.name}
                                    </Box>
                                </Typography>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} gap={1} >
                                <Typography variant="h6" component="div">
                                    État :
                                </Typography>
                                <Typography variant="h6" component="div">
                                    <Chip
                                        label={inv.status === 'PENDING' ? 'En Attente'
                                            : inv.status === "ACCEPTED" ? 'Accepté'
                                                : 'Refusé'}
                                        color={inv.status === 'PENDING' ? 'warning'
                                            : inv.status === "ACCEPTED" ? 'primary'
                                                : 'error'} sx={{ color: 'white' }} />
                                </Typography>
                                <IconButton color='error' sx={{ position: 'absolute', right: 80 }}><IconTrashXFilled /></IconButton>
                            </Box>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} marginTop={1}  >
                            <img src={inv.activity.image} height={80} style={{ borderRadius: '50%' }} />
                            <Typography variant="h6" marginTop={1} marginLeft={1} display={'flex'}>
                                <Box color='#539BFF'>Activité</Box> : {inv.activity.type}
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
