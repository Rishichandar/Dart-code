
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';
export default function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  // const email = location.state?.email;
  const [email, setEmail] = useState(location.state?.email || localStorage.getItem('email'));
  console.log(email)
  const [username, setUsername] = useState('');
  //upload page
  const toUploadpage=()=>{
    navigate('/upload');
  };

  useEffect(() => {
    if (email) {
      fetch('http://127.0.0.1:5000/user/username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
      .then(response => response.json())
      .then(data => {
        if (data.username) {
          setUsername(data.username);
        } else {
          console.error(data.error);
        }
      })
      .catch(error => {
        console.error('Error fetching username:', error);


      });
    }
  }, [email]);

  return (
    <div>
      <span id='welcome-user' style={{marginLeft:"250px"}}>{`Welcome ${username}`}</span>
     
      <Fab variant="extended" id='upload-page' onClick={toUploadpage}>
        <NavigationIcon sx={{ mr: 1 }} />
        
        Upload
      </Fab>
    </div>
  );
}
