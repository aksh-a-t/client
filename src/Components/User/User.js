import { Box, Drawer, Toolbar } from '@mui/material';
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Category from '../Admin/Category';
import CreateBill from '../Admin/CreateBill';
import DrawerComp from '../Admin/DrawerComp';
import Product from '../Admin/Product';
import ViewBill from '../Admin/ViewBill';
import Navbar from '../Navbar';
import DrawerUser from './DrawerUser';
// import Temp from './ProductCard';
import UserHome from './UserHome';

const User = () => {
    const drawerWidth = 240; 
    const container =
      window !== undefined ? () => window.document.body : undefined;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };
    
  return (
    <div>
    <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 },marginTop:'64px' }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                zIndex:1300,
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {<DrawerUser/>}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                zIndex:"1000",
              },
            }}
            open
          >
            {<DrawerUser/>}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow:'auto',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
        <Toolbar/>
        {/* <Temp/> */}
        <UserHome/>
        </Box>
        </Box>

    </div>
  )
}

export default User