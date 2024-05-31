import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Avatar,
    Modal,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
  } from "@mui/material";
  import { useLocation } from "react-router-dom";
export default function Navbar(){
  const navigate = useNavigate();
    //for opening avatar
    const handleOpen = () => setOpen(true);
    //for opening avatar
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const email = location.state?.email;
    //username
    const [username, setUsername] = useState('');
    //for logout
    const handleLogout = () => {
      
     
      navigate("/");
    };
  //for username
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
return(
    <>
    <nav  className="navbar">
     <span></span>
    <Box mr={10}>
            <Avatar onClick={handleOpen} style={{ cursor: "pointer",marginRight:"20px",backgroundColor: "#3C5B6F"  }}></Avatar>
          </Box>
    <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              width: 300,
              height: "50%",
              bgcolor: "background.paper",
              p: 2,
              boxShadow: 24,
              mt: 8,
              
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              mb={5}
            >
              <Avatar
                onClick={handleOpen}
                style={{ cursor: "pointer", width: "100px", height: "100px",backgroundColor: "#3C5B6F"  }}
              ></Avatar>
               <Typography variant="h6" component="h2" paddingTop={2}>
                {/* {data.RoleId}- */}
               {username}
              </Typography>
              
              <Box
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-around"}
              >
                  {/* <Typography color={data.RoleId === 2 ? "green" : "red"}>
                  {data.RoleId === 2 ? "User" : "Admin"}
                </Typography>*/}
                <Button onClick={handleLogout}>
                 
                  Sign Out
                </Button> 
              </Box>
            </Box>

            <Divider />
         
            {/* <List>
              {data.RoleId === 2 ? (
                <Box>
                  <p style={{ color: "red"}}>Under Development process..</p>
                </Box>
              ) : (
                <ListItem button onClick={register}>
                  <Person sx={{ mr: 2 }} />
                  <ListItemText primary="Register" />
                </ListItem>
              )} */}

           
          </Box>
        </Modal>
    </nav>
    </>
)

}