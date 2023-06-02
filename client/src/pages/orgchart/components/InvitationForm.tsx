import { FC } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button,
    InputLabel, MenuItem, FormControl, FormHelperText
} from "@mui/material";
import Grid from '@mui/material/Grid'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select from '@mui/material/Select';
import { LoadingButton } from '@mui/lab';
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { coerce, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { useStore } from "../../../state/store";
import { useQuery } from "react-query";
import { getActivities, sendInvitation } from '../../../features/api/api';
import { Activity, Invitation } from "../../../features/api/types";
import { toast } from 'react-toastify'


type InvitationFormProps = {
    showForm: boolean,
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

const invitationSchema = object({
    activity: string()
        .refine((value) => !!value, { message: 'You must select an activity' }),
    date: coerce.date(),
    sender: string(),
    to: string() //.nonempty('You need to choose a teammate'),
});

export type InvitationInput = TypeOf<typeof invitationSchema>;

const InvitationForm: FC<InvitationFormProps> = ({ showForm, setShowForm }) => {

    const token = useStore((state: any) => state.token)
    const teammate = useStore((state: any) => state.teammate)
    const { name, id } = useStore((state: any) => state.user)
    const setRequestLoading = useStore((state: any) => state.setRequestLoading)
    const requestLoading = useStore((state: any) => state.requestLoading)

    const { data: activities } = useQuery<Activity[]>('activity', () => getActivities(token));

    const {
        register,
        formState: { errors },
        control,
        getValues,
        reset,
        handleSubmit,
    } = useForm<InvitationInput>({
        resolver: zodResolver(invitationSchema),
        defaultValues: {
            activity: '',
            date: undefined,
            sender: name,
        }

    });

    const { mutate: sendInvite } =
        useMutation((invitation: Invitation) =>
            sendInvitation(invitation, token), {
            onMutate: () => {
                setRequestLoading(true)
            },
            onError: (err) => {
                setRequestLoading(false)
                toast.error("Something went wrong !!", { position: "bottom-center" })
                console.log(err);
            }
            , onSuccess: () => {
                setRequestLoading(false)
                toast.success("Invitation send succesfully", { position: "bottom-center" })
                setTimeout(() => {
                    setShowForm(false);
                    reset();
                }, 2000)
            }
        });

    const onSubmitHandler: SubmitHandler<InvitationInput> = (values) => {
        console.log(getValues())
        sendInvite({
            sender: id,
            recipient: teammate.name,
            activity: values.activity,
            date: values.date,
        })
    };

    return (
        <div>
            <Dialog PaperProps={{
                sx: {
                    width: "100%",
                    maxWidth: "420px!important",
                },
            }}
                open={showForm} onClose={() => {
                    setShowForm(false);
                    reset();
                }} >
                <DialogTitle>Invite a Teammate to an Activity</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Grid container direction="column" spacing={2} >
                            <Grid item>
                                <Controller
                                    name="activity"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <FormControl sx={{ mt: 1 }} fullWidth error={!!error} >
                                            <InputLabel id="activity-select">Activity</InputLabel>
                                            <Select
                                                labelId="activity-select"
                                                id="activity-select-id"
                                                value={field.value || ""}
                                                label="Activity"
                                                onChange={field.onChange}
                                            >
                                                {activities?.map((activity) => (
                                                    <MenuItem key={activity.id} value={activity.type}>
                                                        {activity.type}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {error && <FormHelperText>{error?.message}</FormHelperText>}
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item>
                                <Controller
                                    name="date"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                reduceAnimations
                                                inputFormat="D MMMM YYYY HH:mm A"
                                                label="Date"
                                                disableMaskedInput
                                                minDate={'2023-01-01'}
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                                renderInput={(params) =>
                                                    <TextField {...params}
                                                        sx={{ width: '370px' }}
                                                        helperText={error?.message}
                                                        error={!!error} //!! convert the error props value to Boolean
                                                    />}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Teammate to invite"
                                    value={teammate?.name || " "}
                                    fullWidth
                                    type="text"
                                    error={!!errors?.to}
                                    helperText={errors?.to?.message}
                                    {...register('to')}
                                />
                            </Grid>
                            <Grid item>
                                <DialogActions>
                                    <Button onClick={() => {
                                        setShowForm(false)
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
                                        Invite
                                    </LoadingButton>
                                </DialogActions>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>

            </Dialog>
        </div >
    )
}



export default InvitationForm