import React, { useState } from 'react';
import {
    Card, CardContent, Typography,
    Button, Box, Grid, Input, FormControl, FormHelperText,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    CardMedia, CardActionArea, IconButton, CircularProgress, Pagination
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getActivities, addActivity, deleteActivity } from '../../../features/api/api';
import { useStore } from '../../../state/store';
import { IconPlus, IconTrashXFilled } from '@tabler/icons-react';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { custom, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Activity } from '../../../features/api/types';
import { toast } from 'react-toastify';
import SkeletonList from '../../../components/shared/SkeletonList';

// for activity input validation
const MAX_FILE_SIZE = 1000000;  // max size of image
const ACCEPTED_IMAGE_TYPES: Array<string> = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ActivitySchema = object({
    type: string().nonempty('Required !'),
    image: custom<File>()
        .refine((file: any) => !!file, { message: 'Choose an image !' }) //if fails =>msg
        .refine((file: any) => file?.size < MAX_FILE_SIZE, { message: 'Max file size is 1MB.' })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            { message: 'Only these types are allowed .jpg, .jpeg, .png and .webp' },
        ),

})
export type ActivityInput = TypeOf<typeof ActivitySchema>;

const Activities: React.FC<any> = () => {

    const queryClient = useQueryClient();

    const token = useStore((state: any) => state.token);
    const setRequestLoading = useStore((state: any) => state.setRequestLoading);
    const requestLoading = useStore((state: any) => state.requestLoading);

    const [open, setOpen] = useState(false)
    const [clickedItem, SetClickItem] = useState(null)


    const {
        register,
        formState: { errors },
        control,
        reset,
        handleSubmit,
    } = useForm<ActivityInput>({
        resolver: zodResolver(ActivitySchema),

    });

    //get all activities
    const { data: activities, isLoading } = useQuery('activities', () =>
        getActivities(token));

    //delete activity
    const { mutate: delActivity, isLoading: delLoading } =
        useMutation((id: number) =>
            deleteActivity(id, token), {
            onSuccess: () => {
                queryClient.invalidateQueries('activities');
                toast.success("Activity deleted successfully", { position: "bottom-center", autoClose: 800 });
            }

        });

    //add new activity
    const { mutate: addNewActivity } =
        useMutation((activity: Activity) =>
            addActivity(activity, token), {
            onError: () => {
                setRequestLoading(false);
            },
            onSuccess: () => {
                queryClient.invalidateQueries('activities');
                toast.success("Activity added successfully", { position: "bottom-center", autoClose: 800 });
                reset();
                setRequestLoading(false);
                setOpen(false);

            }

        });

    //used cloudinary to host images
    const onSubmitHandler: SubmitHandler<ActivityInput> = async (values) => {
        const form = new FormData();
        setRequestLoading(true);
        form.append("file", values.image);
        form.append("upload_preset", "splash");
        const response = await axios.post("https://api.cloudinary.com/v1_1/dsjjqkvf1/upload", form);
        const imageLink = await response.data.secure_url;
        addNewActivity({ type: values.type, image: imageLink });
    };

    //pagination , ill optimize this later 

    //pagination 
    const items = 4;
    const [current, setCurrent] = useState(1);
    const NbPage = Math.ceil(activities?.length / items);

    const startIndex = (current - 1) * items;
    const endIndex = startIndex + items;

    const DataPerPage = activities?.slice(startIndex, endIndex);
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

            {isLoading &&
                <Box display={'flex'} flexDirection={'row'}>
                    <SkeletonList rowsNum={4} h={270} w={237.5} />
                </Box>
            }

            <Box display={'flex'} flexWrap={'wrap'}>
                {DataPerPage?.map((activity: any) =>
                    <Card
                        key={activity.id}
                        variant='outlined'
                        sx={{
                            mb: 2,
                            mr: 2,
                            boxShadow: 4,
                            height: 270,
                            width: 237.5
                        }}>
                        <CardActionArea disableRipple component={'span'}> {/*span to solve validateDOMNesting button Warning,nested buttons*/}
                            <CardMedia
                                component="img"
                                image={activity.image}
                                alt={activity.image}
                                sx={{ height: 200 }}
                            />
                            <CardContent sx={{
                                display: 'flex', flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Typography variant="h5" component="div">
                                    {activity.type}
                                </Typography>
                                <IconButton color='error' onClick={() => {
                                    delActivity(activity.id)
                                    SetClickItem(activity.id)
                                }}>
                                    {delLoading && activity.id == clickedItem
                                        ? <CircularProgress size={30} color='error' />
                                        : <IconTrashXFilled />}
                                </IconButton>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
                }
                <Pagination color='primary'
                    count={NbPage}
                    page={current}
                    onChange={handleChangePage} />

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
                    <DialogTitle>Add an activity</DialogTitle>
                    <DialogContent >
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <Grid container direction="column" spacing={2} >
                                <Grid item>
                                    <TextField
                                        sx={{ mt: 1 }}
                                        label='Activity'
                                        fullWidth
                                        type='text'
                                        error={!!errors.type}
                                        helperText={errors.type?.message}
                                        {...register('type')}
                                    />
                                </Grid>
                                <Grid item>
                                    <Controller
                                        name="image"
                                        control={control}

                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl error={!!error} >
                                                <Typography sx={{ mb: 1 }}>Choose an image :</Typography>
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    sx={{
                                                        color: 'white', "&:hover": {
                                                            backgroundColor: "#49be25",
                                                        },
                                                    }}
                                                >
                                                    <Input
                                                        type="file"
                                                        sx={{ color: 'white', textDecoration: 'none' }}
                                                        onChange={(e: any) => {
                                                            field.onChange(e.target.files[0]);
                                                        }}
                                                        hidden
                                                    />
                                                </Button>
                                                <FormHelperText>{error?.message}</FormHelperText>

                                            </FormControl>

                                        )}
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
            </Box >
        </>
    );

}
export default Activities;

