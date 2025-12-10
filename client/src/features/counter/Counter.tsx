import { Box, Button, ButtonGroup, List, ListItemText, Paper, Typography } from "@mui/material";
import { useStore } from "../../lib/hooks/useStore";
import { observer } from 'mobx-react-lite'; 


const Counter = observer(function Counter() {

  const { counterStore } = useStore(); 

  return (
    <Box display='flex' justifyContent='space-between' sx={{border: 'red', borderWidth: '3px'}}>
      <Box sx={{width: '60%'}}>
        <Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
        <Typography variant="h6" gutterBottom>The count is: {counterStore.count}</Typography>
        <ButtonGroup sx={{mt: 3}}>
          <Button onClick={() => counterStore.decrement()} variant='contained' color='error'>DECREMENT</Button>
          <Button onClick={() => counterStore.decrement(5)} variant='contained' color='secondary'>DECREMENT BY 5</Button>
          <Button onClick={() => counterStore.increment()} variant='contained' color='success'>INREMENT</Button>
          <Button onClick={() => counterStore.increment(5)} variant='contained' color='primary'>INCREMENT BY 5</Button>
        </ButtonGroup>
      </Box>
      <Paper sx={{width: '40%', p: 4}}>
        <Typography variant="h5">Counter events ({counterStore.eventCount})</Typography>
        <List>
          {counterStore.events.map((event, index) => (
            <ListItemText key={index}>{event}</ListItemText>
          ))}
        </List>
      </Paper>
    </Box>   
  )
});


export default Counter; 

/* 

Summary:

We wrap the Counter component in the `observer` function from mobx-react-lite.
This makes the component automatically re-render whenever observable state
inside our MobX stores changes (in this case, counterStore).

We could also use <Observer> tags around specific JSX sections (in the return statement), 
but wrapping the whole component with `observer` is cleaner and ensures that all state
used inside the component is tracked and reactive.

In short: `observer` gives this component the ability to "observe" MobX state
and update the UI whenever that state changes.
*/
