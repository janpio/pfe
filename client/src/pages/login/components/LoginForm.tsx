import { Box, Typography, Button, Stack, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify'
import { loginUserFn } from '../../../features/api/api';
import { useStore } from '../../../state/store';


const loginSchema = object({
    email: string().nonempty('Email is required').email('Email is invalid')
        .refine((value) => value.endsWith('fisglobal.com'), {
            message: 'Email must end with fisglobal.com',
        }),
    password: string().nonempty('Password is required')
});
export type LoginInput = TypeOf<typeof loginSchema>;

const LoginForm = () => {

    const setRequestLoading = useStore((state: any) => state.setRequestLoading)
    const requestLoading = useStore((state: any) => state.requestLoading)
    const login = useStore((state: any) => state.login)


    const {
        register,
        setError,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
        loginUser(values);
    };

    const { mutate: loginUser, isSuccess } =
        useMutation((userData: LoginInput) => loginUserFn(userData), {
            onMutate() {
                setRequestLoading(true);
            },
            onSuccess({ token, user }) {
                setRequestLoading(false);
                login(user, token)
                toast.success("Successfully logged in", { position: "top-center", autoClose: 800 })
            },
            onError(error: any) {
                setRequestLoading(false);
                setError('email', { type: 'custom', message: error.response.data?.message },);
                setError('password', { type: 'custom', message: error.response.data?.message });
            }
        });

    useEffect(() => {
        if (isSubmitSuccessful && isSuccess) {
            reset();
        }
    }, [isSubmitSuccessful, isSuccess])
    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)} autoComplete='off' noValidate>
                <Stack>
                    <Box sx={{ mt: '30px' }}>
                        <TextField
                            label='Email'
                            fullWidth
                            required
                            type='email'
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            {...register('email')}
                        />
                    </Box>
                    <Box mt="25px">
                        <TextField
                            label='Password'
                            fullWidth
                            required
                            type='password'
                            error={!!errors['password']}
                            helperText={errors['password'] ? errors['password'].message : ''}
                            {...register('password')}
                        />
                    </Box>
                    <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                        {/*<Typography
                            fontWeight="600"
                            sx={{
                                textDecoration: 'none',
                                color: 'primary.main',
                            }}>
                            Forgot Password ?
                        </Typography>*/}
                    </Stack>
                </Stack>
                <Box>
                    <LoadingButton
                        variant="contained"
                        size="large"
                        fullWidth
                        loading={requestLoading}
                        type="submit"
                        sx={{
                            color: 'white', "&:hover": {
                                backgroundColor: "#49be25",
                            },
                        }}
                    >
                        Login
                    </LoadingButton>
                </Box>

            </form>
        </>
    )
}

export default LoginForm