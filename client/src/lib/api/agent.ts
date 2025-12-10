import axios from "axios"
import { store } from "../stores/store";

const sleep = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  });
  // this function is just so we can set a timer to see our 'loading...' is actually working. please see agent.interceptor below. 
}


const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL 
}); 

agent.interceptors.request.use(config => {
  store.uiStore.isBusy();
  return config; 
})


agent.interceptors.response.use(async response => {
  try{
    await sleep(1000);
    return response; 
  } catch(error) {
    console.log(error)
    return Promise.reject(error); 
  } finally {
    store.uiStore.isIdle(); 
  }
})

export default agent; 

/* 
  FILE OVERVIEW: agent.ts

  DESCRIPTION:
  This file sets up a centralized Axios instance called `agent` to handle all HTTP requests to the backend API.

  TECHNOLOGIES USED:
  - Axios: A promise-based HTTP client used to send requests to the server.
  - Axios Interceptors: Middleware-like functions that allow you to modify requests or responses globally.
  - sleep(): A utility function that introduces an artificial delay to simulate loading behavior.

  HOW IT WORKS:
  - `agent` is created using `axios.create()` with a base URL of something like: 'https://localhost:5001/api'.
    This means you can make requests like `agent.get('/activities')` without repeating the full URL.
  - A response interceptor is added to `agent`:
    - It waits 1 second (`sleep(1000)`) before returning the response.
    - This delay helps test and visualize loading states in the UI.
    - If an error occurs, it logs the error and rejects the promise.

  WHY IT'S USEFUL:
  - Centralizes API configuration, making it easier to manage headers, base URLs, and interceptors.
  - Reduces repetition across files — no need to import Axios or set the base URL every time.
  - Makes it easy to extend functionality later (e.g., adding auth tokens, error handling, logging).
  - Improves maintainability and consistency across the app.

  USAGE:
  - Import `agent` wherever you need to make API calls:
      import agent from './agent';
      agent.get('/activities');
*/
