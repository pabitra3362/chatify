import { useState } from 'react'
import Home from './pages/Home'
import Chat from './pages/Chat'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {

  const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });

  return (
    <>
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </Router>
    </ThemeProvider>
    
    </>
  )
}

export default App
