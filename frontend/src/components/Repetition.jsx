import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box, TextField } from '@mui/material';
import dayjs from 'dayjs';
import {FormHelperText, Button} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";



import {FormControl, InputLabel, ToggleButtonGroup, ToggleButton, Select, MenuItem} from '@mui/material';
import { SendTwoTone } from '@mui/icons-material';



export default function Repetition() {

  const [weekDays, setWeekDays] = React.useState([{startTime:"", endTime:""},
                                                  {startTime:"", endTime:""},
                                                  {startTime:"", endTime:""},
                                                  {startTime:"", endTime:""},
                                                  {startTime:"", endTime:""},
                                                  {startTime:"", endTime:""},
                                                  {startTime:"", endTime:""}])
  // const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
  //   console.log(value.format("HH:mm:ss"))
  // const [detection, setDetection] = React.useState()
 




  const handleInputChange = (i, name, e) => {
    const obj = [...weekDays];
    obj[i][name] = dayjs(e).format("HH:mm:ss");
    setWeekDays(obj);

  };

  // console.log(weekDays)






  // const [list, setList] = React.useState([]);

  
  // const [checked, setChecked] = React.useState(false);
  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  //   if(event.target.checked)
  //   {
  //     setList([...list, event.target.value])
  //   }
  // };
  // console.log(list)



    const week = ["1", "2"]
    const [test, setTest] = React.useState([]);
    const [repitition, setRepitition] = React.useState([{ freq: "", days:[]}]);

    const handleServiceChange = (e, index) => {
        const list = [...repitition];
        if(e.target.name == 'freq')
        {
          list[index][e.target.name] = e.target.value;
        }
        
        
        
        if(e.target.checked)
        {
          setTest([...test, e.target.value])
        }
        else
        {
          setTest(test.filter((item)=>item !== e.target.value))
        }
        
        
        
      
      setRepitition(list);

      
        
    }; 
    
    console.log(test)
    console.log(repitition)





    
    const handleServiceRemove = (index) => {
        const list = [...repitition];
        list.splice(index, 1);
        setRepitition(list);
    };

    const handleServiceAdd = () => {
        setRepitition([...repitition, {freq: "", days:[]}]);
    };
    // console.log(repitition)


 
    
    
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
      {weekDays.map((day, i)=>(
        <Grid item xs={1.6} key={i}>
        <Typography component="h6" variant="h6">{day.name} </Typography>
          <Grid sx={{marginTop:1}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>      
          <TimePicker
          label="Start"
          renderInput={(params)=>(<TextField {...params}/>)}
          onChange={(e)=>handleInputChange(i, 'startTime', e)}
          />
          </LocalizationProvider>
          </Grid>

          <Grid sx={{marginTop:1}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>      
          <TimePicker
          label="End"
          renderInput={(params)=>(<TextField {...params}/>)}
          onChange={(e)=>handleInputChange(i, 'endTime', e)}
          />
          </LocalizationProvider>
          </Grid>
        </Grid>
        ))}
    
        
      </Grid>

      <Box sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
              }}>
      <Typography component="h1" variant="h6">Select appropriate repitition pattern: <Button variant='contained' onClick={handleServiceAdd}>Add</Button></Typography>
      
      </Box>
      
      {repitition.map((rep, index) => 
    (
      <Grid container spacing={1} key={index}>
        <Grid item xs={4}>
            <Grid sx={{marginTop:4}}>
            <FormControl fullWidth sx={{width:250}}>
                <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
                <Select name="freq" labelId="demo-simple-select-label" id="demo-simple-select" label="Day of Week" value={rep.freq || ""} onChange={(e) => handleServiceChange(e, index)} required > 
                    {week.map((weekNum,i)=>{
                    return <MenuItem key={i} value={weekNum}>Every {weekNum} Week</MenuItem>
                    })}
                    </Select>
            </FormControl>
            </Grid>
        </Grid>
        <Grid item xs={8}>
        <Grid sx={{marginTop:5}}>
        <FormControlLabel control={<Checkbox  onChange={(e) => handleServiceChange(e, index)}  value="0"/>} label="Mon"/>
        <FormControlLabel control={<Checkbox  onChange={(e) => handleServiceChange(e, index)}  value="1"/>} label="Tue"/>
        <FormControlLabel control={<Checkbox  onChange={(e) => handleServiceChange(e, index)}  value="2"/>} label="Wed"/>
        <FormControlLabel control={<Checkbox  onChange={(e) => handleServiceChange(e, index)}  value="3"/>} label="Thu"/>
        <FormControlLabel control={<Checkbox  onChange={(e) => handleServiceChange(e, index)}  value="4"/>} label="Fri"/>
        <FormControlLabel control={<Checkbox  onChange={(e) => handleServiceChange(e, index)}  value="5"/>} label="Sat"/>
        <FormControlLabel control={<Checkbox  onChange={(e) => handleServiceChange(e, index)}  value="6"/>} label="Sun"/>
        </Grid>
        </Grid>
        <Grid item xs={2}>
            <Grid sx={{marginTop:4}}>
            {repitition.length !== 1 && (
            <Button
                variant='contained'
                onClick={() => handleServiceRemove(index)}
            >
            <span>Remove</span>
            </Button>
            )}
            </Grid>
        </Grid>
    




        {/* <ToggleButtonGroup aria-label="text alignment">
            <ToggleButton value="1" aria-label="Monday" >Mon</ToggleButton>
            <ToggleButton value="2" aria-label="Tuesday">Tue</ToggleButton>
            <ToggleButton value="3" aria-label="Wednesday">Wed</ToggleButton>
            <ToggleButton value="4" aria-label="Thursday">Thu</ToggleButton>
            <ToggleButton value="5" aria-label="Friday">Fri</ToggleButton>
            <ToggleButton value="6" aria-label="Saturday">Sat</ToggleButton>
            <ToggleButton value="0" aria-label="Sunday">Sun</ToggleButton>
        </ToggleButtonGroup> */}




        {/* <Grid item xs={4}>
        <Grid sx={{marginTop:4}}>
        <FormControl fullWidth sx={{width:250}}>
            <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
            <Select name="freq" labelId="demo-simple-select-label" id="demo-simple-select" label="Day of Week" value={freq} onChange={(e)=>{setFreq(e.target.value)}} required > 
                {dayOfWeek.map((weekNumber,i)=>{
                return <MenuItem key={i} value={weekNumber}>Every {weekNumber} Week</MenuItem>
                })}
                </Select>
        </FormControl>
        </Grid>
        </Grid> */}



        {/* <Grid item xs={8}>
        <Grid sx={{marginTop:4}}>
        <ToggleButtonGroup value={weekDay} onChange={handleWeekDay} aria-label="text alignment">
            <ToggleButton value="1" aria-label="Monday" >Mon</ToggleButton>
            <ToggleButton value="2" aria-label="Tuesday">Tue</ToggleButton>
            <ToggleButton value="3" aria-label="Wednesday">Wed</ToggleButton>
            <ToggleButton value="4" aria-label="Thursday">Thu</ToggleButton>
            <ToggleButton value="5" aria-label="Friday">Fri</ToggleButton>
            <ToggleButton value="6" aria-label="Saturday">Sat</ToggleButton>
            <ToggleButton value="0" aria-label="Sunday">Sun</ToggleButton>
        </ToggleButtonGroup>
        </Grid>
        </Grid> */}

        
      </Grid>
      )
        )}
      </Box>
        </Box>
    </React.Fragment>
  );
}




// import {Container, Row, Col, ListGroup } from 'react-bootstrap';
//  {/* <ListGroup>
//             <ListGroup.Item>Cras justo odio</ListGroup.Item>
//             <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
//             <ListGroup.Item>Morbi leo risus</ListGroup.Item>
//             <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
//             <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
//         </ListGroup>
//          */}
// {/* <Container>
//     <Row>
//         <Col xs={2}>1 of 2</Col>
//         <Col>2 of 2</Col>
//     </Row>
//     <Row>
//         <Col>1 of 3</Col>
//         <Col>2 of 3</Col>
//         <Col>3 of 3</Col>
//     </Row>
// </Container>    */}