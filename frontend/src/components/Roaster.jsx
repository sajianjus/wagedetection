import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


import FormHelperText from "@mui/material/FormHelperText";
import { MyCalendar } from '../pages/MyCalendar/MyCalendar';




export default function Roaster() {


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
            Please select the classification that applies during your detection period.:
            <FormHelperText>tip: only one classification can be selected per detection period.
            </FormHelperText>
          </Typography>
          <Box sx={{marginTop: 4, flexGrow:1, alignItems: 'center'}}>
            <Grid container xs={12} spacing={2}>
                <Grid item xs={12}>
                <MyCalendar/>
                </Grid>
            </Grid>
          </Box>
      </Box>
    </React.Fragment>
  );
}







// export default function Classification({govAgreement}) {

//   const [searchQuery, setSearchQuery] = React.useState("");

//   const filterData = (query, data) => {
//       if (!query) {
//         return data;
//       } else {
//         return data.filter((d) => d.name.toLowerCase().includes(query));
//       }
//     };


//   const dataFiltered = filterData(searchQuery, govAgreement);


// return (
//   <React.Fragment>
//     <Typography variant="h6" gutterBottom>
//       What is your classification?
//     </Typography>
//     <Grid container spacing={3}>
//       <Grid item xs={12} md={6}>
//       <Grid item xs={12}>
//       <div
//           style={{
//               display: "flex",
//               alignSelf: "center",
//               justifyContent: "center",
//               flexDirection: "column",
//               padding: 20
//           }}
//       >
//       <TextField
//       id="search-bar"
//       className="text"
//       onInput={(e) => {
//           setSearchQuery(e.target.value);
//       }}
//       label="Filter by keyword"
//       variant="outlined"
//       placeholder="Search..."
//       size="small"
//       />
//       <div style={{ padding: 5 }}>
//       <FormControl>
//           <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group">
//               {dataFiltered.map((d) => (
//               <div style={{color: "blue"}} key={d.award_fixed_id}>
//                   <FormControlLabel value={d.award_fixed_id} control={<Radio />} label={d.name} variant="standard" fullWidth/>     
//               </div>
//               ))}
//           </RadioGroup>
//           </FormControl>
//       </div>
//       </div>
//       </Grid>
//       </Grid>
//     </Grid>
//   </React.Fragment>
// );
// }