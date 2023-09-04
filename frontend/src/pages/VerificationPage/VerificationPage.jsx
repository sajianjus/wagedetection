import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';
import { VERIFY_EMAIL_ENDPOINT } from '../../constants/urls';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



function VerificationPage() {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const {verifySecret} = useParams();

    

    useEffect(()=>{
        if(loading)
        {
            console.log(verifySecret)
            axios.post(VERIFY_EMAIL_ENDPOINT,
            {verification_secret: verifySecret},
            {headers: {"Content-type": "application/json"}},
            ).then((response)=>{
                setSuccess(true);
                setLoading(false);
            }).catch((error)=>{
                setSuccess(false);
                setLoading(false);
            });
        }
    },[verifySecret, loading, success]);




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
    else
    {
        if(success)
        {
            return(
                <Alert severity="success">
                    <AlertTitle>Email Verified</AlertTitle>
                    Thank you for verifying you email. you can now.
                    <Link href='/login' variant="body2">Sign in</Link>
                </Alert>
            );
        }
        else
        {
            return (
            <Alert severity="error">
                <p>Unable to verifying Email — check it out!</p>
                The verification link did not work. please
                <Link to='register/'>Register</Link> again on
                <Link to='login/'>LogIn</Link>.
            </Alert>
            );
        }
    }
}

export default VerificationPage;