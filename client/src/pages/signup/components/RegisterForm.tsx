import { Box, Typography, Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form'
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { useMutation } from 'react-query';
import { signUpUserFn } from '../../../features/api/api';
import useAuthStore from '../../../store';

const registerSchema = object({
    name: string().nonempty('Name is required'),
    email: string().nonempty('Email is required').email('Email is invalid'),
    password: string().nonempty('Password is required').min(8, 'Password must be at least 8 characters')
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterForm = () => {
    const store = useAuthStore()
    const navigate = useNavigate()

    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        setError,
        handleSubmit,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
        registerUser(values);
    };

    const { mutate: registerUser, isSuccess } =
        useMutation((userData: RegisterInput) => signUpUserFn(userData), {
            onMutate() {
                store.setRequestLoading(true);
            },
            onSuccess({ token, user }) {
                store.login(user, token)
                store.setRequestLoading(false);
            },

            onError(error: any) {
                setError('email', { type: 'custom', message: error.response.data.message });
                store.setRequestLoading(false);
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
                            label='Name'
                            fullWidth
                            required
                            type='text'
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            {...register('name')}
                        />
                    </Box>
                    <Box mt="25px">
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
                            sx={{ mb: 4 }}
                            label='Password'
                            fullWidth
                            required
                            type='password'
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            {...register('password')}
                        />
                    </Box>

                </Stack>
                <Box>
                    <LoadingButton
                        variant="contained"
                        size="large"
                        fullWidth
                        loading={store.requestLoading}
                        type="submit"
                        sx={{
                            color: 'white', "&:hover": {
                                backgroundColor: "#49be25",
                            },
                        }}
                    >
                        Register
                    </LoadingButton>
                </Box>

            </form>

        </>
    )
}

export default RegisterForm
