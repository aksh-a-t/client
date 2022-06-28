import { Box, Drawer } from "@mui/material";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Category from "./Category";
import DrawerComp from "./DrawerComp";
import Navbar from "../Navbar";
import Product from "./Product";
import CreateBill from "./CreateBill";
import ViewBill from "./ViewBill";

const Admin = () => {
  const drawerWidth = 240;
  const container =
    window !== undefined ? () => window.document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [current,setCurrent] = React.useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
      <>
      {/* mobileOpen?0:9999 */}
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
            {<DrawerComp  current={current} setCurrent={setCurrent}/>}
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
            {<DrawerComp current={current} setCurrent={setCurrent}/>}
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
          <Routes>
            <Route index element={<>Hello</>}/>
            <Route path="/category" element={<Category />} />
            <Route path="/product" element={<Product/>}/>
            <Route path="/bill" element={<CreateBill/>}/>
            <Route path="/viewbill" element={<ViewBill/>}/>
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default Admin;
