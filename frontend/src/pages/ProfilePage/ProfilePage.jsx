import React, { useState, useEffect, useContext } from 'react'
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PROFILE_UPDATE_ENDPOINT } from '../../constants/urls';
import { checkPasswordComplexity } from '../../utilities';
import { LoginContext } from '../../App';
import jwtDecode from 'jwt-decode';
import Dashboard from '../../components/Dashboard';
import { PROFILE_ENDPOINT } from '../../constants/urls';


import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



function ProfilePage() {


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [passwordGood, setPasswordGood] = useState(false);
    const [passwordTyped, setpasswordTyped] = useState(false);
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [formName, setFormName] = useState();
    const [formPassword, setFormPassword] = useState("");
    const [formConfirmPassword, setFormConfirmPassword] = useState("");
    const [loggedIn, setLoggedIn] = useContext(LoginContext);




    useEffect(()=>{
        if(formPassword || formConfirmPassword)
        {
            setpasswordTyped(true);
        }
        else
        {
            setpasswordTyped(false); 
        }


        if(checkPasswordComplexity(formPassword, formConfirmPassword).length = 0)
        {
            setPasswordGood(true);
        }
        else
        {
            setPasswordGood(false);
        }


        if(passwordTyped)
        {
            setSubmitButtonEnabled(true)
        }
        else
        {
            setSubmitButtonEnabled(false)
        }
    
    },[passwordTyped, formPassword, formConfirmPassword]);




    useEffect(()=>{
        axios.get(PROFILE_ENDPOINT, 
        {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + localStorage.getItem('access')}},
        ).then((response)=>{
            setEmail(response.data.email);
            setFormName(response.data.name);
            setLoggedIn(true);
        }).catch((error)=>{
            setLoggedIn(false);
            navigate('/login');
        });
      },[]);
    




    useEffect(()=>{
        if(loading)
        {
            axios.put(PROFILE_UPDATE_ENDPOINT, 
            {name: formName, password: formPassword},
            {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + localStorage.getItem('access')}},
            ).then((response)=>{
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                setFormName(jwtDecode(localStorage.getItem('access')).name);
                setLoggedIn(true);
                setLoading(false);
                setError(false);
                navigate('/');
            }).catch((error)=>{
                setError(true);
                setLoggedIn(false);
                setLoading(false);
            });
        }
    },[loading, formName, formPassword]);




    const submitHandler = (e) => {
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
            </Box>)
    }
    else
    {
        return (
        <Dashboard>
            <Container>
                <Row>
                    <Col>
                    <h3>User Profile</h3>
                    {error 
                    ? 
                    (<Alert variant="danger" style={{backgroundColor: "red"}}>
                        Unable to update profile. Try again later.
                    </Alert>)
                    :
                    (<div />)}
                    <Form onSubmit={submitHandler}>
                    <Form.Group style={{margin: 20}}  controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" defaultValue={email} disabled/>
                        </Form.Group>
                        <Form.Group style={{margin: 20}}  controlId="name">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter Full Name" defaultValue={formName} onChange={(e)=>{setFormName(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group style={{margin: 20}}  controlId="password">
                            <Form.Label>Update Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" defaultValue={formPassword} onChange={(e)=>{setFormPassword(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group  style={{margin: 20}}  controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Confirm Password" defaultValue={formConfirmPassword} onChange={(e)=>{setFormConfirmPassword(e.target.value)}}/>
                        </Form.Group>
                        {passwordTyped ? 
                                passwordGood ? 
                                <div>Password complexity is good</div>
                                : 
                                (<Alert variant="danger" style={{backgroudColor: "yellow"}}>
                                    {checkPasswordComplexity(formPassword, formConfirmPassword).map((e) => {
                                        if(e) 
                                        {
                                            return <li key={e}>{e}</li>;
                                        }
                                    })}
                                </Alert>)
                                : 
                                <div></div>}

                        <Button style={{margin: 20}} type="submit" variant="primary" disabled={!submitButtonEnabled}>Update</Button>
                    </Form>
                    </Col>
                </Row>
            </Container>
        </Dashboard>
        )
    }
}

export default ProfilePage;