import FullCalendar from "@fullcalendar/react";
import rrulePlugin from '@fullcalendar/rrule'
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import { useNavigate, useParams } from "react-router-dom";
import {  useEffect, useState } from "react";
import { SLOTS_ENDPOINT } from "../../constants/urls";
import { AGREEMENT_DETAIL_ENDPOINT} from "../../constants/urls";
import { SLOT_ENDPOINT } from "../../constants/urls";
import Dashboard from "../../components/Dashboard";

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';





export const MyCalendar = () => {

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();
  const [agreementDetail, setAgreementDetail] = useState({"id": "", "agreement_id": "", "start": "", "end": "", "wage_per_hour": ""});


  const [open, setOpen] = useState(false);
  const [startDateTime, setStartDateTime] = useState();
  const [endDateTime, setEndDateTime] = useState();
  const [hours, setHours] = useState();
  const [slotId, setSlotId] = useState();
  const [weekDay, setWeekDay] = useState([]);
  const [color, setColor] = useState('green');


  
  const handleWeekDay = (event, newWeekDay) => {
    parseInt(newWeekDay);
    setWeekDay(newWeekDay);
  };


  const handleColor = (event) => {
    setColor(event.target.value);
  };



  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    if(checked)
    {
      setWeekDay([])
    }
  };
  





  const [value, setValue] = useState([]);



console.log(value)



  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));


  const handleLeaves = (newValue) =>{
    let lb = dayjs(newValue).format("YYYY-MM-DD")
    setValue([...value, lb])
  }

  const handleDelete = (label) => () => {
    setValue((value) => value.filter((v) => v !== label));
  };









  const handleClose = () => {
    setOpen(false);
  };





  const EventItem = ({ info }) => {
    const { event } = info;
    return (
      <div>
        <p>{event.title}</p>
      </div>
    );
  };


  // function getDaysBetweenDates(start, end, dayName) {
  //   var result = [];
  //   var days = {sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6};
  //   var day = days[dayName.toLowerCase().substr(0,3)];
  //   // Copy start date
  //   var current = new Date(start);
  //   // Shift to next of required days
  //   current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
  //   // While less than end date, add dates to result array
  //   while (current < end) {
  //     result.push(new Date(+current));
  //     current.setDate(current.getDate() + 7);
  //   }
  //   return result;  
  // }
  
  // // Get Wednesdays between 15 December, 2016 and 25 February, 2017.
  // console.log(getDaysBetweenDates(
  //               new Date("2023-09-01"),
  //               new Date("2023-09-30"),
  //               'Wed'));



  // function getDaysBetweenDates(start, end, dayName) {
  //   var result = [];
  //   const num = [3,1]
  //   var days = {sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6};
  //   var day = days[dayName.toLowerCase().substr(0,3)];
  //   // Copy start date
    
  //   // Shift to next of required days
  //     for(let i=0; i<num.length; i++)
  //     {
  //         var current = new Date(start);
  //         current.setDate(current.getDate() + (num[i] - current.getDay() + 7) % 7);
  //           // While less than end date, add dates to result array
  //           while (current < end) {
  //             result.push(new Date(+current));
  //             current.setDate(current.getDate() + 7);
  //           }
  //     }
  //   return result;  
  // }
  
  // // Get Wednesdays between 15 December, 2016 and 25 February, 2017.
  // console.log(getDaysBetweenDates(
  //               new Date("2023-09-01"),
  //               new Date("2023-09-30"),
  //               'Wed'));
  

    const getDaysBetweenDates = (start, end, weekDay) => {
    var result = [];
      for(let i=0; i<weekDay.length; i++)
      {
          var current = new Date(start);
          current.setDate(current.getDate() + (weekDay[i] - current.getDay() + 7) % 7);
            // While less than end date, add dates to result array
            while (current < end) {
              result.push(new Date(+current));
              current.setDate(current.getDate() + 7);
            }
      }
    return result.length;  
  }





  // console.log(agreementDetail.end)
  
  const submitSelect = (e) => {
    e.preventDefault();
   
    let total_wage;
    if(weekDay.length > 0)
      {
        const countWeekDay = getDaysBetweenDates(new Date(agreementDetail.start),new Date(agreementDetail.end).setDate(new Date(agreementDetail.end).getDate()+1), weekDay)
        total_wage = hours * agreementDetail.wage_per_hour * countWeekDay;
      }
      else
      {
        total_wage = hours * agreementDetail.wage_per_hour;
      }
      const pushData = {title:agreementDetail.wage_per_hour+'$/hour', startDateTime:startDateTime, endDateTime:endDateTime, backgroundColor:color, daysOfWeek:weekDay, leaves:value, wagePerSlot:total_wage}

          if(slotId)
          {
            const url = SLOT_ENDPOINT+slotId+'/';
            fetch(url,
            {method:'PATCH', headers:{'Content-Type':'application/json', Authorization: 'Bearer '+localStorage.getItem('access')}, 
            body:JSON.stringify(pushData)})
            .then((response) => {
                if(!response.ok)
                {
                    throw new Error('Something went wrong!');
                }
                return response.json();
            })
            .then((responseData) => {
                // console.log(responseData.slots)
                // setEvents([...events, responseData.slots]);
                
                if(responseData.slot.days_of_week.length > 0)
                {
                  var newEvent = {'id':responseData.slot.id, 'title':responseData.slot.title, 'startTime':responseData.slot.startTime, 'endTime':responseData.slot.endTime, 'daysOfWeek': responseData.slot.days_of_week}
                }
                else
                {
                  var newEvent = {'id':responseData.slot.id, 'title':responseData.slot.title, 'start':responseData.slot.start, 'end':responseData.slot.end, 'backgroundColor':responseData.slot.background_color}
                }
                setEvents([...events,newEvent]);
  
                setOpen(false) 
                
            }).catch((e)=>{
                console.log(e)
                setOpen(true)
            })
          }
          else
          {
          const url = SLOTS_ENDPOINT+id+'/';
          fetch(url,
          {method:'POST', headers:{'Content-Type':'application/json', Authorization: 'Bearer '+localStorage.getItem('access')}, 
          body:JSON.stringify(pushData)})
          .then((response) => {
              if(!response.ok)
              {
                  throw new Error('Something went wrong!');
              }
              return response.json();
          })
          .then((responseData) => {
              // console.log(responseData.slots)
              // setEvents([...events, responseData.slots]);
              if(responseData.slots.days_of_week.length > 0)
              {
                var newEvent = {'id':responseData.slots.id, 'title':responseData.slots.title, 'startTime':responseData.slots.startTime, 'endTime':responseData.slots.endTime, 'daysOfWeek': responseData.slots.days_of_week}
              }
              else
              {
                var newEvent = {'id':responseData.slots.id, 'title':responseData.slots.title, 'start':responseData.slots.start, 'end':responseData.slots.end, 'backgroundColor':responseData.slots.background_color}
              }
              // console.log(newEvent)
              setEvents([...events,newEvent]);
              // console.log(events)

              setOpen(false) 
              
          }).catch((e)=>{
              console.log(e)
              setOpen(true)
          }) 
          }
}





  const handleSelect = (info) => { 
    const startDateTime = info.startStr
    const endDateTime = info.endStr
    const startTime = new Date(startDateTime).getTime();
    const endTime = new Date(endDateTime).getTime();
    const total_hours = Math.abs(startTime-endTime)/3600000;
    setStartDateTime(startDateTime)
    setEndDateTime(endDateTime)
    setHours(total_hours)
    setOpen(true) 
  };




  const handleResize = (resizeInfo) => {
    const startDateTime = resizeInfo.event.startStr
    const endDateTime = resizeInfo.event.endStr
    const startTime = new Date(startDateTime).getTime();
    const endTime = new Date(endDateTime).getTime();
    const total_hours = Math.abs(startTime-endTime)/3600000;
    setStartDateTime(startDateTime)
    setEndDateTime(endDateTime)
    setHours(total_hours)
    setSlotId(resizeInfo.event.id)
    setOpen(true)
  }






