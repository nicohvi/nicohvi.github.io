---
layout: post
draft: false
title: Using reactive streams to manage state
date: 2018-10-1
---

Whenever a component grows too large (personlly I prefer them to never grow beyond 100 lines, but YMMV) I think it's a good idea to separate the component's state management away from the component itself. A side-effect of this often involves separate the components state-altering behvaiour away from the component as well.

What I found works well for my is maintaining my state in a reactive stream, which I feel supports the idea of unilateral data flow. I start off by defining my initial state:

```ts
export const initState: State = {
  // ...
}
```

export default createStore<State>(initState);

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

    update(data: Pick<State>) {
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

