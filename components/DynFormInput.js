import React from "react";

const DynamicFormInput = ({ updateStateFn, name, link }) => {
  const handleChange = ({ target }) => {
    if (target.name === "Link Name") {
      updateStateFn(target.value, link);
    } else {
      updateStateFn(name, target.value);
    }
  };
  return (
    <div>
      <label>
        <span>Link Name</span>
        <input
          type="text"
          name="Link Name"
          onChange={handleChange}
          value={name}
        />
      </label>
      <label>
        <span>Link URL</span>
        <input
          type="text"
          name="Link URL"
          onChange={handleChange}
          value={link}
        />
      </label>
    </div>
  );
};

export default DynamicFormInput;
