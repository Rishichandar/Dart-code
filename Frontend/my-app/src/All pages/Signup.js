
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from "react-toastify";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
// import XIcon from '@mui/icons-material/X';
// import GoogleIcon from '@mui/icons-material/Google';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
// import Select from '@mui/material/Select';
// export default function Signuppage() {
//   const [showPassword1, setShowPassword1] = useState(false);
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post('http://127.0.0.1:5000/user/signup', {
//         email: data.email,
//         password: data.password,
//         username: data.username,
//         role: role

//       });
//       const token = response.data.token;
//       localStorage.setItem('token', token);
//       toast.success("Registered successfully");
//       navigate('/main');
//     } catch (error) {
//       toast.error("user exist");
//       console.error('Signup failed:', error);
//     }
//   };
//   //for login page
//   const LoginPage = () => {
//     navigate('/');
//   };
//   const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
//   const handleMouseDownPassword1 = (event) => event.preventDefault();

//   const [role, setRole] = React.useState('');

//   const handleChange = (event) => {
//     setRole(event.target.value);
//   };
//   console.log("role: ", role)
//   return (
//     <>
//       {/* <h1>Signup page</h1> */}
//       <div className="signup-page">
//         <div className="left-section1">
//           <div id="signup-container">
//             <form onSubmit={handleSubmit(onSubmit)}>

//               <TextField
//                 id="standard-basic"
//                 label="Email"
//                 variant="standard"
//                 sx={{
//                   width: "300px",
//                   position: "relative",
//                   top: '-20px'
//                 }}
//                 {...register('email', { required: 'Email is required' })}
//                 error={!!errors.email}
//                 helperText={errors.email ? errors.email.message : ''}
//               />
//               <br /><br />
//               <TextField
//                 id="outlined-basic"
//                 label="Username"
//                 variant="outlined"
//                 type="Username"
//                 sx={{
//                   width: "300px", marginTop: "0px",
//                   position: 'relative',
//                   top: '-15px',


//                 }}
//                 {...register('username', { required: 'username is required' })}
//                 error={!!errors.username}
//                 helperText={errors.username ? errors.username.message : ''}
//               />
//               <br></br>

//               <FormControl sx={{ m: 0, width: '35ch', position: 'relative', top: '10px', }} variant="outlined">
//                 <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//                 <OutlinedInput
//                   id="outlined-adornment-password"
//                   type={showPassword1 ? 'text' : 'password'}
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={handleClickShowPassword1}
//                         onMouseDown={handleMouseDownPassword1}
//                         edge="end"
//                       >
//                         {showPassword1 ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                   label="Password"
//                   {...register('password', { required: 'Password is required' })}
//                   error={!!errors.password}
//                   helperText={errors.password ? errors.password.message : ''}
//                 />
//               </FormControl>
//               <br></br>
//               <FormControl sx={{ m: 0, minWidth: 300, position: 'relative', top: '30px' }}>
//                 <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
//                 <Select
//                   labelId="demo-simple-select-helper-label"
//                   id="demo-simple-select-helper"
//                   value={role}
//                   label="Role"
//                   onChange={handleChange}

                  
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   <MenuItem value={"admin"}>admin</MenuItem>
//                   <MenuItem value={"user"}>user</MenuItem>
                     
//                 </Select>
                
//               </FormControl>
//               <br /><br />
//               <FormControlLabel style={{ position: 'relative', top: '20px', left: '5px' }} control={<Checkbox />} label="I have read and agree to the terms" />
//               <br></br>
//               <Button
//                 variant="contained"

//                 type="submit"
//                 sx={{
//                   backgroundColor: '#4D869C',
//                   padding: '10px 20px',
//                   fontSize: '12px',
//                   marginLeft: "100px",
//                   marginTop: "20px",
//                   width: '100px',
//                   position: "relative",
//                   top: '10px'

//                 }}
//               >
//                 Signup
//               </Button>
//               {/* <ul id='logos'>
//            <li><FacebookRoundedIcon fontSize='8px'/></li>
//            <li><XIcon fontSize='8px'/></li>
//            <li><GoogleIcon fontSize='8px'/></li>
//            <li><GitHubIcon fontSize='8px'/></li>
//           </ul> */}

//             </form>

//           </div>

//         </div>
//         <div className="right-section1">
//           <span id='Darttag'>Transforming chaos into clarity for AI models</span>
//           <Button variant="outlined" style={{ marginTop: '25px', borderColor: 'white', color: 'white' }} onClick={LoginPage}>Login</Button>

//         </div>
//       </div>

//     </>
//   );
// }

import React, { useState } from 'react';
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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

export default function Signuppage() {
  const [showPassword1, setShowPassword1] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/user/signup', {
        email: data.email,
        password: data.password,
        username: data.username,
        role: data.role
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      toast.success("Registered successfully");
      navigate('/main');
    } catch (error) {
      toast.error("User exists");
      console.error('Signup failed:', error);
    }
  };

  const LoginPage = () => {
    navigate('/');
  };

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleMouseDownPassword1 = (event) => event.preventDefault();

  const [role, setRole] = useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
    setValue('role', event.target.value); // Set the value for react-hook-form
  };

  return (
    <>
      <div className="signup-page">
        <div className="left-section1">
          <div id="signup-container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                sx={{
                  width: "300px",
                  position: "relative",
                  top: '-20px'
                }}
                {...register('email', { required: 'Email is required' })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
              <br /><br />
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                type="Username"
                sx={{
                  width: "300px", marginTop: "0px",
                  position: 'relative',
                  top: '-15px',
                }}
                {...register('username', { required: 'Username is required' })}
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ''}
              />
              <br></br>
              <FormControl sx={{ m: 0, width: '35ch', position: 'relative', top: '10px' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword1 ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required' })}
                  error={!!errors.password}
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
                />
              </FormControl>
              
              <br></br>
              <FormControl sx={{ m: 0, minWidth: 300, position: 'relative', top: '30px' }}>
                <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={role}
                  label="Role"
                  onChange={handleChange}
                  {...register('role', { required: 'Role is required' })}
                  error={!!errors.role}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"user"}>User</MenuItem>
                </Select>
                {errors.role && <FormHelperText error>{errors.role.message}</FormHelperText>}
              </FormControl>
              <br /><br />
              <FormControlLabel style={{ position: 'relative', top: '20px', left: '5px' }} control={<Checkbox />} label="I have read and agree to the terms" />
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
                  width: '100px',
                  position: "relative",
                  top: '10px'
                }}
              >
                Signup
              </Button>
            </form>
          </div>
        </div>
        <div className="right-section1">
          <span id='Darttag'>Transforming chaos into clarity for AI models</span>
          <Button variant="outlined" style={{ marginTop: '25px', borderColor: 'white', color: 'white' }} onClick={LoginPage}>Login</Button>
        </div>
      </div>
    </>
  );
}

