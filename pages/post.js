import React from "react";
import Input from "../components/DynFormInput";
import usePamphlet from "../hooks/usePamphletReducer";
import Link from "next/link";

// This is a dynamic form, we're adding and removing inputs

const PostNewPamphlet = () => {
  const {
    links,
    loading,
    errors,
    pamphlet_link,
    addLink,
    updateEntry,
    submitPamphlet,
  } = usePamphlet();

  const ToRender = links
    ? links.map((linkObj, i) => (
        <Input
          key={i}
          updateStateFn={updateEntry(i)}
          name={linkObj["name"]}
          link={linkObj["link"]}
        />
      ))
    : null;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("potato");
    submitPamphlet();
  };
  return (
    <section>
      {pamphlet_link !== "" ? (
        <div>
          <h2>Here's the link to the new pamphlet</h2>
          <Link href={pamphlet_link}>
            <a>My pamphlet link</a>
          </Link>{" "}
        </div>
      ) : null}
      <form>
        <h1>Create a new pamphlet</h1>
        <button type="button" className="btn btn-add-new" onClick={addLink}>
          Add A Link
        </button>
        {ToRender}

        <button className="btn btn-submit" type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <div>My preview panel here</div>
    </section>
  );
};

export default PostNewPamphlet;
