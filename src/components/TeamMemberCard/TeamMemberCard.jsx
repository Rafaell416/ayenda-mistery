import React from "react";
import styles from "./TeamMemberCard.module.css";
import MisteryCard from "../MisteryCard";

function TeamMemberCard({ teamMember, onClick }) {
  if (teamMember?.unlockedClue) {
    return (
      <MisteryCard 
        mistery={teamMember?.unlockedClue}
      />
    )
  }
  return (
    <div className={styles.teamMemberCard} onClick={() => onClick(teamMember)}>
      <span>{teamMember?.name}</span>
    </div>
  )
}

export default TeamMemberCard;