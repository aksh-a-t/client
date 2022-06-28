import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField ,Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from '@mui/material'
import React from 'react'
import { useAlert } from 'react-alert';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
const Login = () => {
  const [val,setVal] = React.useState({
    email:'', 
    password:''
  });
  const [icon,setIcon] = React.useState(false);
  const alert = useAlert();
  const navigate = useNavigate();

  const handleChange=(event)=>{
    let {name,value} = event.target;
    setVal((pre)=>{
      return{
        ...pre,
        [name]:value
      }
    });
  }
  const loginHandler=()=>{
    const email = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    const pass= /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    if(!email.test(val.email)){
      alert.error('Enter Valid Email');
      return ;
    }
    if(!pass.test(val.password)){
      alert.error('Enter Valid Password');
      return ;
    }
    axios.post('http://localhost:5000/api/user/login',{email:val.email,password:val.password})
    .then((res)=>{
      console.log(res);
      localStorage.setItem("token",res.data.token);
      navigate(`/${res.data.role}/`);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return (
    <>
    <div className="logincontainer">
      <div>
        <img
        alt="img"
          width="100%"
          style={{height:'100vh'}}
          src="https://images.squarespace-cdn.com/content/v1/58989c1b5016e1eeef68cfbe/1558375119918-TL3ATOXWAD21219PKL50/scallops-peapuree.jpg"
        />
      </div>
      <div className="loginform">
      <h1>
        Login
      </h1>
        <TextField
          fullWidth
          size="small"
          onChange={handleChange}
          value={val.email}
          name="email"
          required
          id="outlined-required"
          label="Email"
        />
        <FormControl size="small" fullWidth={true} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            type={icon ? "text" : "password"}
            name="password"
            value={val.password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setIcon(!icon)}
                  edge="end"
                >
                  {icon ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>{" "}
        <Button onClick={loginHandler} style={{maxWidth:'200px',background:'green'}} variant="contained">Sign Up</Button>
        <div>
          Don't have account,<Link to="/register"><span style={{color:'green'}}>SignUp</span></Link>
        </div>
      </div>

    </div>

    </>
  )
}

export default Login