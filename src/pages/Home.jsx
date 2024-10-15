import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/chatSlice';
import Grid from '@mui/material/Grid';

const Home = () => {
    const [username, setUsername] = useState("");
    const dispatch = useDispatch();
    const isUsernameValid = username.trim().length > 0;

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleBtnClick = () => {
        if (isUsernameValid) {
            dispatch(setUser(username));
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
            <Box sx={{ mb: 2 }}>
                <h1 style={{ textAlign: 'center', fontSize: '36px', margin: 0 }}>
                    Welcome to Chatify
                </h1>
            </Box>
            <Box sx={{ mb: 3 }}>
                <h2 style={{ fontSize: '40px', textAlign: 'center', margin: 0 }}>
                    Wanna chat with someone?
                </h2>
            </Box>
            <Grid 
                container 
                spacing={2} 
                justifyContent="center" 
                alignItems="center"
                sx={{ width: '100%', maxWidth: '600px' }}
            >
                <Grid item xs={12}>
                    <TextField
                        label="Enter an Username"
                        placeholder="Username"
                        onChange={handleUsernameChange}
                        value={username}
                        fullWidth
                        sx={{
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
                </Grid>
                <Grid item xs={12}>
                    <Link to='/chat'>
                        <Button 
                            variant="outlined" 
                            size='large' 
                            onClick={handleBtnClick} 
                            disabled={!isUsernameValid}
                            fullWidth
                        >
                            Let's go
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
