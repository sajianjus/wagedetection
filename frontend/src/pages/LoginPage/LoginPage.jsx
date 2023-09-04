import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';


import React, {useState, useEffect, useContext} from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { LOGIN_ENDPOINT } from "../../constants/urls";
import { LoginContext } from "../../App";






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

export default function LoginPage() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
    const navigate = useNavigate();




    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [loggedIn, setLoggedIn] = useContext(LoginContext);




    useEffect(()=>{
        localStorage.clear();
        setLoggedIn(false);
    });




    useEffect(()=>{
        if(password && email)
        {
            setSubmitButtonEnabled(true);
        }
        else
        {
            setSubmitButtonEnabled(false);
        }
    },[email, password]);




    useEffect(()=>{
        if(loading)
        {
            axios.post(LOGIN_ENDPOINT, 
            {email: email, password:password},
            {headers: {"Content-type": "application/json"}},
            ).then((response)=>{
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                setLoggedIn(true);
                setLoading(false);
                setError(false);
                navigate("/");
            }).catch((error)=>{
                setError(true);
                setLoading(false);
            });
        }
    },[email, password, loading]);



    const submitHandler = (e) =>{
        e.preventDefault();
        setLoading(true);
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
                </Box>);
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
                        Sign in
                    </Typography>
                    {error 
                    ? 
                    (<Alert severity="error">Error Logging In — check it out!</Alert>)
                    :
                    (<div></div>)}
                        <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email} 
                        onChange={(e)=>{setEmail(e.target.value)}}
                        autoComplete="email"
                        autoFocus
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password} 
                        onChange={(e)=>{setPassword(e.target.value)}}
                        autoComplete="current-password"
                        />
                        <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                        />
                        <Button
                        type="submit"
                        disabled={!submitButtonEnabled}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign In
                        </Button>
                        <Grid container>
                        <Grid item xs>
                            <Link href="/forgotPassword" variant="body2">
                            Forgot password?
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




// import React, {useState, useEffect, useContext} from "react";
// import { Link, useNavigate} from "react-router-dom";
// import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
// import axios from "axios";
// import { LOGIN_ENDPOINT } from "../../constants/urls";
// import { LoginContext } from "../../App";




// function LoginPage(){
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
//     const navigate = useNavigate();




//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);
//     const [loggedIn, setLoggedIn] = useContext(LoginContext);



//     useEffect(()=>{
//         localStorage.clear();
//         setLoggedIn(false);
//     });




//     useEffect(()=>{
//         if(password && email)
//         {
//             setSubmitButtonEnabled(true);
//         }
//         else
//         {
//             setSubmitButtonEnabled(false);
//         }
//     },[email, password]);



//     useEffect(()=>{
//         if(loading)
//         {
//             axios.post(LOGIN_ENDPOINT, 
//             {email: email, password:password},
//             {headers: {"Content-type": "application/json"}},
//             ).then((response)=>{
//                 console.log(response.data);
//                 localStorage.setItem('access', response.data.access);
//                 localStorage.setItem('refresh', response.data.refresh);
//                 setLoggedIn(true);
//                 setLoading(false);
//                 setError(false);
//                 navigate("/");
//             }).catch((error)=>{
//                 setError(true);
//                 setLoading(false);
//             });
//         }
//     },[email, password, loading]);




//     const submitHandler = (e) =>{
//         e.preventDefault();
//         setLoading(true);
//         setError(false);
//     };




//     if(loading)
//     {
//         return <div>Loading...</div>;
//     }
//     else
//     {
//     return(
//         <Container>
//             <Row className='justify-content-md-center'>
//                 <Col>
//                 <h1>Sign In</h1>
//                 {error ? (<Alert variant="danger" style={{backgroundColor: "red"}}>Error Logging In</Alert>):(<div />)}
//                 <Form onSubmit={submitHandler}>
//                     <Form.Group controlId='email'>
//                         <Form.Label>Email Address</Form.Label>
//                         <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></Form.Control>
//                     </Form.Group>
//                     <Form.Group controlId='password'>
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></Form.Control>
//                     </Form.Group>
//                     <Button type='submit' variant='primary' disabled={!submitButtonEnabled}>Sign In</Button>
//                 </Form>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col>
//                      Are you a new member? <Link to='/register'>Register</Link>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col>
//                     <Link to="/forgotPassword">Forgot Password</Link>
//                 </Col>
//             </Row>
                
//         </Container>
//         )
//     }
// }
// export default LoginPage;

