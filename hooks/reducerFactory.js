/**
 * NOTE: This is likely to be overkill and better solved by
 * ...downloading a library, but it's work doing just to see
 * ...how one might approach doing codegen to avoid excessive boilerplate
 */
// Curried function, returns an action creator function
export function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const constructedAction = { type };

    // This ends up working out so as long as the order you input your args initially lines up with the order that you input your args after invoking the action creator
    argNames.forEach((arg, index) => {
      // Building out the action with keys from our initial function
      constructedAction[argNames[index]] = args[index];
    });
    return constructedAction;
  };
}

/**
 *
 * @param {*} initialState it's initial state
 * @param {*} handlers is an input object that has the shape of initialState,
 * ...only each key is a function that dictates how state is updated.
 * This is just like how the Redux example uses a switch statement to handle state undates
 */
export function createReducer(initialState, handlers) {
  // returns our reducer function with expected args
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
