import React from 'react';
import {
    Card, CardContent, Typography, Chip,
    Button, Box, Avatar, Theme, useTheme, IconButton
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { changeInvitationStatus } from '../../../features/api/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getInvitationsReceived } from '../../../features/api/api';
import { useStore } from '../../../state/store';
import { formatDate } from '../../admin/utils';
import { IconTrashXFilled } from '@tabler/icons-react';

interface FeedbackEntry {
    id: string;
    feedback: string;
}

const Invitation: React.FC<any> = () => {

    const token = useStore((state: any) => state?.token)
    const user = useStore((state: any) => state?.user)
    const { id } = useStore((state: any) => state?.user)

    const queryClient = useQueryClient()

    const { data: invisReceived } = useQuery('invisReceived', () =>
        getInvitationsReceived(id, token))

    const { mutate: ChangeStatus } =
        useMutation(([invitationId, status]: [invitationId: number, status: string]) =>
            changeInvitationStatus(invitationId, status, token), {
            onSuccess: () => {
                queryClient.invalidateQueries('invisReceived')
                console.log('success')
            }

        });

    const [feedbackEntries, setFeedbackEntries] = React.useState<FeedbackEntry[]>([]);
    //  const [feedback, setFeedback] = React.useState('');
    // const [showFeedbackInput, setShowFeedbackInput] = React.useState(false);

    const theme = useTheme<Theme>();

    /* const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
         setFeedback(event.target.value);
     };*/

    const handleAccept = (invitationId: number) => {
        ChangeStatus([invitationId, 'ACCEPTED'])
    };

    const handleDecline = (invitationId: number) => {
        ChangeStatus([invitationId, 'DECLINED'])
    };

    /*const handleAddFeedback = () => {
        setShowFeedbackInput(true);
    };

    const handleSaveFeedback = () => {
        if (feedback) {
            const newFeedbackEntry: FeedbackEntry = {
                id: Date.now().toString(),
                feedback: feedback,
            };

            setFeedbackEntries([...feedbackEntries, newFeedbackEntry]);
            setFeedback('');
            setShowFeedbackInput(false);
        }
    };*/

    const handleRemoveFeedback = (feedbackId: string) => {
        const updatedFeedbackEntries = feedbackEntries.filter((entry) => entry.id !== feedbackId);
        setFeedbackEntries(updatedFeedbackEntries);
    };
    return (
        <>
            {invisReceived?.map((inv: any) =>
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
                                Invitation reçue de
                                <Box color='red'>
                                    {inv.sender.name}
                                </Box>
                            </Typography>
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
                        <Box display={'flex'} alignItems={'center'} marginTop={1}>
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
                        {inv.status === "PENDING" &&
                            <Box sx={{ display: 'flex', mt: 2 }}>
                                <Button
                                    startIcon={<CheckIcon />}
                                    variant="contained"
                                    onClick={() => {
                                        console.log(inv.id)
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
                                    Accepter
                                </Button>
                                <Button
                                    startIcon={<ClearIcon />}
                                    variant="contained"
                                    onClick={() => handleDecline(inv.id)}
                                    color='error'>
                                    Refuser
                                </Button>
                            </Box>}
                        {/*  <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                            Feedback
                        </Typography>*/}
                        {/*feedbackEntries.length > 0 && (
                            <Box sx={{ mt: 1 }}>
                                {feedbackEntries.map((entry) => (
                                    <Typography variant="body1" key={entry.id} sx={{ mb: 1 }}>
                                        Anes: {entry.feedback}
                                    </Typography>
                                ))}
                            </Box>
                        )}
                        {showFeedbackInput ? (
                            <>
                                <TextField
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    value={feedback}
                                    onChange={handleFeedbackChange}
                                    sx={{ mt: 1 }}
                                    fullWidth
                                />
                                <Button variant="contained" onClick={handleSaveFeedback} sx={{
                                    mt: 1,
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.light,
                                        color: theme.palette.primary.main,
                                    },
                                }}>
                                    Save Feedback
                                </Button>
                            </>
                        ) : (
                            <Button variant="contained" onClick={handleAddFeedback} sx={{
                                mt: 1,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.light,
                                    color: theme.palette.primary.main,
                                },
                            }}>
                                Add Feedback
                            </Button>
                        )*/}
                    </CardContent>
                </Card >)
            }
        </>
    );

}
export default Invitation;
