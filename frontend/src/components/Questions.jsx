import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormHelperText from "@mui/material/FormHelperText";
import { Box } from '@mui/material';

export default function Questions() {


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
            During any time throughout this period, where you:?
            <FormHelperText>tip: if you dont know the dates that any of the below apply,
              just leave as No.
            </FormHelperText>
          </Typography>
          <Box sx={{marginTop: 5, flexGrow:1, alignItems: 'center'}}>
          <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
        Are you a trainee?
        <Grid item xs={12}>
          <FormControl>
            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="no" name="radio-buttons-group">
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" selected/>
            </RadioGroup>
            </FormControl>
          </Grid>
          Are you eligible for a supported wage? 
          <Grid item xs={12}>
          <FormControl>
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="no" name="radio-buttons-group">
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        </Grid>
        Are you an apprentice?
        <Grid item xs={12}>
          <FormControl>
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="no" name="radio-buttons-group">
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        </Grid>
        </Grid>
      </Grid>
          </Box>
      </Box>

    </React.Fragment>
  );
}

