import React from "react";
import styles from "./Input.module.css";

function Input({ onChange, placeholder, value, ...props }) { 
  return (
    <input 
      type="text" 
      className={styles.input}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  )
};

export default Input;