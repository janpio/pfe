import { useState, ChangeEvent } from 'react'
import { Grid, Box, TextField, CardContent, Card } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useStore } from '../../state/store'
import PageContainer from '../../components/container/PageContainer'
import { changeProfilPhoto } from '../../features/api/api'
import { useMutation } from 'react-query';
import { toast } from 'react-toastify'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'

const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(6.25),
    border: "5px solid #4ace3c",
    borderRadius: "50%"
}))

const Profile = () => {

    const user = useStore((state: any) => state?.user)
    const login = useStore((state: any) => state?.login)
    const token = useStore((state: any) => state?.token)
    const setRequestLoading = useStore((state: any) => state?.setRequestLoading);
    const requestLoading = useStore((state: any) => state?.requestLoading);

    const [file, setFile] = useState<File | undefined>(undefined)
    const [photo, setPhoto] = useState<string>("")

    const { mutate: changePhoto } =
        useMutation((photo: string) =>
            changeProfilPhoto(user.id, photo, token), {
            onMutate: () =>
                setRequestLoading(true),
            onSuccess: () => {
                setRequestLoading(false),
                    toast.success("Photo changed successfully", { position: "bottom-center", autoClose: 800 });
            }

        });
    const ChangeProfilePhoto = async () => {
        const form = new FormData();
        setRequestLoading(true);
        form.append("file", file as any);
        form.append("upload_preset", "splash");
        const response = await axios.post("https://api.cloudinary.com/v1_1/dsjjqkvf1/upload", form);
        const imageLink = await response.data.secure_url;
        changePhoto(imageLink);
        let user = localStorage.getItem("user");
        let userData = JSON.parse(user as any);
        userData.user.image = imageLink;
        login(userData.user, token);
        let updatedUser = JSON.stringify(userData);
        localStorage.setItem("user", updatedUser);

    };

    return (
        <PageContainer title="Profile" description="profile page">
            <Card variant='outlined' sx={{
                borderRadius: 7,
                boxShadow: 10,
                paddingX: 4, pb: 2,
            }}>
                <CardContent >
                    <form>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sx={{ marginTop: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ImgStyled src={photo ? photo : user.image} alt='Profile photo' />
                                    <Box>
                                        <LoadingButton component='label' variant='contained' htmlFor='profil-photo'
                                            loading={!!photo && requestLoading}
                                            sx={{
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: '#ECF2FF',
                                                    color: '#4ace3c',
                                                },
                                            }}
                                        >
                                            Change photo
                                            <input
                                                hidden
                                                type='file'
                                                onChange={(e: ChangeEvent<HTMLInputElement | any>) => {
                                                    setFile((e?.target?.files[0]));
                                                    setPhoto(URL.createObjectURL(e.target?.files[0]));
                                                }}
                                                id='profil-photo'
                                            />
                                        </LoadingButton>

                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label='Name' value={user.name} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type='email'
                                    label='Email'
                                    defaultValue={user.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label='Position' value={user?.position} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label='Phone' value={user?.phone} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label='Team' value={user?.supervisor?.Team?.name || user?.Team?.name} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {!user?.teamId && <TextField fullWidth label='Supervisor' value={user?.supervisor?.name} />}
                            </Grid>
                            {<Grid item xs={12}>
                                <LoadingButton variant='contained'
                                    loading={!!photo && requestLoading}
                                    sx={{
                                        mr: 3.5,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#ECF2FF',
                                            color: '#4ace3c',
                                        },
                                    }}

                                    onClick={ChangeProfilePhoto}
                                >
                                    Save Changes
                                </LoadingButton>
                            </Grid>}
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </PageContainer>

    )
}

export default Profile
