import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box, TextField } from '@mui/material';
import dayjs from 'dayjs';
import {FormHelperText} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


import {FormControl, InputLabel, ToggleButtonGroup, ToggleButton, Select, MenuItem} from '@mui/material';



export default function Repetition() {

    const dayOfWeek = ["1", "2"]
    const [weekDay, setWeekDay] = React.useState([]);
    const handleWeekDay = (event, newWeekDay) => {
        parseInt(newWeekDay);
        setWeekDay(newWeekDay);
    };




    const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
    console.log(value.format("HH:mm:ss"))
    
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
            <Typography component="h1" variant="h6">Nearly there! </Typography>
            <Typography component="h1" variant="h6">Let's build the shift view </Typography>
            <Typography component="h1" variant="h6">
            For the period from [Date] to [Date], use the following scheduler to prefill any ordinary hours for repetitive shifts
            (do not include overtime or leave taken).
            <FormHelperText>tip: if your hours do not specific pattern then leave blank and skip the step.
            </FormHelperText>
            </Typography>
        
          
          <Box sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
              }}>
          <Grid container spacing={1}>
                <Grid xs={1.5}>
                    Start Time:
                </Grid>
                <Grid xs={1.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 
                <TimePicker
                label="Start"
                renderInput={(params)=>(<TextField {...params}/>)}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
                </LocalizationProvider>
                </Grid>
                <Grid xs={1.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 
                <TimePicker
                label="Controlled picker"
                renderInput={(params)=>(<TextField {...params}/>)}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
                </LocalizationProvider>
                </Grid>
                <Grid xs={1.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 
                <TimePicker
                label="Controlled picker"
                renderInput={(params)=>(<TextField {...params}/>)}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
                </LocalizationProvider>
                </Grid>
                <Grid xs={1.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 
                <TimePicker
                label="Controlled picker"
                renderInput={(params)=>(<TextField {...params}/>)}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
                </LocalizationProvider>
                </Grid>
                <Grid xs={1.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 
                <TimePicker
                label="Controlled picker"
                renderInput={(params)=>(<TextField {...params}/>)}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
                </LocalizationProvider>
                </Grid>
                <Grid xs={1.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 
                <TimePicker
                label="Controlled picker"
                renderInput={(params)=>(<TextField {...params}/>)}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
                </LocalizationProvider>
                </Grid>
                <Grid xs={1.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 
                <TimePicker
                label="Controlled picker"
                renderInput={(params)=>(<TextField {...params}/>)}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
                </LocalizationProvider>
                </Grid>
                
            </Grid>


            <Grid container spacing={1}  sx={{marginTop: 2}}>
                <Grid xs={1.5}>
                    End TIme:
                </Grid>
                <Grid xs={1.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 
                <TimePicker
                label="End"
                renderInput={(params)=>(<TextField {...params}/>)}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
                </LocalizationProvider>
                </Grid>
                <Grid xs={1.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 
                <TimePicker
                label="Controlled picker"
                renderInput={(params)=>(<TextField {...params}/>)}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
                </LocalizationProvider>
                </Grid>
                <Grid xs={1.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 
                <TimePicker
                label="Controlled picker"
                renderInput={(params)=>(<TextField {...params}/>)}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
                </LocalizationProvider>
                </Grid>
                <Grid xs={1.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 
                <TimePicker
                label="Controlled picker"
                renderInput={(params)=>(<TextField {...params}/>)}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
                </LocalizationProvider>
                </Grid>
                <Grid xs={1.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 
                <TimePicker
                label="Controlled picker"
                renderInput={(params)=>(<TextField {...params}/>)}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
                </LocalizationProvider>
                </Grid>
                <Grid xs={1.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 
                <TimePicker
                label="Controlled picker"
                renderInput={(params)=>(<TextField {...params}/>)}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
                </LocalizationProvider>
                </Grid>
                <Grid xs={1.5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                 
                <TimePicker
                label="Controlled picker"
                renderInput={(params)=>(<TextField {...params}/>)}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
                </LocalizationProvider>
                </Grid>
                
            </Grid>
          </Box>

           
          </Box>
          <Box sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
              }}>
          <Typography component="h1" variant="h6">Select appropriate repitition pattern: </Typography>
         
          </Box>
            
      
         

          <Box sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
              }}>
            <Grid container spacing={1}>
                        <Grid item xs={4} xl={4}>
                        <FormControl fullWidth sx={{width:250}}>
                            <InputLabel id="demo-simple-select-label">Classification</InputLabel>
                            <Select name="freq" labelId="demo-simple-select-label" id="demo-simple-select" label="Day of Week" required > 
                                {dayOfWeek.map((weekNumber,i)=>{
                                return <MenuItem key={i} value={weekNumber}>Every {weekNumber} Week</MenuItem>
                                })}
                                </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={8} xl={8}>
                        <ToggleButtonGroup value={weekDay} onChange={handleWeekDay} aria-label="text alignment">
                            <ToggleButton value="1" aria-label="Monday" >M</ToggleButton>
                            <ToggleButton value="2" aria-label="Tuesday">T</ToggleButton>
                            <ToggleButton value="3" aria-label="Wednesday">W</ToggleButton>
                            <ToggleButton value="4" aria-label="Thursday">T</ToggleButton>
                            <ToggleButton value="5" aria-label="Friday">F</ToggleButton>
                            <ToggleButton value="6" aria-label="Saturday">S</ToggleButton>
                            <ToggleButton value="0" aria-label="Sunday">S</ToggleButton>
                        </ToggleButtonGroup>
                        </Grid>
                </Grid>
                </Box>
          
    </React.Fragment>
  );
}
