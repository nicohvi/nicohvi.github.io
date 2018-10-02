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
it will receive said store's latest updated values. Here's a demonstration:

```tsx
class Trip extends Component<Props, State> {
  state = {
    id: null,
    title: '',
    arrivalTime: null,
    date: null,
    departureTime: null,
    destination: null,
    loading: true,
    message: '',
    name: '',
    phoneNo: '',
    previouslySubmitted: false,
    price: 0,
    showInput: false
  }

  async componentDidMount() {
    const { id, name, phoneNo } = this.props;
    const { arrivalTime, day, destination } = await getTrip(id);
    const { previouslySubmitted } = await hasPreviouslySubmitted(id, name)
    const showInput = !phoneNo || !name; 

    this.setState({...{ loading: false }, 
      ...{ id, arrivalTime, day, destination, previouslySubmitted, showInput }});
  }

  render() {
    const { loading } = this.props;
    if(loading) return <Spinner />;
    return <div className="trip">
      {/* Trip information */}
    </div>
  }
}
```

For the purposes of this example the `Trip` component holds information for a
trip to any given destination. There's a date for your departure, a departure time, and an arrival time, etc.

To make things a bit more complicated (i.e. realistic) imagine that if the
user has already submitted an order for this trip then we need to set the
`previouslySubmitted` flag, as well as disable the button for the form.

Additonally, if the user **hasn't** submitted an order for this trip 
previously, but there's no record for her phone number (or name) in our database,
we need to set the `showInput` flag so that she can enter her name and number 
so our application can send her an SMS verification[^1].

As you might imagine, this component could get real complicated real fast.
The initial state handling alone takes about 60 LOC, which is already 
dangerously close to our limit of 100.

The rendering code alone is quite complicated:

```tsx
  // ...
  render() {
    const { loading, title } = this.props;
    if(loading) return <Spinner />;

    return <div className="trip">
      <h1>{title}</h1>
      <ul className="trip-info">
        <li>
          <span className="label">Date</span>
          <span className="value">{date}</span>
        </li>
        <li>
          <span className="label">Destination</span>
          <span className="value">{destination}</span>
        </li>
        <li>
          <span className="label">Departure</span>
          <span className="value">{departureTime}</span>
        </li>
        <li>
          <span className="label">Arrival</span>
          <span className="value">{arrivalTime}</span>
        </li>
        <li>
          <span className="label">Price</span>
          <span className="value">{price}</span>
        </li>
      </ul>
      <button disabled={previouslySubmitted} onClick={this.submit} />
    </div>
  }
```
