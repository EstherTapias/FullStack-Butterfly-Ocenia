import React, { useState } from "react";
import "./TagsInput.css";

const TagsInput = ({ value = [], onChange }) => {
  const [input, setInput] = useState("");
// Añade etiqueta si es válida y no está repetida
  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInput("");
    }
  };
//Elimina etiqueta
  const removeTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };
//Añadir Enter o coma
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="tags-input-container">
      <div className="tags-list">
        {value.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
            <button type="button" className="remove-tag" onClick={() => removeTag(tag)}>×</button>
          </span>
        ))}
      </div>
      <input name="tagsInput"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Añade..."
        className="tag-input"
      />
    </div>
  );
};

export default TagsInput;
