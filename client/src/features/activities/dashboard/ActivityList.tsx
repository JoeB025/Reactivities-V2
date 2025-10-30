import { Box } from '@mui/material'; 
import ActivityCard from './ActivityCard';

type Props = {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void; 
}

export default function ActivityList({activities, selectActivity, deleteActivity} : Props) {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
      {activities.map(activity => (
        <ActivityCard 
          key={activity.id} 
          activity={activity} 
          selectActivity={selectActivity} 
          deleteActivity={deleteActivity} 
        />
      ))}
    </Box>
  )
}


// This file is a child of Activity Dashboard. Here we iterate through the activities so each activity has its own box. 
// We also pass down each activities data (title, description etc...) to the ActivityCard which we render here. 