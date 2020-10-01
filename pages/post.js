import React from "react";
import Link from "next/link";
import Input from "../components/DynFormInput";
import usePamphlet from "../hooks/usePamphletReducer";

import styles from "../styles/post.module.css";

// This is a dynamic form, we're adding and removing inputs

const PostNewPamphlet = () => {
  const {
    links,
    loading,
    errors,
    pamphlet_link,
    pamphlet_name,
    updateName,
    addLink,
    updateEntry,
    deleteEntry,
    submitPamphlet,
  } = usePamphlet();

  const ToRender = links
    ? links.map((linkObj, i) => (
        <Input
          key={i}
          index={i}
          deleteEntryFn={deleteEntry}
          updateStateFn={updateEntry(i)}
          name={linkObj["name"]}
          link={linkObj["link"]}
        />
      ))
    : null;

  const handleSubmit = (event) => {
    event.preventDefault();
    submitPamphlet();
  };
  const handleNameChange = ({ target }) => {
    updateName(target.value);
  };
  return (
    <article className={styles.article}>
      <div className={styles["form-container"]}>
        {pamphlet_link !== "" ? (
          <div>
            <h2>Here's the link to the new pamphlet</h2>
            <Link href={pamphlet_link}>
              <a>My pamphlet link</a>
            </Link>{" "}
          </div>
        ) : null}
        <form className={styles.form}>
          <h1>Create a new pamphlet</h1>
          <label className={styles["input--name"]}>
            <span>Pamphlet Name</span>
            <input
              name="pamphlet_name"
              type="text"
              value={pamphlet_name}
              onChange={handleNameChange}
            />
          </label>
          <span>{errors ? errors : ""}</span>
          <button
            type="button"
            className={styles.btn}
            onClick={addLink}
            disabled={links.length === 5 ? true : false}
          >
            Add A Link
          </button>
          {ToRender}

          <button className={styles.btn} type="button" onClick={handleSubmit}>
            Submit
          </button>
        </form>
        <Link href="/">
          <a className={styles.btn}>Go Back Home</a>
        </Link>
      </div>
      <div>My preview panel here</div>
    </article>
  );
};

export default PostNewPamphlet;
