import React, { useState } from 'react';
import {
    Card, CardContent, Typography,
    Button, Box, Grid, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, Chip, IconButton
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addQuestion, deleteQuestion, getQuestions } from '../../../features/api/api';
import { useStore } from '../../../state/store';
import { IconPlus, IconTrashXFilled } from '@tabler/icons-react';
import { LoadingButton } from '@mui/lab';
import { useForm, SubmitHandler } from 'react-hook-form'
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify'
import { Question } from '../../../features/api/types';


const QuestionSchema = object({
    question: string().nonempty('Champ requis !'),
})
export type QuestionInput = TypeOf<typeof QuestionSchema>;

const Activities: React.FC<any> = () => {

    const queryClient = useQueryClient()

    const token = useStore((state: any) => state.token)
    const setRequestLoading = useStore((state: any) => state.setRequestLoading)
    const requestLoading = useStore((state: any) => state.requestLoading)

    const [open, setOpen] = useState(false)

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<QuestionInput>({
        resolver: zodResolver(QuestionSchema),

    });

    const { data: questions } = useQuery('questions', () =>
        getQuestions(token))

    const { mutate: delQuestion } =
        useMutation((id: number) =>
            deleteQuestion(id, token), {
            onSuccess: () => {
                queryClient.invalidateQueries('questions')
                toast.success("Question supprimé avec succés", { position: "bottom-center", autoClose: 800 })
            }

        });

    const { mutate: addQues } =
        useMutation((question: string) =>
            addQuestion(question, token), {
            onSuccess: () => {
                queryClient.invalidateQueries('questions')
                toast.success("Question ajoute avec succés", { position: "bottom-center", autoClose: 800 })
                reset()
                setRequestLoading(false)
                setOpen(false)
            }
        });

    const onSubmitHandler: SubmitHandler<QuestionInput> = async (values) => {
        addQues(values.question)
    };
    return (
        <>
            {<Button component='label' variant='contained' htmlFor='add-activity'
                onClick={() => setOpen(!open)}
                startIcon={<IconPlus />}
                sx={{
                    color: 'white',
                    mb: 2,
                    '&:hover': {
                        backgroundColor: '#ECF2FF',
                        color: '#4ace3c',
                    },
                }}>
                Ajouter

            </Button>}
            {questions?.map((question: Question) =>
                <Card key={question.id} variant="outlined" sx={{ mb: 2, boxShadow: 4 }} >
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }} >
                        <Box display={"flex"} gap={2} alignItems={'center'}>
                            <Chip label={question.id} color='info' />
                            <Typography variant="h6" component="div" >
                                {question.question} ?
                            </Typography>
                        </Box>
                        <IconButton color='error' onClick={() => delQuestion(question.id)}>
                            <IconTrashXFilled />
                        </IconButton>
                    </CardContent>
                </Card >)
            }
            <Dialog PaperProps={{
                sx: {
                    width: "100%",
                    maxWidth: "420px!important",
                },
            }}
                open={open} onClose={() => {
                    setOpen(false)
                    reset();
                }} >
                <DialogTitle>Ajouter une question pour le Chatbot</DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Grid container direction="column" spacing={2} >
                            <Grid item>
                                <TextField
                                    sx={{ mt: 1 }}
                                    label='Question'
                                    fullWidth
                                    type='text'
                                    error={!!errors.question}
                                    helperText={errors.question?.message}
                                    {...register('question')}
                                />
                            </Grid>
                            <Grid item>
                                <DialogActions>
                                    <Button onClick={() => {
                                        setOpen(false)
                                        reset()
                                    }}>Annuler</Button>
                                    <LoadingButton
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                        loading={requestLoading}
                                        sx={{
                                            color: 'white',
                                            "&:hover": {
                                                backgroundColor: "#49be25",
                                            },
                                        }}
                                    >
                                        Ajouter
                                    </LoadingButton>
                                </DialogActions>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>

            </Dialog>
        </>
    );

}
export default Activities;

