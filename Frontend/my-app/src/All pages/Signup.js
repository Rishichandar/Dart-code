
import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import XIcon from '@mui/icons-material/X';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
export default function Signuppage() {
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/user/signup', {
        email: data.email,
        password: data.password
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      toast.success("Registered successfully");
      navigate('/');
    } catch (error) {
        toast.error("user exist");
      console.error('Signup failed:', error);
    }
  };
  //for login page
  const LoginPage = () => {
    navigate('/');
  };

  return (
    <>
      {/* <h1>Signup page</h1> */}
      <div className="signup-page">
      <div className="left-section1">
      <div id="signup-container">
        <form onSubmit={handleSubmit(onSubmit)}>
        
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            sx={{
              width:"300px",
              position:"relative",
              top:'-25px'
            }}
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
          <br /><br />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            sx={{
              width:"300px",
              position:"relative",
              top:'-10px'
            }}
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
          <br /><br />
          <FormControlLabel style={{position:'relative',top:'5px',left:'5px'}} control={<Checkbox/>} label="I have read and agree to the terms" />
          <br></br>
          <Button
            variant="contained"
            
            type="submit"
            sx={{
              backgroundColor: '#4D869C',
              padding: '10px 20px',
              fontSize: '12px',
              marginLeft: "100px",
              marginTop: "20px",
              width:'100px',
              position:"relative",
              top:'10px'

            }}
          >
            Signup
          </Button>
          <ul id='logos'>
           <li><FacebookRoundedIcon fontSize='10px'/></li>
           <li><XIcon fontSize='10px'/></li>
           <li><GoogleIcon fontSize='10px'/></li>
           <li><GitHubIcon fontSize='10px'/></li>
          </ul>
          
        </form>
       
        </div>
     
      </div>
      <div className="right-section1">
      <Button variant="outlined" style={{ marginTop: '25px' }} onClick={LoginPage}>Login</Button>

      </div>
      </div>
      
    </>
  );
}
