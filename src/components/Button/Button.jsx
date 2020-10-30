import React from "react"; 
import styles from "./Button.module.css";

function Button({ title, onClick }) {
  return (
    <div className={styles.buttonContainer}>
      <button onClick={onClick}>
        <span>{title}</span>
      </button>
    </div>
  )
};

export default Button;
