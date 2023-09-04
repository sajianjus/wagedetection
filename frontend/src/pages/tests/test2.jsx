import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



import axios from 'axios';
import { LoginContext } from '../../App';
import { AWARD_ENDPOINT } from "../../constants/urls";
import Calculator from '../../components/Calculator';
import Awards from '../../components/Awards';
import Classification from '../../components/Classification';
import PaymentForm from '../../components/PaymentForm';
import Review from '../../components/Review';
import Dashboard from '../../components/Dashboard';


const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];



export default function PayCalculator() {
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };



  

    const [govAgreement, setGovAgreement] = React.useState([] || null);


      React.useEffect(()=>{

      axios.get(AWARD_ENDPOINT, 
        {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + localStorage.getItem('access')}},
        ).then((response)=>{
            // console.log(response)
            setGovAgreement(response.data.awards.results)
            setLoggedIn(true);
        }).catch((error)=>{
            setLoggedIn(false);
          
        });

      },[]); 




  const [payRates, setPayRates] = React.useState('employee'); 

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Calculator />;
      case 1:
        return <Awards govAgreement={govAgreement} />;
      case 2:
        return <PaymentForm payRates={payRates} setPayRates={setPayRates}/>;
      case 3:
        return <Classification govAgreement={govAgreement} />;
      case 4:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }


  return (
    <Dashboard >
    <React.Fragment>

      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Pay Calculator
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
    </Dashboard>
  );
}