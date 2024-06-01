
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import DehazeIcon from '@mui/icons-material/Dehaze';
// import CloseIcon from '@mui/icons-material/Close';
// import HomeIcon from '@mui/icons-material/Home';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import InfoIcon from '@mui/icons-material/Info';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ContactPageIcon from '@mui/icons-material/ContactPage';
// import { Link } from 'react-router-dom';

// export default function Sidebar() {
//   const [open, setOpen] = React.useState(true);
//   const [mode, setMode] = React.useState('mini');

//   const toggleDrawer = () => {
//     setMode((prevMode) => (prevMode === 'mini' ? 'full' : 'mini'));
//   };

//   const handleDrawerOpenClose = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const DrawerList = (
//     <Box
//       sx={{
//         width: mode === 'full' ? 200 : 60,
//         transition: 'width 0.3s ease',
//       }}
//       role="presentation"
//     >
//       <Button onClick={toggleDrawer} sx={{ margin: '10px' }}>
//         {mode === 'mini' ? <DehazeIcon style={{ marginRight: '25px',fontSize:"large" }} /> : <CloseIcon style={{ marginRight: '25px',fontSize:"large" }} />}
//       </Button>
//       <List>
//         {['Home', 'Upload', 'About', 'Contact'].map((text) => (
//           <ListItem style={{ padding: '5px',fontSize:'10px' }} key={text} disablePadding>
//             <ListItemButton >
//               <ListItemIcon>
//                 {text === 'Home' && <HomeIcon fontSize="small" />}
//                 {text === 'Upload' && <CloudUploadIcon  fontSize="small" />}
//                 {text === 'About' && <InfoIcon  fontSize="small"  />}
//                 {text === 'Contact' && <ContactPageIcon  fontSize="small"  />}
               
//               </ListItemIcon>
//               {mode === 'full' && <ListItemText primary={text} />}
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );


//   return (
//     <>
//       <Drawer
//         variant="persistent"
//         anchor="left"
//         open={open}
//         sx={{
//           '& .MuiDrawer-paper': {
//             transition: 'width 0.3s ease, margin 0.3s ease',
//             width: open ? (mode === 'full' ? 200 : 60) : 0,
//             overflowX: 'hidden',
//           },
//         }}
//       >
//         {DrawerList}
//       </Drawer>
//     </>
//   );
// }
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);
  const [mode, setMode] = React.useState('mini');

  const toggleDrawer = () => {
    setMode((prevMode) => (prevMode === 'mini' ? 'full' : 'mini'));
  };

  const handleDrawerOpenClose = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const pages = ['Home', 'Upload', 'About', 'Contact'];
  const pageLinks = {
    Home: '/main',
    Upload: '/upload',
    About: '/about',
    Contact: '/contact',
  };

  const DrawerList = (
    <Box
      sx={{
        width: mode === 'full' ? 200 : 60,
        transition: 'width 0.3s ease',
      }}
      role="presentation"
    >
      <Button onClick={toggleDrawer} sx={{ margin: '10px' }}>
        {mode === 'mini' ? <DehazeIcon style={{ marginRight: '25px', fontSize: "large" }} /> : <CloseIcon style={{ marginRight: '25px', fontSize: "large" }} />}
      </Button>
      <List>
        {pages.map((text) => (
          <ListItem style={{ padding: '5px', fontSize: '10px' }} key={text} disablePadding>
            <ListItemButton component={Link} to={pageLinks[text]}>
              <ListItemIcon>
                {text === 'Home' && <HomeIcon fontSize="small" />}
                {text === 'Upload' && <CloudUploadIcon fontSize="small" />}
                {text === 'About' && <InfoIcon fontSize="small" />}
                {text === 'Contact' && <ContactPageIcon fontSize="small" />}
              </ListItemIcon>
              {mode === 'full' && <ListItemText primary={text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            transition: 'width 0.3s ease, margin 0.3s ease',
            width: open ? (mode === 'full' ? 200 : 60) : 0,
            overflowX: 'hidden',
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}

