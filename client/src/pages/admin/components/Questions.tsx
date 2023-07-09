import { useState } from 'react';
import {
    Card, CardContent, Typography, IconButton,
    Button, Box, Grid, Dialog, DialogTitle, CircularProgress,
    DialogContent, DialogActions, TextField, Chip, Pagination
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
import SkeletonList from '../../../components/shared/SkeletonList';


const QuestionSchema = object({
    question: string().nonempty('Required !'),
})
export type QuestionInput = TypeOf<typeof QuestionSchema>;

const Activities: React.FC<any> = () => {

    const queryClient = useQueryClient();

    const token = useStore((state: any) => state.token);
    const setRequestLoading = useStore((state: any) => state.setRequestLoading);
    const requestLoading = useStore((state: any) => state.requestLoading);

    const [open, setOpen] = useState(false);
    const [clickedItem, SetClickItem] = useState(null)

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<QuestionInput>({
        resolver: zodResolver(QuestionSchema),

    });

    //get all questions
    const { data: questions, isLoading } = useQuery('questions', () =>
        getQuestions(token))

    //delete question
    const { mutate: delQuestion, isLoading: deleteLoading } =
        useMutation((id: number) =>
            deleteQuestion(id, token), {
            onSuccess: () => {
                queryClient.invalidateQueries('questions');
                toast.success("Question deleted  successfully", { position: "bottom-center", autoClose: 800 });

            }

        });

    //add question
    const { mutate: addQues } =
        useMutation((question: string) =>
            addQuestion(question, token), {
            onMutate: () => {
                setRequestLoading(true)
            },
            onSuccess: () => {
                queryClient.invalidateQueries('questions');
                toast.success("Question added  successfully", { position: "bottom-center", autoClose: 800 });
                reset();
                setRequestLoading(false);
                setOpen(false);
            }
        });

    const onSubmitHandler: SubmitHandler<QuestionInput> = async (values) => {
        addQues(values.question);
    };

    //pagination 
    const items = 4;
    const [current, setCurrent] = useState(1);
    const NbPage = Math.ceil(questions?.length / items);

    const startIndex = (current - 1) * items;
    const endIndex = startIndex + items;

    const DataPerPage = questions?.slice(startIndex, endIndex);
    const handleChangePage = (e: any, page: any) => {
        setCurrent(page)
    }


    return (
        <>
            <Button component='label' variant='contained' htmlFor='add-activity'
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
                Add

            </Button>

            {isLoading && <SkeletonList rowsNum={4} h={80} />}

            {DataPerPage?.map((question: Question) =>
                <Card key={question.id} variant="outlined" sx={{ mb: 2, boxShadow: 4 }} >
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }} >
                        <Box display={"flex"} gap={2} alignItems={'center'}>
                            <Chip label={question.id} color='info' />
                            <Typography variant="h6" component="div" >
                                {question.question} ?
                            </Typography>
                        </Box>
                        <IconButton color='error' onClick={() => {
                            delQuestion(question.id)
                            SetClickItem(question.id)
                        }}>
                            {deleteLoading && question.id == clickedItem
                                ? <CircularProgress size={30} color='error' />
                                : <IconTrashXFilled />}</IconButton>
                    </CardContent>
                </Card >)
            }
            {NbPage != 1 && <Pagination color='primary'
                count={NbPage}
                page={current}
                onChange={handleChangePage} />}

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
                <DialogTitle>Add a question for the Chatbot</DialogTitle>
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
                                    }}>Cancel</Button>
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
                                        Add
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

