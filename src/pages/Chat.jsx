import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, receiveMessage, setUser } from '../features/chatSlice';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useRef } from 'react';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Chat() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const messages = useSelector(state => state.chat.messages)
    const username = useSelector(state => state.chat.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const endOfMessagesRef = useRef(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleSend = () => {
        if(message.trim()!=""){
            dispatch(sendMessage(message))
            setMessage('')
        }
    }

    const handleListItem = () => {
        navigate('/')
        dispatch(setUser(''))
    }


    React.useEffect(() => {
        if (!username) {
            navigate('/')
        }
        const interval = setInterval(() => {
            const newMessage = {
                id: Date.now(),
                text: `Message from User2`,
                user: 'User2',
            };
            dispatch(receiveMessage(newMessage));
        }, 5000); // Receive a new message every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [dispatch]);

    React.useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }

    }, [messages])


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                mr: 2,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {username}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleListItem}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { navigate('/chat') }}>
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chat" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />

            </Drawer>
            <Main open={open}
            >
                <DrawerHeader />
                <Box sx={{
                    height: '70vh',
                    overflowY: 'scroll',
                    width: '80%',
                    mx: 'auto',
                    p: '10px',
                    '&::-webkit-scrollbar': {
                        display: 'none', // Hide scrollbar in WebKit browsers
                    },
                    scrollbarWidth: 'none', // Hide scrollbar in Firefox
                }}>
                    {messages.map((msg) => (
                        <Typography key={msg.id} sx={{ marginBottom: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>
                                <strong>{msg.user}: </strong>
                                {msg.text}
                            </span>
                            <Typography sx={{ fontSize: '0.75rem', color: 'gray' }}>
                                {new Date(msg.id).toLocaleString()}
                            </Typography>
                        </Typography>
                    ))}

                    <div ref={endOfMessagesRef} />
                </Box>
                <Box
                    component="form"
                    sx={{
                        position: 'fixed',
                        bottom: '10px', // Fixed 10px from the bottom
                        left: '50%', // Center horizontally
                        transform: 'translateX(-50%)', // Adjust for centering
                        display: 'flex',
                        alignItems: 'center', // Align items in the center vertically
                        backgroundColor: 'black', // Optional: Background color for visibility
                        padding: '10px', // Optional: Padding
                        boxShadow: 3, // Optional: Shadow for depth
                        zIndex: 1000, // Ensure it's above other content  
                        width: '80%'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-multiline-flexible"
                        label={username}
                        multiline
                        maxRows={10}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{ m: 1, width: '90%' }} // Adjust width as needed
                    />
                    <Button onClick={handleSend} variant="contained" size='large' endIcon={<SendIcon />} sx={{ m: 1 }}>
                        Send
                    </Button>
                </Box>
            </Main>
        </Box>
    );
}