import { useState, useEffect } from 'react';
import { CssBaseline, Container } from '@mui/material';
import axios from 'axios'; 
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Box } from '@mui/material'; 

function App() {

  const [activities, setActivities] = useState<Activity[]>([]); 
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);  

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/activities")
      .then(response => setActivities(response.data))

      return () => {}
  }, [])
  

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id)); 
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


 const handleSubmitForm = (activity: Activity) => {
  if (activity.id) {
    setActivities(activities.map(x => x.id === activity.id ? activity : x))
  } else {
    const newActivity = {...activity, id: activities.length.toString()}
    setSelectedActivity(newActivity)
    setActivities([...activities, newActivity])
  }
  setEditMode(false); 
 }


 const handleDelete = (id: string) => {
  setActivities(activities.filter(x => x.id !== id))
 }

  return ( 
    <Box sx={{bgcolor: '#eeeeee'}}>
    <CssBaseline />
    <NavBar openForm={handleOpenForm} />
    <Container maxWidth='xl' sx={{mt: 3}}>
      <ActivityDashboard 
        activities={activities}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        selectedActivity={selectedActivity}
        editMode={editMode}
        openForm={handleOpenForm}
        closeForm={handleFormClose}
        submitForm={handleSubmitForm}
        deleteActivity={handleDelete}
      />
    </Container>
    
    </Box>
  )
}

export default App

// This is the highest body of layout in our app. This is what is rendered in our main.tsx which renders our app. 
// our main.tsx is then rendered in the index.html 


// Note - <CssBaseLine/> removes/resets the default css that automatically comes from the browser. Essentially cleans it to a blank slate.