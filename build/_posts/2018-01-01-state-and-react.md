---
layout: post
title : State and React
draft: true
date: 2018-09-11
---

State handling in React has been quite the debate for a while now. Some people swear to
Redux, others love MobX, Unstated as it's fair share of fans, and some people have abandoned it
entirely - opting to use component state instead (turning back the clock) and 
dabbling with the [context API]().

Finding out where to go when one begins a new React project these days can be a 
daunting task, and it's my goal in this blog post series to shed light on the 
various available options to help you decide which tool could solve your 
particular problem.

First off is the leader of the pack: Redux.

## Redux

Disclaimer: If you're not well versed with React and the state-handling ecosystem, [this blog post]() is a better introduction to Redux than this one. This post is intended as a discussion of alternatives and trade-offs.

44 thousand stars and counting, Redux has become a mainstay in the React ecosystem. However, in spite of its massive popularity, there are still many
people that find this tool confusing and difficult to work with. 

Let's go through the concepts introduced by Redux one by one:

## The store
The Redux store is your one and only source of truth. Every piece of global
state for your application is *stored* (see what I did there?) within. Redux advocates having a *single object tree* which describes the state of your entire application[^1].

The Redux store is also *read-only*, meaning that you cannot directly manipulate
the data within the state, you can only read its value. 

## The actions
The *only way* to change the contents of the Redux store is by dispatching
Redux **actions**, which are POJOs describing *what happened*. That last bit's
important. The actions don't specify *how* the data is going to change, instead
it describes *what* type of event occured.

This:
```ts
{
  type: 'LEVEL_UP',
  pokemon: 'Pikachu'
}
```

Instead of this:
```typescript
{
  type: 'LEVEL_UP',
  action: 'set_level_pikachu_to_5'
}
```

All Redux actions are required to have a a `type`, specifying the nature of an event.

## The reducers
Your actions are not received by the store, instead they're received by
a *reducer*, which holds the required business logic to update the object
tree describing the state of your application.

The reducers describe how your state tree changes in response to actions, which
in turn updates the value in your store. 

Reducers are *pure* functions. What does this mean? A pure function is a function
whose return value is *only* determined by its input values, and has no side
effects. This means that `f(x)` where `x=9` will **always** return the same 
value. It also means that `f(x)` *cannot* write to a file system, send an email,
or do anything else **at all**.

A pure function returns a value, plain and simple.

Now, let's see how these three concepts work in concert.

## Redux in action

The first step in any Redux application is a call to the `createStore` function 
supplied by Redux. Inspecting its source, we see it takes *three* arguments:

  * `reducer`: A function that returns the next state tree given the current 
  one and the action to handle.
  * `preloadedState`: Pretty self-explanatory.
  * `enhancer`: A function for *enhancing* your Redux store. This will be 
  discussed in greater detail later.

The `createStore` function returns a Redux store which allows you to read 
the current global application state, dispatch actions that can alter said
state, and subscribe to changes to the state.

If we dig into the function body we see that it defines a set of internal
functions which are returned as the store object[^2]:

```javascript
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
}
```

Let's go through these functions one by one.

## Dispatch
The dispatch function dispatches an action, which it takes as its sole argument.
The function ensures that the action is a POJO containing a `type` key. If the store is currently dispatching, the dispatch function throws an error.

If the action is properly formed *and* the store isn't currently dispatching, 
then the `currentState` variable is updated through a call to the `currentReducer` (which is initially set as the `reducer` argument passed to
the `createStore` function).

It's possible to dispatch other data types than objects as well, but in order to do so the store needs to be enhanced with the appropriate middleware (like 
`redux-thunk` for promises for instance).

Once the state has been updated through the `currentReducer` function call,
an array of listeners[^3] is iterated over and each listener is invoked.

When all listeners have been called the function returns.

Now, where did those listeners come from? :confused:  

## Subscribe
The subscribe function takes one argument: a `listener` function which will be
invoked on every dispatch. The argument to each listener will be the result
of applying the corresponding reducer to the `currentState`.

Each listener is invoked **after** the reducer has completed updating the
current state, which means that `store.getState()` will return the newly
updated object tree. 

The listener function is free to call `dispatch` as well, though nested
dispatches are not guaranteed to have completely updated state trees.

If the store is currently dispatching an error is thrown, otherwise the
list containing the current listeners is *copied* and the new listener 
is appended to the copied list.[^4]

---
[^1]: https://redux.js.org/introduction/threeprinciples
[^2]: If, like me, you're wondering what `$$observable` is, then I suggest reading [this tc39 proposal](https://github.com/tc39/proposal-observable). TLDR: it's a way to make the Redux store observable by libraries such as RxJS, 
Bacon.js, etc.
[^3]: Called *observers* in the [Observer pattern]().
[^4]: There's been some confusion over the need to actually copy this list, 
  and instead employ either an EventEmitter or a read-only array - see discussions [here](https://github.com/reduxjs/redux/pull/2376) and [here](https://github.com/reduxjs/redux/pull/1729).


