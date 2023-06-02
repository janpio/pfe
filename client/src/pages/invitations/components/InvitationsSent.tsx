import React from 'react';
import {
    Card, CardContent, Typography, Chip,
    Button, Box, TextField, Theme, useTheme
} from '@mui/material';
import { useQuery } from 'react-query';
import { getInvitationsSent } from '../../../features/api/api';
import { useStore } from '../../../state/store';

interface InvitationProps {
    sender: string;
    activity: string;
    onAccept: () => void;
    onDecline: () => void;
}

interface FeedbackEntry {
    id: string;
    feedback: string;
}

const Invitation: React.FC<any> = ({ sender, activity, onAccept, onDecline }) => {

    const token = useStore((state: any) => state.token)
    const { id } = useStore((state: any) => state.user)

    const { data: invisSent } = useQuery('invisSent', () =>
        getInvitationsSent(id, token))

    console.log(invisSent);


    const [feedbackEntries, setFeedbackEntries] = React.useState<FeedbackEntry[]>([]);
    const [feedback, setFeedback] = React.useState('');
    const [showFeedbackInput, setShowFeedbackInput] = React.useState(false);

    const theme = useTheme<Theme>();

    const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFeedback(event.target.value);
    };

    const handleAddFeedback = () => {
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
    };

    const handleRemoveFeedback = (feedbackId: string) => {
        const updatedFeedbackEntries = feedbackEntries.filter((entry) => entry.id !== feedbackId);
        setFeedbackEntries(updatedFeedbackEntries);
    };
    return (
        <>
            {invisSent?.map((inv: any) =>
                <Card key={inv.id} variant="outlined" sx={{ mb: 2, boxShadow: 4 }} >
                    <CardContent  >
                        <Box display={"flex"} gap={10} alignItems={'center'}>
                            <Typography variant="h6" component="div">
                                Invitation sent to  {inv.recipient?.name}
                            </Typography>
                            <Box display={'flex'} alignItems={'center'} gap={1} >
                                <Typography variant="h6" component="div">
                                    Status :
                                </Typography>
                                <Typography variant="h6" component="div">
                                    <Chip label={inv.status} color={inv.status === 'PENDING' ? 'warning'
                                        : inv.status === "ACCEPTED" ? 'primary'
                                            : 'error'} sx={{ color: 'white' }} />
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            Activity: {inv.activity.type}
                        </Typography>

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
