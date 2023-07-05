import {
    Box,
    Typography,
    Button,
    Stack,
    TextField
} from '@mui/material';


const AuthLogin = () => (
    <>
        <form>

            <Stack>
                <Box sx={{ mt: '20px' }}>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='email' mb="5px">Email</Typography>
                    <TextField id="email" variant="outlined" fullWidth />
                </Box>
                <Box mt="25px">
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" >Password</Typography>
                    <TextField id="password" type="password" variant="outlined" fullWidth />
                </Box>
                <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                    {/*<FormGroup>
                    <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Remeber this Device"
                    />
                </FormGroup>*/}
                    <Typography
                        fontWeight="600"
                        sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                        }}
                    >
                        Forgot Password ?
                    </Typography>
                </Stack>
            </Stack>
            <Box>
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    sx={{
                        color: 'white', "&:hover": {
                            backgroundColor: "#49be25",
                        },
                    }}
                >
                    Sign In
                </Button>
            </Box>
            <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                {/*<Typography color="textSecondary" variant="h6" fontWeight="500">
                      New to FIS?
                    </Typography>
                    <Typography
                      component={Link}
                      to="/auth/register"
                      fontWeight="600"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      Create an account
                    </Typography>*/}
            </Stack>
        </form>
    </>
);

export default AuthLogin;
