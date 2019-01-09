---
layout: post
draft: true
title: Using reactive streams to manage state
date: 2018-10-1
---

Whenever a component grows too large (personlly I prefer them to never grow beyond 100 lines, but YMMV) I think it's a good idea to separate the component's state management away from the component itself. A side-effect of this often involves separate the components state-altering behvaiour away from the component as well.

What I found works well for my is maintaining my state in a reactive stream, which I feel supports the idea of unilateral data flow. I start off by defining my initial state:

```ts
export const initState: State = {
  // ...
}

export default createStore<State>(initState);
```

I've become accostumed to the the name of `store` for containing state, but in essence this is a [RxJS subject]() - a reactive stream data structure that emits events to its observers. This is in adherence to the observer pattern, which states that *subjects* contain a list of *observers*, notifying them of any changes.

This is what the `createStore` function looks like:

```ts
import { BehaviourSubject } from 'rxjs';

export default function createStore<State>(initState: State) {
  const subject = new BehaviourSubject(initState);

  return {
    state() {
      return subject.getValue()
    },

    onValue(next: State => void, error: Error => void, complete: () => void) {
      return subject.subscribe({
        next,
        error,
        complete
      });
    },

    update(data: Partial<State>) {
      const newState = R.mergeDeepRight(subject.getValue(), data);
      subject.next(newState);
    }
  }
}
```

A `BehaviourSubject` is a custom type of RxJS subjects, with the additional attribute of having a **current value** which is emitted to any new subscribers, making them suitable for state management.

```ts
// From https://github.com/ReactiveX/rxjs/blob/master/src/internal/BehaviorSubject.ts
get value(): T {
  return this.getValue();
}
```

This means that whenever (for instance) a new component subscribes to an observable store,
it will receive said store's latest updated values. Let's see how this works in practice.

```tsx
class Gym extends Component<Props, State> {
  state = {
    trainers: [],
    champions: []
  }

  componentDidMount() {
    const { name } = this.props; 
    /*
    * Whenever the store emits new a new state, update the component state.
    */
    store.onValue(newState => this.setState(newState));

    // Do some initialising logic.
    api.init(name);
  }

  render() {
    const { trainers, champions } = {...this.props, ...this.state };

    return (<div className="gym-component">
      <h3>Trainers</h3>
      <ul>
        {trainers.map((trainer, i) => <Trainer key={i} {...trainer} />)}
      </ul>
      <h3>Champions</h3>
      <ul>
        {champions.map((trainer, i) => <Trainer key={i} {...trainer} />)}
      </ul>
    </div>)
  }
}
```

This seems simple enough, and I'd usually not reach for RxJS for such a simple component,
instead favouring using the component state for the root object as the main container for the
entire application state. **However**, in real life the application domain gets real complicated 
real fast, and 
*in my experience components that grow past 100 lines of code become hard to keep a mental model of and reason about.*{:.hl.green}

Additionally I think it's a good idea to separate behaviour, presentation, and state when the situation
calls far it. Using an external state container, such as reactive streams, with a declarative API for
state manipulation makes components easier to reason about in my experience.

On line `12` we perform the actual connection of the external state container to the component. Think
of it as a very simple version of Redux's `connect` function. This LOC states that whenever the store
receives a new state object, this should in turn update the component state[^1].

---

[^1]: And since we're using TypeScript the `newState` object is guaranteed to adhere to the defined interface for the component.