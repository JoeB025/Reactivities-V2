import { makeAutoObservable } from 'mobx';


export default class counterStore {
  title = 'Counter store';
  count = 42;
  events: string[] = [
    `Initial Count is ${this.count}`
  ]

  constructor() {
    makeAutoObservable(this)
  }

  increment = (amount = 1) => {
    this.count += amount; 
    this.events.push(`Incremented by ${amount} - count is now ${this.count}`)
  }

  decrement = (amount = 1) => {
    this.count -= amount;
    this.events.push(`Decremented by ${amount} - count is now ${this.count}`)
  }

  get eventCount() {
    return this.events.length; 
  }

}

/*

Could also do it the below way but this means importing the below and more code: 
------------------------------------------------------------------

import { makeObservable, observable, action } from 'mobx'; 

constructor() {
  makeObservable(this, {
      title: observable,
      count: observable,
      increment: action,
      decrement: action 
   })
}

------------------------------------------------------------------
Instead we can import makeAutoObservable and what happens is:

Mobx will use conventions to decide whether something should be made an observable.
Then, Instead of manually marking each property and method with `observable` or `action`,
we can use `makeAutoObservable`. MobX applies conventions automatically:

- Class properties (like `title` or `count`) → become **observables**.
  This means MobX will track their values and re-render any components
  that depend on them when they change.

- Class methods (like `increment` or `decrement`) → become **actions**.
  This means MobX knows these functions are intended to modify observable state,
  and it will handle updates efficiently and predictably.

In short: `makeAutoObservable` saves us from boilerplate by automatically
deciding what should be observable and what should be an action.

*/ 