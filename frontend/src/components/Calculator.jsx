import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormHelperText from "@mui/material/FormHelperText";



export default function Calculator({startDate, setStartDate, endDate, setEndDate}) {
   
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
            What is the start and end date of the period you are detecting?
            <FormHelperText>tip: most user enter the start and end date of their employeement to ensure
              they capture the entire period.
            </FormHelperText>
          </Typography>
          <Box sx={{marginTop: 5, flexGrow:1, alignItems: 'center'}}>
          <Grid container spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <Grid item>
                <DatePicker label="Start Date" value={startDate} onChange={(newValue) => setStartDate(newValue)} required />
              </Grid>
              <Grid item>
                <DatePicker label="End Date" value={endDate}  onChange={(newValue2) => setEndDate(newValue2)} required />
              </Grid>
            </LocalizationProvider>
          </Grid>
          </Box>
      </Box>
    </React.Fragment>
  );
}