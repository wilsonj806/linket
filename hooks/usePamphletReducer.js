import { useReducer } from "react";
import { makeActionCreator, createReducer } from "./reducerFactory";
import { gql, useMutation } from "@apollo/client";

const ADD_PAMPHLET = gql`
  mutation createPamphlet(
    $linksArray: [InputLinkObj!]!
    $pamphletName: String!
  ) {
    createPamphlet(linksArray: $linksArray, pamphletName: $pamphletName) {
      user
      pamphlet_slug
      links_array {
        name
        link
      }
    }
  }
`;

const addLink = makeActionCreator("ADD_LINK");
const addPamphletLink = makeActionCreator(
  "ADD_PAMPHLET_LINK",
  "user",
  "pamphlet_slug",
  "pamphlet_name",
  "links_array"
);
const updateName = makeActionCreator("UPDATE_NAME", "name");
const updateEntry = makeActionCreator("UPDATE_ENTRY", "index", "name", "link");
const deleteEntry = makeActionCreator("DELETE_ENTRY", "index");
const addError = makeActionCreator("ADD_ERROR", "error");
const resetError = makeActionCreator("RESET_ERROR");

/*
 * State shape:
 * {
 *  pamphlet_name: '',
 *   links: [],
 *   error: '',
 *   pamphlet_link: ''
 * }
 *
 * links is an array of objects with shape:
 * { name: String, url: String }
 *
 * Mutation flow:
 * - Press submit
 * - Reducer dispatches an action with the mutation cb as a param
 * - mutation callback is invoked with links
 */
const init = {
  pamphlet_name: "",
  links: [],
  errors: "",
  pamphlet_link: "",
};

// TODO Add form validation
// TODO figure out caching??
// TODO Add form validation
const usePamphletReducer = () => {
  const [
    { links, errors, pamphlet_link, pamphlet_name },
    dispatch,
  ] = useReducer(reducer, init);

  const [mutAddPamphlet, { loading }] = useMutation(ADD_PAMPHLET, {
    onCompleted: (data) =>
      dispatch(
        addPamphletLink(
          data.createPamphlet.user,
          data.createPamphlet.pamphlet_slug,
          data.createPamphlet.pamphlet_name,
          data.createPamphlet.links_array
        )
      ),
    onError: (error) => dispatch(addError(error)),
  });

  return {
    links,
    errors,
    loading,
    pamphlet_link,
    pamphlet_name,
    updateName: (name) => dispatch(updateName(name)),
    addLink: () => dispatch(addLink()),
    submitPamphlet: () =>
      mutAddPamphlet({
        variables: {
          linksArray: links,
          pamphletName: pamphlet_name,
        },
      }),
    updateEntry: (index) => (name, link) =>
      dispatch(updateEntry(index, name, link)),
    deleteEntry: (index) => dispatch(deleteEntry(index)),
    addError: (error) => dispatch(addError(error)),
    resetError: () => dispatch(resetError()),
  };
};

const addLinkHandler = ({ links, ...state }, action) => {
  return { ...state, links: [...links, { name: "", link: "" }] };
};

const addPamphletLinkHandler = (
  state,
  { user, pamphlet_slug, links_array, pamphlet_name }
) => {
  const finalUrl = `/${user}/${pamphlet_slug}`;
  return {
    ...state,
    pamphlet_link: finalUrl,
    links: links_array,
    pamphlet_name,
  };
};

const updateEntryHandler = ({ links, ...state }, { index, name, link }) => {
  const result = [...links];
  result[index] = { name, link };
  return { ...state, links: result };
};
const updateNameHandler = (state, { name }) => {
  return { ...state, pamphlet_name: name };
};

const deleteEntryHandler = ({ links, ...state }, { index }) => {
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
  ADD_PAMPHLET_LINK: addPamphletLinkHandler,
  UPDATE_NAME: updateNameHandler,
  UPDATE_ENTRY: updateEntryHandler,
  DELETE_ENTRY: deleteEntryHandler,
  ADD_ERROR: addErrorHandler,
  RESET_ERROR: resetErrorHandler,
});

export default usePamphletReducer;
