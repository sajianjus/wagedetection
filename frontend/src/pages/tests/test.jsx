import Dashboard from "../../components/Dashboard";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AWARD_CLASSIFICATION_ENDPOINT, TIMEPERIOD_ENDPOINT } from '../../constants/urls';
import { LoginContext } from '../../App';
import { useNavigate } from "react-router-dom";

import {Typography, Box, Button, TextField, Link, Alert } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AWARD_ENDPOINT } from "../../constants/urls";

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from "@mui/material/Grid";


function HomePage(){
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  
  const [govAgreement, setGovAgreement] = useState([] || null);
  const [govAgreementBreak, setGovAgreementBreak] = useState([] || null);
  const [award, setAward] = useState({"award_id":'',"award_name":''});
  const [classification, setClassification] = useState({"classification_id":'',"classificatio_name":''});
  const date = new Date();
  const [value, setValue] = useState(dayjs(date));
  const [value2, setValue2] = useState(dayjs(date));
  const [wagePerHour, setWagePerHour] = useState("0.0");
  const [rows, setRows] = useState([]);


  console.log(value)
  console.log(value2)
  // console.log(value.toJSON())
  // console.log(value2.toJSON())
  console.log(value.toJSON().slice(0,10))
  console.log(value2.toJSON().slice(0,10))
  // console.log(new Date(value))
  // console.log(new Date(value2))

  const selectAwardChange = (event) => {
    govAgreement.map((e)=>{
        if(e.award_fixed_id == event.target.value)
        {
            setAward({"award_id":e.award_fixed_id, "award_name":e.name})
        }
    });

  };

  const selectClassificationChange = (event) => {
    govAgreementBreak.map((e)=>{
        if(e.classification_fixed_id == event.target.value)
        {
          setClassification({"classification_id":e.classification_fixed_id, "classificatio_name":e.classification})
        }
    });

  };



  const columns = [
    { field: 'agreement_name', headerName: 'Agreeement', width: 300 },
    {
      field: 'start',
      headerName: 'Start Date',
      width: 160,
    },
    {
      field: 'end',
      headerName: 'End Date',
      width: 160,
    },
    {
      field: 'wage_per_hour',
      headerName: 'Wage Per Hour($)',
      width: 160,
    },
    {
      field: 'total_wage_in_detection_period',
      headerName: 'Total Wage ($)',
      width: 160,
    },
    // {
    //   field: 'startend',
    //   headerName: 'Start/End Date',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 200,
    //   valueGetter: (params) =>
    //     `${params.row.start|| ''} / ${params.row.end || ''}`,  
    // },
    {
      field: 'createviews',
      headerName: 'Create/Views',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return <Button spacing={2} href={`${params.row.id}/${params.row.agreement_id}/`}>Shifts</Button>
        }
    },

  ];
  


  useEffect(()=>{
    axios.get(TIMEPERIOD_ENDPOINT, 
    {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + localStorage.getItem('access')}},
    ).then((response)=>{
        // console.log(response)
        // console.log(response.data.timeperiods)
        setRows(response.data.timeperiods);
        setLoggedIn(true);
    }).catch((error)=>{
        setLoggedIn(false);
        navigate('/login');
    });
  },[]);





    useEffect(()=>{

      axios.get(AWARD_ENDPOINT, 
        {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + localStorage.getItem('access')}},
        ).then((response)=>{
            // console.log(response)
            setGovAgreement(response.data.awards.results)
            setLoggedIn(true);
        }).catch((error)=>{
            setLoggedIn(false);
          
        });


        if(award.award_id)
        {
          axios.get(AWARD_CLASSIFICATION_ENDPOINT+award.award_id+'/', 
            {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + localStorage.getItem('access')}},
            ).then((response)=>{
                console.log(response)
                setGovAgreementBreak(response.data.classifications.results)
                setLoggedIn(true);
            }).catch((error)=>{
                setLoggedIn(false);
              
            });
        }
    
  },[award.award_id]);




  // useEffect(()=>{

  //   fetch('https://uatapi.fwc.gov.au/api/v1/awards?page=1&limit=10', {
  //       method: 'GET',
  //       // Request headers
  //       headers: {
  //           'Access-Control-Allow-Origin': '*',
  //           'Cache-Control': 'no-cache',
  //           'Ocp-Apim-Subscription-Key': '57d39731a7124c4d977f3b1fcbaf956a',}
  //   })
  //   .then(response => {
  //       console.log(response.status);
  //       console.log(response.text());
  //   })
  //   .catch(err => console.error(err));
  // },[]);

  // govAgreement.map((e)=>{console.log(e.name)})






    useEffect(()=>{

      if(loading)
      {   
          axios.post(TIMEPERIOD_ENDPOINT,
          {agreementId:award.award_id, agreementName:award.award_name, startDate:value.toJSON().slice(0,10), endDate:value2.toJSON().slice(0,10), wagePerHour:wagePerHour}, 
          {headers: {"Content-type": "application/json", Authorization: 'Bearer ' + localStorage.getItem('access')}},
          ).then((response)=>{
              console.log(response)
              setRows([response.data.timeperiod, ...rows]);
              setLoggedIn(true);
              setLoading(false);
              setError(false);
              navigate('/');
          }).catch((error)=>{
              setError(true);
              setLoggedIn(false);
              setLoading(false);
          });
      }
  },[loading]);



  
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      setError(false);
    };



    if(loading)
    {
      return (<Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
        <CircularProgress />
        </Box>);
    }
    else
    {
      return (
        <Dashboard >
          {error 
            ? 
            (<Alert severity="error">Error Logging In — check it out!</Alert>)
            :
            (<div></div>)}
          <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Create Time Period Detection
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{marginTop: 5, flexGrow:1, alignItems: 'center'}}>
                  <Grid container spacing={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <Grid item>
                      <DatePicker label="Start Date" value={value} onChange={(newValue) => setValue(newValue)} required />
                    </Grid>
                    <Grid item>
                      <DatePicker label="End Date" value={value2}  onChange={(newValue2) => setValue2(newValue2)} required />
                    </Grid>
                  </LocalizationProvider>
                  </Grid>


                  <Grid container spacing={2}  sx={{marginTop:2}}>
                      <Grid item>
                      <FormControl fullWidth sx={{width:250}}>
                      <InputLabel id="demo-simple-select-label">Agreement</InputLabel>
                      <Select name="agreement" labelId="demo-simple-select-label" id="demo-simple-select" label="Agreement" value={award.award_id} onChange={selectAwardChange} required > 
                        {govAgreement.map((agre)=>{
                          return <MenuItem key={agre.award_fixed_id} value={agre.award_fixed_id}>{agre.name}</MenuItem>
                        })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                    <FormControl fullWidth sx={{width:250}}>
                      <InputLabel id="demo-simple-select-label2">Classification</InputLabel>
                      <Select name="classification" labelId="demo-simple-select-label2" id="demo-simple-select2" label="Classification" value={classification.classification_id} onChange={selectClassificationChange} required > 
                        {govAgreementBreak.map((classi)=>{
                          return <MenuItem key={classi.classification_fixed_id} value={classi.classification_fixed_id}>{classi.classification}</MenuItem>
                        })}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
              
                  <Grid container spacing={2}  sx={{marginTop:2}}>
                  <Grid item>
                      <TextField type="number" variant="outlined" inputProps={{maxLength: 13,step: "1"}} sx={{width:250}} value={wagePerHour} onChange={(e) => setWagePerHour(parseFloat(e.target.value).toFixed(2))}/>
                    </Grid>
                    <Grid item>
                      <Button type="submit" variant="contained" size="large" sx={{mx:4, my:1}}>Create</Button>
                    </Grid>
                  </Grid>
              </Box>
            </Box>
            <Box sx={{ mt: 6 }}>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 15, 20]}
                  // checkboxSelection
                />
              </div>
            </Box>


        </Dashboard>
        
      );
            }
}
export default HomePage;