useEffect(()=>{

        const url = AGREEMENT_DETAIL_ENDPOINT+id+'/';
        fetch(url,{method:'GET', headers:{'Content-Type':'application/json', Authorization: 'Bearer ' + localStorage.getItem('access')}})
        .then((response) => {
            if(!response.ok)
            {
                throw new Error('Something went wrong!');
            }
            return response.json();
        })
        .then((responseData) => {
                setAgreementDetail(responseData.agreementdetail)       
    
        }).catch((e)=>{
            navigate('/');
            console.log(e)  
        });
      
},[]);





useEffect(()=>{

        const url = SLOTS_ENDPOINT+id+'/';
        fetch(url,{method:'GET', headers:{'Content-Type':'application/json', Authorization: 'Bearer ' + localStorage.getItem('access')}})
        .then((response) => {
            if(!response.ok)
            {
                throw new Error('Something went wrong!');
            }
            return response.json();
        })
        .then((responseData) => {
            // setEvents(responseData.slots);
            console.log(responseData.slots);
            const allEvents = [];
            responseData.slots.map((e)=>{
              if(e.days_of_week.length > 0)
              {
                allEvents.push({'id':e.id, 'title':e.title,'startTime':e.startTime, 'endTime':e.endTime, 'daysOfWeek': e.days_of_week})
              }
              else
              {
                allEvents.push({'id':e.id, 'title':e.title, 'start':e.start, 'end':e.end, 'backgroundColor':e.background_color})
              }
              setEvents(allEvents);
                });

        }).catch((e)=>{
            navigate('/');
            console.log(e)  
        });
    
},[id, navigate]);


// "rrule":{"freq":"weekly","dtstart":e.startDate}  ,  "byweekday":["mo", "tu","we","th","fr", "su", "sa"] 
// console.log(events)


// "rrule":{"freq":"daily", "dtstart":e.start, "until":"2023-09-30"},

