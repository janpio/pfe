import React, { useState } from 'react';
import {
    Card, CardContent, Typography,
    Button, Box, Grid, Input, FormControl, FormHelperText,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    CardMedia, CardActionArea, IconButton
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
import { toast } from 'react-toastify'

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES: Array<string> = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const ActivitySchema = object({
    type: string().nonempty('Champ requis !'),
    image: custom<File>()
        .refine((file: any) => !!file, { message: 'Vous devez choisir une image !' }) //if fails =>msg
        .refine((file: any) => file?.size < MAX_FILE_SIZE, { message: 'Max file size is 1MB.' })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            { message: 'Only these types are allowed .jpg, .jpeg, .png and .webp' },
        ),

})
export type ActivityInput = TypeOf<typeof ActivitySchema>;

const Activities: React.FC<any> = () => {

    const queryClient = useQueryClient()

    const token = useStore((state: any) => state.token)
    const setRequestLoading = useStore((state: any) => state.setRequestLoading)
    const requestLoading = useStore((state: any) => state.requestLoading)

    const [open, setOpen] = useState(false)

    const {
        register,
        formState: { errors },
        control,
        reset,
        handleSubmit,
    } = useForm<ActivityInput>({
        resolver: zodResolver(ActivitySchema),

    });

    const { data: activities } = useQuery('activities', () =>
        getActivities(token))

    const { mutate: delActivity } =
        useMutation((id: number) =>
            deleteActivity(id, token), {
            onSuccess: () => {
                queryClient.invalidateQueries('activities')
                toast.success("Activité supprimé avec succés", { position: "bottom-center", autoClose: 800 })
            }

        });

    const { mutate: addNewActivity } =
        useMutation((activity: Activity) =>
            addActivity(activity, token), {
            onSuccess: () => {
                queryClient.invalidateQueries('activities')
                toast.success("Activité ajoute avec succés", { position: "bottom-center", autoClose: 800 })
                reset()
                setRequestLoading(false)
                setOpen(false)

            }

        });

    const onSubmitHandler: SubmitHandler<ActivityInput> = async (values) => {
        const form = new FormData()
        setRequestLoading(true);
        form.append("file", values.image)
        form.append("upload_preset", "splash")
        const response = await axios.post("https://api.cloudinary.com/v1_1/dsjjqkvf1/upload", form)
        const imageLink = await response.data.secure_url
        addNewActivity({ type: values.type, image: imageLink })
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
            <Box display={'flex'} flexWrap={'wrap'}>
                {activities?.map((activity: any) =>
                    <Card
                        key={activity.id}
                        variant='outlined'
                        sx={{
                            mb: 2,
                            mr: 2,
                            boxShadow: 4,
                            height: 270,
                            width: 237.5

                        }}
                    >
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
                                <IconButton color='error' onClick={() => delActivity(activity.id)}>
                                    <IconTrashXFilled />
                                </IconButton>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
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
                    <DialogTitle>Ajouter une activité</DialogTitle>
                    <DialogContent >
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <Grid container direction="column" spacing={2} >
                                <Grid item>
                                    <TextField
                                        sx={{ mt: 1 }}
                                        label='Nom'
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
                                                <Typography sx={{ mb: 1 }}>Choisir une image :</Typography>
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
            </Box>
        </>
    );

}
export default Activities;

