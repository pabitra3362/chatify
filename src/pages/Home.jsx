import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/chatSlice';

const Home = () => {
    const [filled, setFilled] = useState(true)
    const [username, setUsername] = useState("")
    const dispatch=useDispatch()

    const handleUsername=(e) => {
      const value=e.target.value;
      setUsername(value)
      if(value.length>0){
        setFilled(false)
      }else{
        setFilled(true)
      }
    }

    const handleBtn=() => {
      dispatch(setUser(username))
    }
    
    
  return (
    <Box sx={{
      backgroundColor:'black',
      color:'white',
      minHeight:'100vh',
    }}>
        <Box sx={{height:'50px'}}></Box>
        <Box component="section" sx={{ p: 5, border: '1px dashed grey',bgcolor:'blue',color:'white',borderRadius:'15px',width:'40%',mx:'auto',mb:'20px',opacity:'0.8' }}>
      
      <h1 style={{textAlign:'center',fontSize:'36px',marginTop:'5px'}}>Welcome to Chatify</h1>
     
    </Box>
    <Box sx={{marginTop:'15vh',marginBottom:'5vh'}}>
            <h2 style={{fontSize:'40px',textAlign:'center'}}>Wanna chat with someone?</h2>
        
    </Box>
    <Box sx={{
       display:'flex',
       justifyContent:'center',
       alignItems:'center',
       gap:'10px'
    }} >
    <Box>
    <TextField
          id="outlined-textarea"
          placeholder="Enter an Username"
          onChange={handleUsername}
          value={username}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: '2px solid white', // Custom border
              },
              '&:hover fieldset': {
                border: '2px solid lightgrey', // Border on hover
              },
              '&.Mui-focused fieldset': {
                border: '2px solid blue', // Border when focused
              },
            },
            '& input': {
              color: 'white', // Text color
            },
            '& .MuiInputBase-input': {
              color: 'white', // Ensures the input text is white
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'lightgrey', // Placeholder color
            },
          }}
        />
    </Box>
        <Box>
        <Link to='/chat'><Button variant="outlined" size='large' onClick={handleBtn} disabled={filled}>Let's go</Button></Link>
        </Box>
        
    </Box>
    </Box>
  )
}

export default Home
