import { useState } from 'react';
import { CssBaseline, Container, Typography } from '@mui/material';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Box } from '@mui/material';
import { useActivities } from '../../lib/hooks/useActivities';  

function App() {

  
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);  
  const {activities, isPending} = useActivities(); 
  

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(x => x.id === id)); 
  }

  
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined); 
  }

 const handleOpenForm = (id? : string) => {
  if (id) handleSelectActivity(id); 
  else handleCancelSelectActivity();
  setEditMode(true); 
 }

 const handleFormClose = () => {
  setEditMode(false); 
 }


  return ( 
    <Box sx={{bgcolor: '#eeeeee', minHeight: '100vh'}}>
    <CssBaseline />
    <NavBar openForm={handleOpenForm} />
    <Container maxWidth='xl' sx={{mt: 3}}>
      {!activities || isPending ? (
        <Typography>Loading...</Typography>
      ) : (
        <ActivityDashboard 
        activities={activities}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        selectedActivity={selectedActivity}
        editMode={editMode}
        openForm={handleOpenForm}
        closeForm={handleFormClose}
      />
      )}
      
    </Container>
    
    </Box>
  )
}

export default App

// This is the highest body of layout in our app. This is what is rendered in our main.tsx which renders our app. 
// our main.tsx is then rendered in the index.html 


// Note - <CssBaseLine/> removes/resets the default css that automatically comes from the browser. Essentially cleans it to a blank slate.