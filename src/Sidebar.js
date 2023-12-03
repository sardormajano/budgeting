import React from 'react';
import { AddCard, CalendarMonth, DateRange, LocalOffer, PointOfSale } from '@mui/icons-material';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

export const Sidebar = ({ drawerWidth }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
      open
    >
      <div>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton to='/add-payment' component={Link}>
              <ListItemIcon>
                <AddCard /> 
              </ListItemIcon>
              <ListItemText primary="Add Payment" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton to='/periods' component={Link}>
              <ListItemIcon>
                <CalendarMonth /> 
              </ListItemIcon>
              <ListItemText primary="Periods" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton to='/payments' component={Link}>
              <ListItemIcon>
                <PointOfSale /> 
              </ListItemIcon>
              <ListItemText primary="Payments" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton to='/create-period' component={Link}>
              <ListItemIcon>
                <DateRange /> 
              </ListItemIcon>
              <ListItemText primary="Create Period" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton to='/create-tag' component={Link}>
              <ListItemIcon>
                <LocalOffer /> 
              </ListItemIcon>
              <ListItemText primary="Create Tag" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </Drawer>
  )
}