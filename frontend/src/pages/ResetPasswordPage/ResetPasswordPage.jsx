import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';



import { useState, useEffect } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { checkPasswordComplexity } from '../../utilities';
import {RESET_PASSWORD_ENDPOINT}  from "../../constants/urls";



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://synapseco.com">
        Nebula
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ResetPasswordPage() {


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordGood, setPasswordGood] = useState(false);
    const [passwordTyped, setPasswordTyped] = useState(false);
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);


    const [loading, setLoading] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [error, setError] = useState(false);
    


    const {resetSecret}  = useParams();
    const navigate = useNavigate();

    

    useEffect(()=>{

        if(password || confirmPassword)
        {
            setPasswordTyped(true);
        }
        else
        {
            setPasswordTyped(false); 
        }


        if( checkPasswordComplexity(password, confirmPassword).length === 0)
        {
            setPasswordGood(true);
        }
        else{
            setPasswordGood(false);
        }

        if(passwordTyped)
        {
            setSubmitButtonEnabled(true);
        }
        else
        {
            setSubmitButtonEnabled(true);
        }
    },[password, confirmPassword, passwordTyped]);




    useEffect(()=>{
        if(loading)
        {
            axios.post(RESET_PASSWORD_ENDPOINT, 
            {password: password, reset_secret: resetSecret},
            {headers: {"Content-type": "application/json"}},
            ).then((response)=>{
                setResetSuccess(true);
                setLoading(false);
                setError(false);
                navigate("/login");
            }).catch((error)=>{
                setError(true);
                setLoading(false);
                setResetSuccess(false);
            });
        }
    },[navigate, loading, password, resetSecret]);





    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        setResetSuccess(false);
        setError(false);
    };


    if(loading)
    {
        return (<Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh">
            <CircularProgress />
            </Box>)
    }
    else if(error)
    {
        return (
        <Alert severity="error">
            <p>An error occurred reseting the password— check it out!</p>
            <Link to="/login">Login</Link> if you have an account already!
        </Alert>
        );
    }
    else if(resetSuccess)
    {

        return(
            <Alert severity="success">
                <p>Your password has been reset.</p>
                <strong>Please click on the link in the email to verify your account. </strong>
                <Link to="/login">Login</Link> if you have an account already!
            </Alert>
        );
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
                    Reset Password
                </Typography>
                <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Enter Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password} 
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    value={confirmPassword} 
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    />
                    {passwordTyped ? 
                        passwordGood ? 
                        <div><Alert severity="success">Password complexity is good</Alert></div>
                        : 
                        (<Alert severity="error">
                            {checkPasswordComplexity(password, confirmPassword).map((e) => {
                                if(e) 
                                {
                                    return <div key={e}>{e}</div>;
                                }
                            })}
                        </Alert>)
                        : 
                        <div></div>}
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!submitButtonEnabled}
                    >
                    Reset Password
                    </Button>
                </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
            </ThemeProvider>
        );
    }
}
