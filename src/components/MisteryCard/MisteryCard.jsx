import React from "react";
import styles from "./MisteryCard.module.css";

function MisteryCard({ mistery }) {
  return (
    <div className={styles.misteryCard}>
      {mistery.type === "image" 
        ? <img className={styles.image} src={mistery?.value}/>
        : <span>{mistery?.value}</span> 
      }
    </div>
  )
};

export default MisteryCard;