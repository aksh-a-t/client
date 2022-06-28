import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
    import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import { useAlert } from "react-alert";
import JwtExpire from "../JwtExpire";
import { useNavigate } from "react-router-dom";
const Category = () => {
  const [dataList, setDataList] = useState([]);
  const [createDialog, setCreateDialog] = useState(false);
  const [categoryVal, setCategoryVal] = useState("");
  const [editDialog, setEditDialog] = useState(false);
  const [editVal, setEditVal] = useState({
    value: "",
    id: "",
  });
  const navigate = useNavigate();
  const alert = useAlert();

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/category/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setDataList(res.data.data);
      })
      .catch((error) => {
        if(error.response.data==="JWT"){
          JwtExpire(navigate,alert);
        }else{
          console.log(error);
        }
      });
  }, []); 
  // const createDialogClose=()=>{
  //   setCreateDialog(false);
  // }
  const handleEdit = (id, value) => {
    setEditVal((pre) => {
      return {
        value: value,
        id: id,
      };
    });
    setEditDialog(true);
    console.log(editVal);
  };
  const createAgree = () => {
    if (categoryVal) {
      let token = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:5000/api/category/create",
          { category: categoryVal },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          // @ts-ignore
          // dataList.unshift(res["data"]["data"]);
          // let val=res["data"]["data"];
          setDataList((pre)=>[res["data"]["data"],...pre])
          alert.success("Category Created");
          setCreateDialog(false);
          setCategoryVal("");
        })
        .catch((error) => {
          if(error.response.data==="JWT"){
            JwtExpire(navigate);
          }else{
            console.log(error);
          }
          setCreateDialog(false);
        });
    } else {
      setCreateDialog(false);
      alert.error("Enter Category");
    }
  };
  const agreeEdit = () => {
    let token = localStorage.getItem("token");
    axios
      .patch(
        "http://localhost:5000/api/category/update",
        { id: editVal.id, category: editVal.value },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        // @ts-ignore
        setDataList((pre) => {
          let ans = pre.map((val) => {
            if (val["id"] === editVal.id) {
              return { category: editVal.value, id: editVal.id };
            }
            return val;
          });
          console.log(ans);
          return ans;
        });

        setEditDialog(false);
        alert.success("Category updated");
      })
      .catch((error) => {
        if(error.response.data==="JWT"){
          JwtExpire(navigate);
        }else{
          console.log(error);
        }
      });
  };
  return (
    <>
      <Toolbar />
      <Card className="card">
        <CardActions sx={{ justifyContent: "space-between" }}>
          <div>Manage Categories</div>
          <Button className="button" onClick={() => setCreateDialog(true)}>
            Add Category
          </Button>
        </CardActions>
      </Card>
      <Card className="card">
        <CardActions>
          <TextField
            id="filter"
            fullWidth
            size="small"
            label="Filter"
            type="search"
          />
        </CardActions>
      </Card>
      <Paper className="card">
        <TableContainer sx={{ maxHeight: 350 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  // key={column.id}
                  align="center"
                  // style={{ minWidth: '170' }}
                >
                  Category
                </TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.map((val, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    <TableCell align="center">{val["category"]}</TableCell>
                    <TableCell align="center">
                      <Button
                        sx={{ color: "limegreen" }}
                        onClick={() => handleEdit(val["id"], val["category"])}
                      >
                        <EditIcon sx={{ color: "limegreen" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* </div> */}
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={createDialog}
        onClose={() => setCreateDialog(false)}
      >
        <DialogTitle sx={{ background: "limegreen" }}>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            color="success"
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
            value={categoryVal}
            onChange={(e) => setCategoryVal(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "limegreen" }}
            onClick={() => setCreateDialog(false)}
          >
            Cancel
          </Button>
          <Button sx={{ color: "limegreen" }} onClick={createAgree}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={editDialog}
        onClose={() => setEditDialog(false)}
      >
        <DialogTitle sx={{ background: "limegreen" }}>
          Edit Category
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            color="success"
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
            value={editVal.value}
            onChange={(e) =>
              setEditVal((pre) => {
                return {
                  ...pre,
                  value: e.target.value,
                };
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "limegreen" }}
            onClick={() => setEditDialog(false)}
          >
            Cancel
          </Button>
          <Button sx={{ color: "limegreen" }} onClick={agreeEdit}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Category;
