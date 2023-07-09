import { useState } from 'react';
import {
    Card, CardContent, Typography, Chip, Pagination,
    Box, Avatar, Theme, useTheme, IconButton,
    CircularProgress
} from '@mui/material';
import SkeletonList from '../../../components/shared/SkeletonList';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {
    changeInvitationStatus, getInvitationsReceived,
    deleteInvitation
} from '../../../features/api/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useStore } from '../../../state/store';
import { formatDate } from '../../admin/utils';
import { IconTrashXFilled } from '@tabler/icons-react';
import { LoadingButton } from '@mui/lab';


const InvitationsReceived: React.FC<any> = () => {

    const token = useStore((state: any) => state?.token)
    const { id } = useStore((state: any) => state?.user)


    const [clickedItem, SetClickItem] = useState(0)
    const [newStatus, setNewStatus] = useState('')


    const queryClient = useQueryClient()

    const { data: invisReceived, isLoading } = useQuery('invisReceived', () =>
        getInvitationsReceived(id, token))

    const { mutate: ChangeStatus, isLoading: statusLoading } =
        useMutation(([invitationId, status]: [invitationId: number, status: string]) =>
            changeInvitationStatus(invitationId, status, token), {

            onSuccess: () => {
                queryClient.invalidateQueries('invisReceived')
                console.log('success')
            }

        });
    const { mutate: deleteInvi, isLoading: deleteLoading } =
        useMutation((invitationId: number) =>
            deleteInvitation(invitationId, token), {
            onSuccess: () => {
                queryClient.invalidateQueries('invisReceived')
                console.log('success')
            }

        });


    const theme = useTheme<Theme>();


    const handleAccept = (invitationId: number) => {
        ChangeStatus([invitationId, 'ACCEPTED'])
        SetClickItem(invitationId)
        setNewStatus('ACCEPTED')
    };

    const handleDecline = (invitationId: number) => {
        ChangeStatus([invitationId, 'DECLINED'])
        SetClickItem(invitationId)
        setNewStatus('DECLINED')

    };

    //pagination
    const items = 4;
    const [current, setCurrent] = useState(1);
    const NbPage = Math.ceil(invisReceived?.length / items);

    const startIndex = (current - 1) * items;
    const endIndex = startIndex + items;

    const DataPerPage = invisReceived?.slice(startIndex, endIndex);
    const handleChangePage = (e: any, page: any) => {
        setCurrent(page)
    }

    if (isLoading) return <SkeletonList rowsNum={3} h={185.6} />;
    if (!invisReceived) return <></>;
    console.log(NbPage)
    return (
        <>
            {invisReceived && DataPerPage?.map((inv: any) =>
                <Card key={inv.id} variant="outlined" sx={{ mb: 2, boxShadow: 4 }} >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box display={"flex"} gap={10} alignItems={'center'}>
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
                            <Typography display={'flex'} gap={1} variant="h6" component="div">
                                Invitation received from
                                <Box color='red'>
                                    {inv.sender.name}
                                </Box>
                            </Typography>
                            <Box display={'flex'} alignItems={'center'} gap={1} >
                                <Typography variant="h6" component="div">
                                    State :
                                </Typography>
                                <Typography variant="h6" component="div">
                                    <Chip
                                        label={inv?.status}
                                        color={inv?.status === 'PENDING' ? 'warning'
                                            : inv?.status === "ACCEPTED" ? 'primary'
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
                                </IconButton>

                            </Box>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} marginTop={1}>
                            <img src={inv?.activity?.image} height={80} style={{ borderRadius: '50%' }} />
                            <Typography variant="h6" marginTop={1} marginLeft={1} display={'flex'}>
                                <Box color='#539BFF'>Activity</Box> : {inv.activity.type}
                            </Typography>
                            <Typography
                                variant='h6'
                                display={'flex'}
                                marginLeft={10}
                                marginTop={1}>
                                <Box color='#539BFF'> Date : </Box>
                                {formatDate(inv?.date)}
                            </Typography>
                        </Box>
                        {inv?.status === "PENDING" &&
                            <Box sx={{ display: 'flex', mt: 2 }}>
                                <LoadingButton
                                    loading={clickedItem == inv.id &&
                                        newStatus == "ACCEPTED" &&
                                        statusLoading}
                                    startIcon={<CheckIcon />}
                                    variant="contained"
                                    onClick={() => {
                                        handleAccept(inv.id)
                                    }}
                                    sx={{
                                        mr: 1,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.light,
                                            color: theme.palette.primary.main,
                                        },
                                    }}>
                                    Accept
                                </LoadingButton>
                                <LoadingButton
                                    loading={clickedItem == inv.id && newStatus == "DECLINED" && statusLoading}
                                    startIcon={<ClearIcon />}
                                    variant="contained"
                                    onClick={() => handleDecline(inv.id)}
                                    color='error'>
                                    Refuse
                                </LoadingButton>
                            </Box>}
                    </CardContent>
                </Card >)
            }
            {
                NbPage != 1 && <Pagination color='primary'
                    count={NbPage}
                    page={current}
                    onChange={handleChangePage} />
            }
        </>
    );

}
export default InvitationsReceived;
