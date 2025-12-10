import { createContext } from "react";
import CounterStore from "./counterStore"
import { UiStore } from "./uiStore";


// Define a TypeScript interface for our global store.
// This ensures that our store object always has a counterStore property
// of type CounterStore.
interface Store {
  counterStore: CounterStore
  uiStore: UiStore; 
}

// Create the actual store object.
// Here we instantiate a new CounterStore and assign it to counterStore.
// This is where our MobX store "lives" globally.
export const store: Store = {
  counterStore: new CounterStore(),  
  uiStore: new UiStore() 
}

// Create a React Context that holds our store.
// By exporting StoreContext, we can wrap our app in a Provider
// and then access the store anywhere using useContext(StoreContext).
export const StoreContext = createContext(store); 


/* 

This file specifies our different MobX stores inside one global store object.

We use createContext from React to make that global store available throughout the component 
tree without prop drilling.

It’s essentially the “bridge” that lets React components access your MobX stores 
without having to manually pass them down through props.

In the file, useStore.ts (in hooks), we have created a hook so we can

*/