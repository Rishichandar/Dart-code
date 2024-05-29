
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { toast } from "react-toastify";
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function ForgetPassword() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleMouseDownPassword1 = (event) => event.preventDefault();
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword2 = (event) => event.preventDefault();

  const validateFields = () => {
    const errors = {
      email: '',
      newPassword: '',
      confirmPassword: '',
    };
    let isValid = true;

    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    }
    if (!newPassword) {
      errors.newPassword = 'New Password is required';
      isValid = false;
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
      isValid = false;
    }
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateFields()) {
      setError('');
      try {
        const response = await fetch('http://127.0.0.1:5000/user/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            newPassword,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Password reset successful');
          toast.success("Password reset successful");
          navigate('/');
          // You can redirect the user or show a success message
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    } else {
      setError('');
    }
  };

  return (
    <>
      <h1>Forget password</h1>
      <form onSubmit={handleSubmit}>
        <div id='forgetpass-container'>
          <TextField
            id="email"
            label="Email"
            variant="standard"
            sx={{ width: "300px", marginBottom: "50px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
          />
          <br />
          <FormControl id="new-password" sx={{ m: 1, width: '35ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword1 ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              label="New Password"
              error={!!fieldErrors.newPassword}
            />
            {fieldErrors.newPassword && <p style={{ color: 'red' }}>{fieldErrors.newPassword}</p>}
          </FormControl>
          <br />
          <FormControl id="confirm-password" sx={{ m: 1, width: '35ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword2 ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword2}
                    edge="end"
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
              error={!!fieldErrors.confirmPassword}
            />
            {fieldErrors.confirmPassword && <p style={{ color: 'red' }}>{fieldErrors.confirmPassword}</p>}
          </FormControl>
          <br />
          {error && <p style={{ color: 'red', marginLeft: '65px' }}>{error}</p>}
          <br />
          <Button variant="contained" type="submit" id='forget-btn'>Submit</Button>
        </div>
      </form>
    </>
  );
}

