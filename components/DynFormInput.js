import React from "react";

import styles from "../styles/post.module.css";

const DynamicFormInput = ({
  deleteEntryFn,
  updateStateFn,
  name,
  link,
  index,
}) => {
  const handleChange = ({ target }) => {
    if (target.name === "Link Name") {
      updateStateFn(target.value, link);
    } else {
      updateStateFn(name, target.value);
    }
  };
  return (
    <div className={styles["wrap-dyn-input"]}>
      <span className={styles["dynamic-input-count"]}>{`${index + 1}.`}</span>
      <label className={styles["dynamic-label"]}>
        <span>Link Name</span>
        <input
          type="text"
          name="Link Name"
          onChange={handleChange}
          value={name}
        />
      </label>
      <label className={styles["dynamic-label"]}>
        <span>Link URL</span>
        <input
          type="text"
          name="Link URL"
          onChange={handleChange}
          value={link}
        />
      </label>
      <button
        className={styles["btn-trash"]}
        type="button"
        onClick={() => deleteEntryFn(index)}
      >
        X
      </button>
    </div>
  );
};

export default DynamicFormInput;
