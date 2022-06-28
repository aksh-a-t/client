// @ts-nocheck
import { Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import React ,{useEffect,useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { OrderContext } from "../../App";

const DrawerUser = () => {
    const {orderData,setOrderData} = useContext(OrderContext)
    const [total,setTotal] = useState(0)
    useEffect(()=>{
        let temp=0;
        orderData.forEach(element => {
            temp+=element.quantity*element.price
        });
        setTotal(temp);
    },[orderData])
    // console.log(orderData);
    const increaseQnt=(id)=>{
        setOrderData((pre)=>{
            let ans = pre.map((val)=>{
                if(val.productId===id){
                    return {...val,quantity:val.quantity+1}
                }
                return val 
            })
            return ans;
        })
    }
    const decreaseQnt=(id)=>{
        setOrderData((pre)=>{
            let ans = pre.map((val)=>{
                if(val.productId===id&&val.quantity>0){
                    return {...val,quantity:val.quantity-1}
                }
                return val 
            })
            return ans;
        })
    }
    return(
        <>
            <Toolbar/>
            <List>
            {
                orderData.map((val)=>{
                    return(<>
                    <ListItem >
                        <ListItemText primary={val.product} secondary={val.price}/>
                        <IconButton
                         onClick={()=>increaseQnt(val.productId)}
                         >
                            +
                        </IconButton>
                        {val.quantity}
                        <IconButton
                         onClick={()=>decreaseQnt(val.productId)}
                         >
                            -   
                        </IconButton>
                        </ListItem>
                        </>
                    )
                })
            } 
            </List>
            <div style={{position:'fixed',bottom:0}}>
                Total Amount:{total}
            </div>
        </>
    )
//   // const [current,setCurrent] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   useEffect(()=>{
//     let path=location.pathname.split("/")[2];
//     let val=path.charAt(0).toUpperCase()+path.substring(1);
//     // console.log(path.length);
//     if(path.length===0){
//       setCurrent("Dashboard")
//     }else{
//       setCurrent(val);
//     }
//   },[])
//   const changeHandler=(event)=>{
//     setCurrent(event.currentTarget.getAttribute("id"));
//     navigate(event.currentTarget.getAttribute("value"));
//     console.log(event.currentTarget.getAttribute("id"));
//     console.log(event.currentTarget.getAttribute("value"));
//   }
//   return (
//     <div>
//       <div >
//         <Toolbar />
//         <Divider />
//         <List>
//         <ListItem  >
//               <ListItemButton id="Dashboard" className={current==="Dashboard"?"button":""} onClick={changeHandler} value="/admin/"  >
//                 <DashboardIcon/>
//                 <ListItemText primary={"Dashboard"} />
//               </ListItemButton>
//             </ListItem>

//             <ListItem  >
//               <ListItemButton id="Category" className={current==="Category"?"button":""} onClick={changeHandler} value="/admin/category">
//                 <CategoryIcon/>
//                 <ListItemText primary={"Category"} />
//               </ListItemButton>
//             </ListItem>

//             <ListItem  >
//               <ListItemButton id="Product" className={current==="Product"?"button":""} onClick={changeHandler} value="/admin/product">
//                 <InventoryIcon/>
//                 <ListItemText primary={"Manage Product"} />
//               </ListItemButton>
//             </ListItem>

//             <ListItem  >
//               <ListItemButton id="Bill" className={current==="Bill"?"button":""} onClick={changeHandler} value="/admin/bill">
//                 <InventoryIcon/>
//                 <ListItemText primary={"Create Bill"} />
//               </ListItemButton>
//             </ListItem>

//             <ListItem  >
//               <ListItemButton id="Viewbill" className={current==="Viewbill"?"button":""} onClick={changeHandler} value="/admin/viewbill">
//                 <MenuBookIcon/>
//                 <ListItemText primary={"View Bill"} />
//               </ListItemButton>
//             </ListItem>

//         </List>

  
//         {/* <Divider />
//         <List>
//           {["All mail", "Trash", "Spam"].map((text, index) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List> */}
//       </div>
//     </div>
//   );
};

export default DrawerUser;
