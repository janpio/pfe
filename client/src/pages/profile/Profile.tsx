// ** React Imports
import { useState, ChangeEvent } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { Card } from '@mui/material'
import { useStore } from '../../state/store'


const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(6.25),
    border: "5px solid #4ace3c",
    borderRadius: "50%"
}))


const Profile = () => {

    const user = useStore((state: any) => state.user)

    const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

    const onChange = (file: ChangeEvent) => {
        const reader = new FileReader()
        const { files } = file.target as HTMLInputElement
        if (files && files.length !== 0) {
            reader.onload = () => setImgSrc(reader.result as string)

            reader.readAsDataURL(files[0])
        }
    }

    return (
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
                                <ImgStyled src={user.image} alt='Profile Pic' />
                                <Box>
                                    <Button component='label' variant='contained' htmlFor='account-settings-upload-image'
                                        sx={{
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#ECF2FF',
                                                color: '#4ace3c',
                                            },
                                        }}>
                                        Upload New Photo
                                        <input
                                            hidden
                                            type='file'
                                            onChange={onChange}
                                            accept='image/png, image/jpeg'
                                            id='account-settings-upload-image'
                                        />
                                    </Button>

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
                            <TextField fullWidth label='Position' value={user.position} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label='Phone Number' value={user.phone} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label='Equipe' value={user.name} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label='Supervisor' value={user.name} />
                        </Grid>
                        {/*             <Grid item xs={12}>
                            <Button variant='contained' sx={{
                                mr: 3.5,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#ECF2FF',
                                    color: '#4ace3c',
                                },
                            }}>
                                Save Changes
                            </Button>
                        </Grid>*/}
                    </Grid>
                </form>
            </CardContent>
        </Card>
    )
}

export default Profile
