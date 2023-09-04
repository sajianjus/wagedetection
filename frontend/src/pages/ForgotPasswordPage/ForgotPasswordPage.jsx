import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';


import { useEffect, useState } from 'react';
import axios from 'axios';
import { FORGOT_PASSWORD_ENDPOINT } from '../../constants/urls';
import { checkEmailAddressFormat } from '../../utilities';




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}





// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();



export default function ForgotPasswordPage() {


    const [formEmail, setFormEmail] = useState();
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);




    useEffect(()=>{
        if( checkEmailAddressFormat(formEmail))
        {
            setSubmitButtonEnabled(true);
        }
        else{
            setSubmitButtonEnabled(false);
        }
    },[formEmail]);



    useEffect(()=>{
        if(loading)
        {
            axios.post(FORGOT_PASSWORD_ENDPOINT, 
            {email: formEmail},
            {headers: {"Content-type": "application/json"}},
            ).then((response)=>{
                setResetSuccess(true);
                setLoading(false);
                setError(false);
            }).catch((error)=>{
                setLoading(false);
                setError(true);
            });
        }
    },[loading]);





const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setResetSuccess(false);
}





if(loading)
{
    return (<Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
        <CircularProgress />
        </Box>);
}
else if(resetSuccess)
{
    return(
        <Alert severity="success">
            <AlertTitle>Verify Email</AlertTitle>
            <p>If your email is found, we will send you a link to reset your password.</p>
            <Link href='/login' variant="body2">Sign in</Link>
        </Alert>
    );
}
else if (error)
{
    return (<Alert severity="error">There was an error with the request. Please try again later.</Alert>);
}
else
{
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Forgot Password
          </Typography>
          <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>{setFormEmail(e.target.value)}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!submitButtonEnabled}
            >
              Reset Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                 Login
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
}