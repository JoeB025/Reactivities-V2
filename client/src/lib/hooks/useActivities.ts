import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities = (id?: string) => {

  const queryClient = useQueryClient(); 

   const {data: activities, isPending} = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await agent.get<Activity[]>('activities');
      return response.data; 
    }
  }); 


  const {data: activity, isLoading: isLoadingActivity} = useQuery({
    queryKey: ['activities', id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`)
      return response.data; 
    },
    enabled: !!id 
  })


  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put('/activities', activity)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['activities']
      })
    }
  })


  const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.post('/activities', activity); 
      return response.data; 
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['activities']
      })
    }
  })


  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['activities'],

      })
    }
  })
  


  return { activities, isPending, updateActivity, createActivity, deleteActivity, activity, isLoadingActivity }

}


/* 
  FILE OVERVIEW: useActivities.ts

  DESCRIPTION:
  This file defines a custom React hook called `useActivities` that fetches a list of activities from the backend API.

  TECHNOLOGIES USED:
  - Axios: A promise-based HTTP client used here to send a GET request to the API endpoint.
    - note that the word 'agent' is used instead of 'axios' as we built a custom hook to use axios (Please see agent.ts). But when you see 'agent', it is still axios at work.
  - React Query (@tanstack/react-query): A powerful data-fetching library that handles caching, background updates, and loading states.

  HOW IT WORKS:
  - `useQuery` is used to fetch data from 'https://localhost:5001/api/activities'.
  - The query is identified by the key `['activities']`, which helps React Query manage caching and refetching.
  - The `queryFn` is an asynchronous function that uses Axios to retrieve the data.
  - The hook returns two values:
    - `activities`: the fetched list of Activity objects.
    - `isPending`: a boolean indicating whether the data is still loading.
    - 'updateActivity: updates the selected activity

  WHY IT'S USEFUL:
  - Encapsulates the data-fetching logic in a reusable hook.
  - Keeps components clean by abstracting away API calls.
  - Automatically handles loading states and caching via React Query.
  - Can be imported and used in any component like:
      const { activities, isPending } = useActivities();

  This pattern improves maintainability, readability, and performance in React applications.
*/
