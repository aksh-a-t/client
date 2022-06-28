// @ts-nocheck
import {
  Toolbar,
  Card,
  CardActions,
  Button,
  Box,
  TextField,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ButtonGroup,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip, 
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from 'react-alert';
import DeleteIcon from "@mui/icons-material/Delete";

const Order = () => {
  const InitialVal = {
    productId:"",
    product:"",
    categoryId:"",
    quantity:"",
    price:"",
    total:""
  }
  const [customer,setCustomer] = useState({
    userName:"",
    contact:""
  });
  const [category,setCategory] = useState([]);
  const [products,setProducts] = useState({});
  const [selectedProducts,setSelectedProducts] = useState([]);
  const [current,setCurrent] = useState(InitialVal);
  const [dataList,setDataList] = useState([]);
  const [amount,setAmount] = useState(0);
  const alert = useAlert();
  useEffect(()=>{
    // getCategory();
    getProducts();
  },[])

  const getProducts=()=>{
    let token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/product/user",{headers:{Authorization:`Bearer ${token}`}})
    .then((res)=>{
      console.log(res.data.data);
      let keys = Object.keys(res.data.data);
      let ans=keys.map((val)=>{
        return{
          id:val,
          category:res.data.data[val]?.[0]?.['category']
        }
      })
      console.log(ans);
      setCategory(ans);
      setProducts(res.data.data)
    })
  }
  // const getCategory=()=>{
  //   let token=localStorage.getItem("token");
  //   axios.get("http://localhost:5000/api/category",{headers:{Authorization:`Bearer ${token}`}})
  //   .then((res)=>{
  //     setCategory(res.data.data);
  //   })
  // }

  const customerChange=(e)=>{
    const {name,value} = e.target;
    setCustomer((pre)=>{
      return {
        ...pre,
        [name]:value
      }
    })
  }

  const selectedCategory=(e)=>{
    setCurrent((pre)=>{
      return{
        ...InitialVal,
        categoryId:e.target.value
      }
    })
    console.log(products);
    setSelectedProducts(products[e.target.value]);
  }
  const productSelect=(e)=>{
    let temp = products[current.categoryId];
    let ans = temp.find((val)=>{
      if(e.target.value===val['productId']){
        return val;
      }
    })
    console.log(ans);
    setCurrent((pre)=>{
      return{
        ...pre,
        product:ans.product,
        productId:e.target.value,
        price:ans.price,
        quantity:1,
        total:ans.price
      }
    })
  }
  const quantityHandler=(e)=>{
    console.log(current);
    console.log(e.target.value*current.price);
    setCurrent((pre)=>{
      return{
        ...pre,
        quantity:e.target.value,
        total:pre.price*e.target.value
      }
    })
  }
  const addHandler=()=>{
    if(current.product&&current.quantity>0&&current.total>0){
      let val=dataList.find((val)=>{
        let ans=val['productId']===current.productId
        if(ans){
          return true;
        }
      })
      console.log(val);
      if(!val){
        setDataList((pre)=>{
          let ans = [...pre];
          ans.unshift(current);
          // let ans=pre.unshift(current);
          return ans; 
        });
        setAmount((pre)=>{
          return pre+current.total
        })
        setCurrent(InitialVal);
      }else{
        alert.error("Product Already Add");
      }
    }
    else{
      alert.error("Add Products");
    }
  }
  const deleteDialog=(id)=>{
    console.log(id);
    let amount;
    setDataList((pre)=>{
      let ans = pre.filter((val)=>{
        if(val['productId']!==id){
          return true;
        }else{
          amount=val['quantity']*val['price'];
        }
      })
      return ans;
    })
    console.log(amount);
    setAmount((pre)=>pre-amount)
  }
  const createBill=()=>{
    if(dataList.length>0&&amount>0&&customer.userName&&customer.contact){
      let token = localStorage.getItem("token");
      axios.post("http://localhost:5000/api/bill/create",{customerName:customer.userName,contact:customer.contact,productDetails:dataList,total:amount},{headers:{Authorization:`Bearer ${token}`}})
      .then((res)=>{
        setDataList([]);
        setAmount(0);
        setCustomer({userName:"",contact:""});
        setCurrent(InitialVal);
        alert.success("Created");
      })
      .catch((error)=>{
        console.log(error);
        alert.error("Error");
      })
    }else{
      alert.error("Enter Required Info");
    }
  }
  return (
    <div>
      <Toolbar />
      <Card className="card">
        <CardActions sx={{ justifyContent: "space-between" }}>
          <div>Create Bill</div>
          <Button
            className="button"
               onClick={createBill}
          >
            Create
          </Button>
        </CardActions>
      </Card>
      <Card className="card">
        <CardContent>Customer Details</CardContent>
        <CardActions
          sx={{
            display: { sm: "flex" },
            justifyContent: { sm: "space-around" },
          }}
        >
          <TextField
            color="success"
            label="Customer Name"
            type="text"
            variant="outlined"
            name="userName"
              value={customer.userName}
              onChange={customerChange}
          />
          <TextField
            color="success"
            label="Contact No."
            type="number"
            variant="outlined"
            name="contact"
              value={customer.contact}
              onChange={customerChange}
          />
        </CardActions>
      </Card>

      <Card
        className="card"
        sx={{
          "& .css-z8sjnq-MuiCardActions-root>:not(:first-of-type)": {
            marginLeft: "0px !important",
          },

        }}
      >
        <CardContent>Select Product</CardContent>
        <CardActions
          sx={{
            display: { md: "flex", xs: "grid" },
            gridTemplateColumns: { xs: "1fr 1fr" },
            justifyContent: { sm: "space-between" },
            // gap:{xs:'10px'}
          }}
        >
          <FormControl sx={{ maxWidth: { md: 170 }, width: { md: "100%" } }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={current.categoryId}
              name="categoryId"
              label="Category"
              onChange={selectedCategory}
            >
              {
                category&&category.map((val,i)=>{
                  return(
                  <MenuItem key={i} value={val['id']}>{val['category']}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>

          <FormControl sx={{ maxWidth: { md: 170 }, width: { md: "100%" } }}>
            <InputLabel>Product</InputLabel>
            <Select
              value={current.productId}
              name="productId"
              label="Product"
              onChange={productSelect}
            >
              {
                selectedProducts&&selectedProducts.map((val,i)=>{
                  return(
                  <MenuItem key={i} value={val['productId']}>{val['product']}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>

          <TextField
                      InputProps={{
              readOnly: true,
            }}

            color="success"
            label="Price"
            type="text"
            variant="outlined"
            name="price"
              value={current.price}
            //   onChange={addChangeHandler}
          />
          <TextField
            color="success"
            label="Quantity"
            type="number"
            variant="outlined"
            name="quantity"
              value={current.quantity}
              onChange={quantityHandler}
          />
          <TextField
            InputProps={{
              readOnly: true,
            }}
            color="success"
            label="Total"
            type="number"
            variant="outlined"
            name="total"
              value={current.total}
              // onChange={addChangeHandler}
          />
        </CardActions>
        <CardActions sx={{justifyContent:"space-between"}} >
          <Button onClick={addHandler} className="button" >
            Add
          </Button>
          <Button disabled className="button">{`Total Amount:${amount}`}</Button>

        </CardActions>
      </Card>

      <Paper className="card">
        <TableContainer sx={{ maxHeight: 350 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">Product</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.map((val, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    <TableCell align="center">{val["product"]}</TableCell>
                    <TableCell align="center">{val["price"]}</TableCell>
                    <TableCell align="center">{val["quantity"]}</TableCell>
                    <TableCell align="center">{val["total"]}</TableCell>
                    <TableCell align="center">
                        <Tooltip title="Delete">
                          <IconButton onClick={()=>deleteDialog(val['productId'])}>
                            <DeleteIcon sx={{ color: "limegreen" }} />
                          </IconButton>
                        </Tooltip>
                      {/* <ButtonGroup>
                        <Tooltip title="Edit Product">
                          <IconButton onClick={()=>editHandler(val)} >
                            <EditIcon sx={{ color: "limegreen" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={val["status"] ? "Dactivate" : "Activate"}
                        >
                          <Switch
                            checked={val['status']}
                            onChange={()=>statusHandler(val['productId'])}
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": {
                                color: "limegreen",
                              },
                              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                {
                                  backgroundColor: "limegreen",
                                },
                            }}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </Tooltip>
                      </ButtonGroup> */}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </div>
  );
};

export default Order;
