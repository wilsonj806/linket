import { useReducer } from "react";
import { makeActionCreator, createReducer } from "./reducerFactory";

const addLink = makeActionCreator("ADD_LINK");
const updateEntry = makeActionCreator("UPDATE_ENTRY", "index", "name", "url");
const deleteEntry = makeActionCreator("DELETE_ENTRY", "index");
const addError = makeActionCreator("ADD_ERROR", "error");
const resetError = makeActionCreator("RESET_ERROR");

/*
 * State shape:
 * {
 *   links: [],
 *   error: ''
 * }
 *
 * links is an array of objects with shape:
 * { name: String, url: String }
 */
const init = {
  links: [],
  error: "",
};

const addLinkHandler = ({ links, ...state }, action) => {
  return { ...state, links: [...links, { name: "", link: "" }] };
};
const updateEntryHandler = ({ links, state }, { index, name, url }) => {
  const result = [...links];
  result[index] = { name, url };
  return { ...state, links: result };
};

const deleteEntryHandler = ({ links, state }, { index }) => {
  return { ...state, links: links.filter((link, i) => i !== index) };
};

const addErrorHandler = (state, { error }) => {
  return { ...state, error };
};
const resetErrorHandler = (state, action) => {
  return { ...state, error: "" };
};

const reducer = createReducer(init, {
  ADD_LINK: addLinkHandler,
  UPDATE_ENTRY: updateEntryHandler,
  DELETE_ENTRY: deleteEntryHandler,
  ADD_ERROR: addErrorHandler,
  RESET_ERROR: resetErrorHandler,
});

const usePamphletReducer = () => {
  const [state, dispatch] = useReducer(reducer, init);
  const { links, errors } = state;
  return {
    links,
    errors,
    addLink: () => dispatch(addLink()),
    updateEntry: (index) => (name, url) =>
      dispatch(updateEntry(index, name, url)),
    deleteEntry: (index) => dispatch(deleteEntry(index)),
    addError: (error) => dispatch(addError(error)),
    resetError: () => dispatch(resetError()),
  };
};

export default usePamphletReducer;
