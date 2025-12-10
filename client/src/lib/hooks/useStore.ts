import { useContext } from "react";
import { StoreContext } from "../stores/store";

export function useStore() {
  return useContext(StoreContext); 
}



/*
Summary:
This file defines a custom React hook (useStore) that gives components easy access to our 
global MobX store via React Context.

Instead of repeatedly writing useContext(StoreContext) in every component, we can simply call 
useStore(), which keeps our code cleaner, more consistent, and reduces 
boilerplate across the app.

*/ 