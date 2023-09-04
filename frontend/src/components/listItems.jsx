import * as React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalculateSharpIcon from '@mui/icons-material/CalculateSharp';


export const mainListItems = (
  <React.Fragment>
    <LinkContainer to='/'>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Calculator"/>
    </ListItemButton>
    </LinkContainer>
  </React.Fragment>
);


let date = new Date();
let day = date.getDate();
let month = date.getMonth()+1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`
export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
    {currentDate}
    </ListSubheader>
  </React.Fragment>
);