
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function Loginpage() {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [showPassword1, setShowPassword1] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  
  useEffect(() => {
    if (email) {
      localStorage.setItem('email', email);
    }
  }, [email]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/user/login', {
        email: data.email,
        password: data.password
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('email', data.email);
      toast.success("Login successfully");
      navigate('/main');
    } catch (error) {
      toast.error("Incorrect password");
      console.error('Signup failed:', error);
    }
  };

  const nextPage = () => {
    navigate('/signup');
  };

  const forgetPassPage = () => {
    navigate('/forgetpass');
  };

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleMouseDownPassword1 = (event) => event.preventDefault();

  return (
    <div className="login-page">
      <div className="right-section">
        <span id='welcome-msg'>Welcome to Dart</span>
      </div>
      <div className="left-section">
        <div id="login-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <LockOpenOutlinedIcon style={{ position: 'absolute', top: '50px', left: '200px' }} />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              sx={{ width: "300px", position: 'relative', top: '25px' }}
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br /><br />
            <FormControl sx={{ m: 0, width: '35ch', position: 'relative', top: '35px' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword1 ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword1}
                      onMouseDown={handleMouseDownPassword1}
                      edge="end"
                    >
                      {showPassword1 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
              />
            </FormControl>
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
                position: 'relative',
                top: '20px'
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
