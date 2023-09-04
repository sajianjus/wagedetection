import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


export default function Welcome() {
   
  return (
    <React.Fragment>

        <Box
              sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
            <Typography component="h1" variant="h6">Let's get started! </Typography>
              <Typography component="h1" variant="h6">
                To ensure the most accurate outcome of this Detection Instance, we will ask you a couple of basic yet important
                questions, so please ensure you answer correctly as your responses will impact the results.
              </Typography>
              </Box>
    </React.Fragment>
  );
}