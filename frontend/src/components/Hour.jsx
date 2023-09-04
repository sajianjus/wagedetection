import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


import {TextField} from '@mui/material';
import FormHelperText from "@mui/material/FormHelperText";



export default function Hour({wagePerHour, setWagePerHour}) {
   
  return (
    <React.Fragment>
      <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography component="h1" variant="h6">
            At start of this period, what was your base hourly rate?
            <FormHelperText>tip: this will be on either your employment contract, letter of offer or payslip
              relevent to the period you have selected.
            </FormHelperText>
          </Typography>
          <Box sx={{marginTop: 5, flexGrow:1, alignItems: 'center'}}>
          <Grid container spacing={2}>
          <Grid item>
          <Typography variant="subtitle1" gutterBottom={true}>Hourly Rate($)</Typography>
            <TextField type="number" variant="outlined" inputProps={{maxLength: 13,step: "1"}} sx={{width:250}} value={wagePerHour} onChange={(e) => setWagePerHour(parseFloat(e.target.value).toFixed(2))}/>
          </Grid>
          </Grid>
          </Box>
      </Box>
    </React.Fragment>
  );
}