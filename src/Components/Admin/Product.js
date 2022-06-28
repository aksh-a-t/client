import {
  Toolbar,
  Card,
  CardActions,
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Switch,
  ButtonGroup,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  DialogContentText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";

const Product = () => {
  const defaultVal={
    open:false,
    product:"",
    price:'',
    discription:'',
    category:"",
    categoryId:'',
    type:"",
    productId:"",
    status:""
  }
  const [dataList, setDataList] = useState([]);
  const [details,setDetails] = useState(defaultVal);
  const[category,setCategory] = useState([]);
  const [checks, setChecks] = useState(true);
  const [deleteDialog,setDeleteDialog] = useState({
    open:false,
    id:""
  });
  const alert = useAlert();

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/product/admin", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.data);
        setDataList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
      axios.get("http://localhost:5000/api/category",{headers:{Authorization:`Bearer ${token}`}})
      .then((res)=>{
        setCategory(res.data.data);
      })
      .catch((error)=>{
        console.log(error);
      })
  }, []);

  useEffect(()=>{
    if(details.categoryId&&details.discription&&details.price&&details.product){
      setChecks(false);
    }else{
      setChecks(true);
    }
  },[details])
  const closeAddDialog=()=>{
    setDetails(defaultVal);
    // setChecks(true);
  }
  const addChangeHandler=(event)=>{
    const {name,value} = event.target;
    if(name==="categoryId"){
      let valname = category.filter((val)=>val['id']===value)
      setDetails((pre)=>{
        return{
          ...pre,
          category:valname[0]['category']
        }
      })
      // setChecks(true);
    }
    setDetails((pre)=>{
      return{
        ...pre,
        [name]:value
      }
    })
  }
  const createAgree=()=>{
    let data={
      product:details.product,
      discription:details.discription,
      price:details.price,
      categoryId:details.categoryId,
      category:details.category
    }
    let token = localStorage.getItem("token");
    axios.post('http://localhost:5000/api/product/create',data,{headers:{Authorization:`Bearer ${token}`}})
    .then((res)=>{
      console.log(res);
      // @ts-ignore
      // dataList.unshift(res['data']['data']);
      setDataList((pre)=>[res["data"]["data"],...pre]);
      setDetails(defaultVal);
      // setChecks(true);
      alert.success("Product Created")
    })
    .catch((error)=>{
      console.log(error);
      alert.error("Error");
      setDetails(defaultVal);
      // setChecks(true);
    })
  }

  const editHandler=(val)=>{
    const {category,categoryId,discription,price,product,productId,status}=val;
    // @ts-ignore
    setDetails((pre)=>{
      return{
        product,
        productId,
        price,
        discription,
        status,
        category,
        categoryId,
        open:true,
        type:"Edit"
      }
    })
  }
  const confirmEdit=()=>{
    let data={
      id:details.productId,
      product:details.product,
      price:details.price,
      discription:details.discription,
      categoryId:details.categoryId
    }
    console.log(dataList);
    let token = localStorage.getItem("token");
    axios.patch("http://localhost:5000/api/product/update",data,{headers:{Authorization:`Bearer ${token}`}})
    // @ts-ignore
    .then((res)=>{
      // @ts-ignore
      setDataList((pre)=>{
        let ans = pre.filter((val)=>{
          // @ts-ignore
          if(val.productId!==details.productId){
            return val;
          }
        })
        ans.unshift({
          category: details.category,
          categoryId: details.categoryId,
          discription: details.discription,
          price: details.price,
          product: details.product,
          productId: details.productId,
          status:details.status
        })
        return ans;
      })
      setDetails(defaultVal);
      alert.success("Product Updated");
    })
    .catch((error)=>{
      console.log(error);
      alert.error("Error");
    })
  }
  const deleteHandler=()=>{
    // console.log(deleteDialog);
    let token=localStorage.getItem("token");
    axios.delete(`http://localhost:5000/api/product/delete/${deleteDialog.id}`,{headers:{Authorization:`Bearer ${token}`}})
    .then((res)=>{
      // @ts-ignore
      setDataList((pre)=>{
        let ans=pre.filter((val)=>val['productId']!==deleteDialog.id)
        return ans;
      })
      setDeleteDialog({open:false,id:""});
      alert.success("Delete Successfully");
    })
    .catch((error)=>{
      console.log(error);
      alert.error("Error");
      setDeleteDialog({open:false,id:""});
    })
  }
  const statusHandler=(id)=>{
    let temp = dataList.find((val)=>val['productId']===id);
    let token=localStorage.getItem("token");
    if(temp){
      // @ts-ignore
      axios.patch('http://localhost:5000/api/product/update/status',{id:id,status:!temp.status},{headers:{Authorization:`Bearer ${token}`}})
      .then((res)=>{
        // @ts-ignore
        setDataList((pre)=>{
          let ans=pre.map((val)=>{
            if(val['productId']===id){
              return{
                // @ts-ignore
                ...val,
                // @ts-ignore
                status:!val.status
              }
            }
            return val;
          })
          return ans;
        })
        alert.success("Status Updated");
      }).catch((error)=>{
        console.log(error);
        alert.error("Error");
      })

    }
  }
  return (
    <div>
      <Toolbar />
      <Card className="card">
        <CardActions sx={{ justifyContent: "space-between" }}>
          <div>Manage Products</div>
          <Button className="button" onClick={() => setDetails({...details,open:true,type:"Add"})}>
            Add Product
          </Button>
        </CardActions>
      </Card>
      <Card className="card">
        <CardActions>
          <TextField fullWidth size="small" label="Filter" type="search" />
        </CardActions>
      </Card>
      <Paper className="card">
        <TableContainer sx={{ maxHeight: 350 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">Product</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Discription</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.map((val, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    <TableCell align="center">{val["product"]}</TableCell>
                    <TableCell align="center">{val["category"]}</TableCell>
                    <TableCell align="center">{val["discription"]}</TableCell>
                    <TableCell align="center">{val["price"]}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup>
                        <Tooltip title="Edit Product">
                          <IconButton onClick={()=>editHandler(val)} >
                            <EditIcon sx={{ color: "limegreen" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={()=>setDeleteDialog({open:true,id:val['productId']})}>
                            <DeleteIcon sx={{ color: "limegreen" }} />
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
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={details.open}
        onClose={closeAddDialog}
        sx={{
          "& .MuiDialogContent-root": { padding: "5px 20px" },
          ".MuiDialogTitle-root+.css-ypiqx9-MuiDialogContent-root": {
            paddingTop: "10px  ",
          },
        }}
      >
        <DialogTitle sx={{ background: "limegreen" }}>{details.type} Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            color="success"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"
            value={details.product}
            name="product"
            onChange={addChangeHandler}
          />
        </DialogContent>
        <DialogContent>
          <Box
            sx={{
              display: { xs: "flex" },
              justifyContent: { xs: "space-between" },
            }}
          >
            <TextField
              color="success"
              label="Price"
              type="number"
              variant="outlined"
              name="price"
              value={details.price}
              onChange={addChangeHandler}
            />
            <FormControl sx={{ maxWidth: 220, width: "100%" }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={details.categoryId}
                name="categoryId"
                label="Category"
                onChange={addChangeHandler}
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
          </Box>
        </DialogContent>

        <DialogContent>
          <TextField
            autoFocus
            color="success"
            label="Discription"
            type="text"
            fullWidth
            variant="outlined"
            name="discription"
            value={details.discription}
            onChange={addChangeHandler}
          />
        </DialogContent>

        <DialogActions>
          <Button
            sx={{ color: "limegreen" }}
            onClick={closeAddDialog}
          >
            Cancel
          </Button>
          {details.type==="Add"?(<Button
          disabled={checks}
            sx={{ color: "limegreen" }}
             onClick={createAgree}
          >
            Add
          </Button>):
          (
            <Button
            disabled={checks}
            sx={{color:"limegreen"}}
            onClick={confirmEdit}
            >
              Confirm
            </Button>
          )
          }
        </DialogActions> 
      </Dialog>
      {/* //delete Alert */}
      <Dialog
        open={deleteDialog.open}
        onClose={()=>setDeleteDialog({open:false,id:""})}
      >
        <DialogTitle >
          {"Alert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to Delete Product
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setDeleteDialog({open:false,id:""})}>Disagree</Button>
          <Button onClick={deleteHandler}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Product;
