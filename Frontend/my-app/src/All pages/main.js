
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Main() {
  const location = useLocation();
  const email = location.state?.email;
  const [username, setUsername] = useState('');

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
      <span id='' style={{marginLeft:"250px"}}>{`Welcome, ${username}`}</span>
      <Button  size="small" variant="contained" id='upload-page'>upload</Button>
    </div>
  );
}
