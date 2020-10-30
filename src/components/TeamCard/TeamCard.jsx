import React from "react";
import styles from "./TeamCard.module.css";
import { adjustColor } from "../../utils/adjustColor";

function TeamCard({ team, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick(team)}>
      <div className={styles.backwardCard} style={{ backgroundColor: team?.color }}/>
      <div className={styles.forwardCard} style={{ backgroundColor: adjustColor(team?.color, 120) }}>
        <span>{team?.icon}</span>
        <span>{team?.name}</span>
      </div>
    </div>
  )
}

export default TeamCard;