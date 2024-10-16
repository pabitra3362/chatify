import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/chatSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isUsernameValid = username.trim().length > 0;

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleBtnClick = () => {
        if (isUsernameValid) {
            dispatch(setUser(username));
            navigate('/chat');
        }
    };

    return (
        <Box 
            sx={{
                backgroundColor: 'black',
                color: 'white',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
            }}
        >
            <Box sx={{ mb: 2, textAlign: 'center' }}>
                <h1 style={{ fontSize: '36px', margin: 0 }}>
                    Welcome to Chatify
                </h1>
            </Box>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
                <h2 style={{ fontSize: '40px', margin: 0 }}>
                    Wanna chat with someone?
                </h2>
            </Box>
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    width: '100%', 
                    maxWidth: '600px',
                }}
            >
                <TextField
                    label="Enter an Username"
                    placeholder="Username"
                    onChange={handleUsernameChange}
                    value={username}
                    fullWidth
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: '2px solid white',
                            },
                            '&:hover fieldset': {
                                border: '2px solid lightgrey',
                            },
                            '&.Mui-focused fieldset': {
                                border: '2px solid blue',
                            },
                        },
                        '& input': {
                            color: 'white',
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: 'lightgrey',
                        },
                    }}
                />
                <Button 
                    variant="outlined" 
                    size='large' 
                    onClick={handleBtnClick} 
                    disabled={!isUsernameValid}
                    fullWidth
                >
                    Let's go
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
