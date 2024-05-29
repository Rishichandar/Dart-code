
import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
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

  return (
    <>
      <h1>Signup page</h1>
      <div id="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            sx={{
              width:"300px"
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
              width:"300px"
            }}
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
          <br /><br />
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{
              backgroundColor: 'green',
              padding: '10px 20px',
              fontSize: '12px',
              marginLeft: "100px",
              marginTop: "20px",
              width:'100px'

            }}
          >
            Signup
          </Button>
        </form>
      </div>
    </>
  );
}
