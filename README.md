# useCallback
- return a memoized version of the callback function that only changes if one of the dependencies has changed,
- or else it will return a cached version
- it is helpful to prevent unnecessary renders.
    
# useEffect
- acts like componentDidUpdate.
- It runs the function after every component update (re-render).
- But you can change how often it gets re-run using the second input.
- with [] as second argument, useEffect acts like componentDidMount.
- It runs only once after the first render

# State Batching
- All state updates from one and the same synchronous event handler are batched together.
- After setNewState(), you can't immediately use the new state when NOT using the function form