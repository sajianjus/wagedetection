import Dashboard from "../../components/Dashboard";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TIMEPERIOD_ENDPOINT } from '../../constants/urls';
import { LoginContext } from '../../App';
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";

import {Typography, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

import Grid from "@mui/material/Grid";


function HomePage(){
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const navigate = useNavigate();



  const [rows, setRows] = useState([]);



  const columns = [
    { field: 'agreement_name', headerName: 'Agreeement', width: 300 },
    {
      field: 'start',
      headerName: 'Start Date',
      width: 150,
    },
    {
      field: 'end',
      headerName: 'End Date',
      width: 150,
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
      field: 'shifts',
      headerName: 'Create/View',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return <Button spacing={2} href={`${params.row.id}/${params.row.agreement_id}/`}>Shifts</Button>
        }
    },
    {
      field: 'edit',
      headerName: '',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return <Button spacing={2} href=""><EditIcon /></Button>
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




    
    return (
      <Dashboard >
        <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h6">
              Hi {loggedIn ? jwtDecode(localStorage.getItem('access')).name ? jwtDecode(localStorage.getItem('access')).name: null:"[Name]"},
              you can use options within this menu to create, view and modify your Underpayment Detection instance
            </Typography>
            <Box sx={{marginTop: 1, flexGrow:1, alignItems: 'center'}}>
                <Grid container spacing={2}  sx={{marginTop:2}}>
                  <Grid item>
                    <Button href='/payCalc' variant="contained" size="large" sx={{mx:4, my:1}}>Create</Button>
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

export default HomePage;
