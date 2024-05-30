
import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';


export default function Loginpage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/user/login', {
        email: data.email,
        password: data.password
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      toast.success("Login successfully");
      navigate('/main');
    } catch (error) {
      toast.error("Incorrect details");
      console.error('Signup failed:', error);
    }
  };

  const nextPage = () => {
    navigate('/signup');
  };

  const forgetPassPage = () => {
    navigate('/forgetpass');
  };

  return (
    <div className="login-page">
     
      <div className="right-section">
        <span id='reg-text'>If you are a new user please <span style={{ color: 'green' }}>REGISTER</span></span>
        <br />
        <Button variant="outlined" style={{ marginTop: '25px' }} onClick={nextPage}>Signup</Button>
      </div>
      <div className="left-section">
      <div id="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <LockOpenOutlinedIcon style={{ position: 'absolute', top: '50px', left: '200px' }} />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            sx={{ width: "300px",
            position:'relative',
            top:'25px',

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
            sx={{ width: "300px", marginTop: "15px",
            position:'relative',
            top:'25px',


             }}
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
          <br /><br />
          <Button
            variant="contained"
          
            type="submit"
            sx={{
              backgroundColor: '#4D869C',
              padding: '10px 20px',
              fontSize: '12px',
              marginLeft: "100px",
              marginTop: "20px",
              width: '100px',
              position:'relative',
              top:'20px'
            }}
          >
            Login
          </Button>
          <br />
          <span id='forget-pass' onClick={forgetPassPage}>Forgotten your password?</span>
          <br></br>
          {/* <span id='policy'>Terms of use. Privacy policy</span> */}
        </form>
      </div>
      </div>
    </div>
  );
}