// "duration":"05:30", "rrule":{"freq":"weekly", "dtstart":e.start, "until":"2023-09-30" ,"byweekday":["mo", "tu","we","th","fr", "su", "sa"] , "interval":2}, 'exdate': ["2023-09-13T06:00:00Z"]
  return (
    <Dashboard>
        <div>
          <Dialog open={open}>
          <Box component="form" onSubmit={submitSelect} noValidate sx={{ mt: 1, width:600}}>
            <DialogTitle>Select Over Time or Recurring</DialogTitle>
            <DialogContent>
              <DialogContentText>Over TIme Period</DialogContentText>
              <ToggleButtonGroup
                value={color}
                exclusive
                onChange={handleColor}
                aria-label="text alignment"
              >
                <ToggleButton value="red" aria-label="left aligned">
                  Yes
                </ToggleButton>
                <ToggleButton value="green" aria-label="centered">
                  No
                </ToggleButton>
              </ToggleButtonGroup>
              <DialogContentText sx = {{mt:2}}></DialogContentText>
              <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label="Select Recurring"/>
              

              {checked ?
              <>
              <DialogContentText sx = {{mt:2}}>Day of week</DialogContentText>
              <ToggleButtonGroup value={weekDay} onChange={handleWeekDay} aria-label="text alignment">
                  <ToggleButton value="1" aria-label="Monday">M</ToggleButton>
                  <ToggleButton value="2" aria-label="Tuesday">T</ToggleButton>
                  <ToggleButton value="3" aria-label="Wednesday">W</ToggleButton>
                  <ToggleButton value="4" aria-label="Thursday">T</ToggleButton>
                  <ToggleButton value="5" aria-label="Friday">F</ToggleButton>
                  <ToggleButton value="6" aria-label="Saturday">S</ToggleButton>
                  <ToggleButton value="0" aria-label="Sunday">S</ToggleButton>
              </ToggleButtonGroup>
              
              <DialogContentText sx = {{mt:4}}>List of Leaves</DialogContentText>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker onChange={handleLeaves} required />
              </LocalizationProvider>
              <Paper
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  listStyle: 'none',
                  p: 0.5,
                  m: 0,
                }}
                component="ul"
              >
                {value.map((value, i) => {
                  let icon;

                  return (
                    <ListItem key={i}>
                      <Chip
                        icon={icon}
                        label={value}
                        onDelete={handleDelete(value)}
                      />
                    </ListItem>
                  );
                })}
              </Paper>
             </>
              :
              <></>}
            </DialogContent>
            <Button type="submit" variant="contained"  sx={{ m:3 }}>Submit</Button>
            <Button onClick={handleClose} variant="contained"  sx={{ ml:2 }}>Close</Button>
            </Box>
            <Box>
            </Box>
          </Dialog>
    </div>
    <div>



      <FullCalendar
        initialView="timeGridWeek"
        timeZone="UTC"
        dayMaxEvents={true}
        editable={true}
        selectable={true}
        events={events}
        eventColor={'#d1ded5'}
        eventBorderColor={'#000000'}
        select={handleSelect}
        eventResize={handleResize}
        aspectRatio={6}
        height={600}
        headerToolbar={{
            left: 'prev,next',
            center:'title',
            right:'timeGridWeek,dayGridMonth'
        }}
        
        validRange= {{
              start: new Date(agreementDetail.start),
              end: new Date(agreementDetail.end).setDate(new Date(agreementDetail.end).getDate()+1),
            }}

        eventContent={(info) => <EventItem info={info} />}
        plugins={[rrulePlugin, daygridPlugin, interactionPlugin, timeGridPlugin]}
      />

    </div>
    </Dashboard>
  );
};




// const handleResize = (resizeInfo) => {

//   const startDateTime  = resizeInfo.event.startStr
//   const endDateTime = resizeInfo.event.endStr
//   let decimalRegex = /^\d+(\.\d{1,2})?$/
//   const startTime = new Date(startDateTime).getTime();
//   const endTime = new Date(endDateTime).getTime();
//   const hours = Math.abs(startTime-endTime)/3600000;
//   const wageInput = Number(prompt("Enter Wage Amount in Dollar($)/Hour"));


//   if(Number(wageInput))
//     {
//       if (decimalRegex.test(wageInput))
//       { 
//         const total_wage = hours * wageInput;
//         const pushData = {title:'Total: '+total_wage+' $', startDateTime:startDateTime, endDateTime:endDateTime, wage:total_wage}
//         // setEvents([...events, pushData]);
//         // console.log(pushData)

//         const url = SLOT_ENDPOINT+resizeInfo.event.id+'/';
//         fetch(url,
//         {method:'PATCH', headers:{'Content-Type':'application/json', Authorization: 'Bearer '+localStorage.getItem('access')}, 
//         body:JSON.stringify(pushData)})
//         .then((response) => {
//             if(!response.ok)
//             {
//                 throw new Error('Something went wrong!');
//             }
//             return response.json();
//         })
//         .then((responseData) => {
//             setEvents([...events, responseData.slot]);
//             // console.log(responseData.slots)
            
//         }).catch((e)=>{
//             console.log(e)
//         })          
//       }
//       else
//       {
//         alert("Enter Wage in Numeric Value."); 
//       }
//     }    
// }
