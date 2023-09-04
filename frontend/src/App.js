import './App.css';
import {createContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterationPage from './pages/RegisterationPage/RegisterationPage';
import VerificationPage from './pages/VerificationPage/VerificationPage';
import LogoutPage from './pages/LogoutPage/LogoutPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import { BACKEND_URL } from './constants/urls';
import { MyCalendar } from './pages/MyCalendar/MyCalendar';
import PayCalculator from './pages/PayCalculator/PayCalculator';

export const LoginContext = createContext();



function App() {

  useEffect(()=>{
    function refreshTokens(){
      if (localStorage.refresh){
        const url = BACKEND_URL + 'api/users/token/refresh/';
        fetch(url,{method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify({refresh: localStorage.refresh}) })
                    .then((response)=>{
                      return response.json();
                    })
                    .then((data)=>{
                      localStorage.access = data.access;
                      localStorage.refresh = data.refresh;
                      setLoggedIn(true);
                    });
      }
    }
    const minute = 1000 * 60;
    refreshTokens();
    setInterval(refreshTokens, minute*3);
  },[]);



  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
    <Router>
      {/* <Header /> */}
      <main>
        {/* <Container> */}

          <Routes>
           <Route path="/" Component={HomePage} exact />
           <Route path="/payCalc" Component={PayCalculator} exact />
           <Route path="/:id/:agre" Component={MyCalendar} exact />
           <Route path="/login" Component={LoginPage} exact />
           <Route path="/register" Component={RegisterationPage} exact />
           <Route path="/verifyEmail/:verifySecret" Component={VerificationPage} exact />
           <Route path="/logout" Component={LogoutPage} exact />
           <Route path="/profile" Component={ProfilePage} exact />
           <Route path="/forgotPassword" Component={ForgotPasswordPage} exact />
           <Route path="/resetPassword/:resetSecret" Component={ResetPasswordPage} exact />
          </Routes>
          
        {/* </Container> */}
      </main>
      {/* <Footer /> */}
    </Router>
    </LoginContext.Provider>
  );
}

export default App;
