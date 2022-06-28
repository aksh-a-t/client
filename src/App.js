// @ts-nocheck
import './App.css';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
// import DrawerComp from './Components/DrawerComp';
import SignUp from './Components/SignUp';
import {BrowserRouter , Routes , Route, useNavigate, Navigate} from 'react-router-dom';
import Category from './Components/Admin/Category';
import { Drawer } from '@mui/material';
import Admin from './Components/Admin/Admin';
import axios from 'axios';
import CreateBill from './Components/Admin/CreateBill';
// import Temp from './Components/User/ProductCard';

import User from './Components/User/User';
import { createContext } from 'react';
import { useState } from 'react';
import Home from './Components/Home';
const ProductContext = createContext(null);

const ContextData=()=>{
  const [orderData,setOrderData] = useState([]);
  return {
    orderData,setOrderData
  }
}
export const OrderContext = createContext(null);
function App() {
  const container = window !== undefined ? () => window.document.body : undefined;
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route  path="/register" element={<SignUp/>}/>
        <Route  path="/login" element={<Login/>}/>
        <Route path="/admin/*" element={<RequiredAuth><Admin/></RequiredAuth>}>
          {/* <Route path="/admin/category"  element={<Category/>}/> */}
          {/* <Route index  element={<Category/>}/> */}
        </Route>
        <Route path="/user" element={<OrderContext.Provider value={ContextData()}><RequiredAuth><User/></RequiredAuth></OrderContext.Provider>}/>
        {/* <Route path="/test" element={<Temp/>}/> */}
        {/* <Route path="/bill" element={<CreateBill/>}/> */}
        {/* <Route path="/category" element={<><Navbar/><Category/></>}/> */}
      </Routes>
      </div>
    </BrowserRouter>
  );
}
 function RequiredAuth({children}){
  // let token = localStorage.getItem("token");
  // if(token){
  //   axios.get('http://localhost:5000/api/check',{headers:{Authorization:`Bearer ${token}`}})
  //   .then((res)=>{
  //     return children;
  //   })
  //   .catch((error)=>{
  //     console.log(error);
  //     return <Navigate to="/login" replace/>;      
  //   })

  // }else{
  //   return <Navigate to="/login" replace/>;
  // }
  if(!localStorage.getItem("token")){
    return <Navigate to="/login" replace/>;
  }
  return children;
}
export default App;
