import { CssBaseline, Container } from '@mui/material';
import NavBar from './NavBar';
import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';

function App() {  

  const location = useLocation(); 

  return ( 
    <Box sx={{bgcolor: '#eeeeee', minHeight: '100vh'}}>
      <CssBaseline />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container maxWidth='xl' sx={{mt: 3}}>
            <Outlet /> 
          </Container> 
        </>
      )}
    </Box>
  )
}

export default App

// This is the highest body of layout in our app. This is what is rendered in our main.tsx which renders our app. 
// our main.tsx is then rendered in the index.html 


// Note - <CssBaseLine/> removes/resets the default css that automatically comes from the browser. Essentially cleans it to a blank slate.