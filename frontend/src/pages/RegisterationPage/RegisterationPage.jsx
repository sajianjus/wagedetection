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


import React , { useState, useEffect } from 'react';
import { checkEmailAddressFormat, checkPasswordComplexity } from '../../utilities';
import axios from 'axios';
import {REGISTERATION_ENDPOINT} from '../../constants/urls';






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


export default function RegisterationPage() {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");



    const [passwordGood, setPasswordGood] = useState(false);
    const [passwordTyped, setPasswordTyped] = useState(false);
    const [emailGood, setEmailGood] = useState(false);
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);




    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(false);
    const [success, setSuccess] = useState(false);




    useEffect(() => {

        if(password || confirmPassword)
        {
            setPasswordTyped(true);
        }
        else
        {
            setPasswordTyped(false);
        }


        if (checkPasswordComplexity(password, confirmPassword).length === 0)
        {
            setPasswordGood(true);
        }
        else
        {
            setPasswordGood(false);
        }


        if (checkEmailAddressFormat(email))
        {
            setEmailGood(true);
        }
        else
        {
            setEmailGood(false);
        }

        
        if (name && emailGood && passwordGood)
        {
            setSubmitButtonEnabled(true);
        }
        else
        {
            setSubmitButtonEnabled(false);
        }

    },[name, email, password, confirmPassword, passwordGood, emailGood]);



    
    useEffect(()=>{

        if(loading)
        {
            axios.post(REGISTERATION_ENDPOINT, 
            {email: email, password:password, name: name},
            {headers: {"Content-type": "application/json"}},
            ).then((response)=>{
                setSuccess(true);
                setResults(true);
                setLoading(false);
            }).catch((error)=>{
                setResults(true);
                setSuccess(false);
                setLoading(false);
            });
        }
        
    },[name, email, password, loading]);


    

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        setResults(false);
        setSuccess(false); 
    }



    

    if(loading)
    {
       return (<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"> 
                    <CircularProgress />
                </Box>)
    }
    else
    {
    if(results)
    {
        if(success)
        {
            return(
                <Alert severity="success">
                    <AlertTitle>Verify Email</AlertTitle>
                    <p>A verification email has been sent tp {email}</p>
                    <strong>Please click on the link in the email to verify your account. </strong>
                    <Link href='/login' variant="body2">Sign in</Link>
                </Alert>
            );
        }
        else
        {
            return (<Alert severity="error">Unable to complete registeration — check it out!</Alert>);
        }
    }
    else
    {
        return (
            <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5"> 
                Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        value={name} 
                        onChange={(e)=> setName(e.target.value)}
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email} 
                        onChange={(e)=> setEmail(e.target.value)}
                        autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password} 
                        onChange={(e)=> setPassword(e.target.value)}
                        autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        label="confirm Password"
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword} 
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        />
                    </Grid>
                    </Grid>
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

                    <Button type="submit" disabled={! submitButtonEnabled}  fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                    Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href='/login' variant="body2">
                        Already have an account? Sign in
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            </ThemeProvider>
        );
    }
}
}



