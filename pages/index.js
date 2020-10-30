import { useState, useCallback, useEffect } from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TeamCard from "../src/components/TeamCard";
import TeamMemberCard from "../src/components/TeamMemberCard";
import MisteryCard from "../src/components/MisteryCard";
import Button from "../src/components/Button";
import Input from "../src/components/Input";

import { teams } from "../src/utils/teams";
import { challenges } from "../src/utils/challenges";

export default function Home() {
  const [isATeamSelected, setIsAteamSelected] = useState(false);
  const [currentTeam, setCurrentTeam] = useState({});
  const [wilingToPlay, setwilingToPlay] = useState([]);
  const [allreadyParticipated, setAllreadyParticipated] = useState(false);
  const [unlockedClues, setUnlockedClues] = useState([]);
  
  const [currentChallengeId, setCurrentChallengeId] = useState(1);
  const [inputValue, setInputValue] = useState("");
  
  const challengeToShow = challenges.find(challenge => challenge.id === currentChallengeId)
  const currentChallengeClues = challengeToShow?.clues;
  const numberOfClues = currentChallengeClues?.length;
  
  const [players, setPlayers] = useState([]);

  let start = 0
  for (let c of challenges) {
    if (c.id < challengeToShow?.id) {
      start = start + c.clues?.length;
    }
  }
  let end = start + numberOfClues;

  const handleClickTeamCard = useCallback((team) => {
    setIsAteamSelected(true);
    setCurrentTeam(team);
    setwilingToPlay(team?.members);
    const players = [
      ...team?.members, 
      ...team?.members, 
      ...team?.members, 
      ...team?.members, 
      ...team?.members, 
      ...team?.members,
      ...team?.members,
      ...team?.members,
      ...team?.members,
      ...team?.members
    ]
    setPlayers(players);
  }, []);

  const handleBack = useCallback(() => {
    setIsAteamSelected(false);
    setCurrentTeam({});
  }, []);

  const showNextChallenge = async () => {
    if (inputValue === "") {
      alert("Debes escribir la frase oculta");
      return;
    }

    const currentChallengeAnswer = challengeToShow?.answer
    
    if (currentChallengeAnswer === inputValue.toLocaleLowerCase()) {
      setInputValue("");
    } else {
      alert("Nada mi llave, esa no es la frase. Ponte pilas.")
      return;
    }
    
    const nextChallengeId = currentChallengeId + 1;
    await setCurrentChallengeId(nextChallengeId);
  }

  const handleInputChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handleClickOnPlayerCard = useCallback((teamMember) => {
    const firstName = teamMember?.name?.split(" ")[0]
    const lastname = prompt(`Hola ${firstName} para desbloquar tu tarjeta tienes que decirme tu segundo apellido tal como aparece en tú cédula :p`);
    if (lastname?.toLocaleLowerCase() === teamMember?.lastname.toLocaleLowerCase()) {
      const teamMemberIndex = players.findIndex(player => player.id === teamMember.id);
      const unlockedClue = currentChallengeClues.find((el, index) => index === teamMemberIndex);
      const updatedPlayers = players?.map(player => {
        if (player.id === teamMember.id) {
          return { ...player, unlockedClue }
        } else {
          return player;
        }
      });
      setPlayers(updatedPlayers);
    } else {
      alert("Yerda, al parecer no eres quien dices ser, ¡Sáquese de aqui o intenta de nuevo!")
    }
  }, [players, currentChallengeClues, setUnlockedClues, unlockedClues, setPlayers]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Ayenda Mistery 🕵️‍♀️</title>
      </Head>
      <main className={styles.main}>
        {isATeamSelected 
          ? <h1 className={styles.title}>{`${currentTeam?.icon} ${currentTeam?.name}`}</h1> 
          : <h1 className={styles.title}>Ayenda Mistery 🕵️‍♀️</h1>}
        {isATeamSelected 
          ? <div className={styles.gameContainer}>
             {currentChallengeId <= challenges.length && 
             <>
              <div>
                {/* {challengeToShow?.clues?.map(mistery => 
                  <MisteryCard key={mistery.id} mistery={mistery}/>
                )} */}
                {players?.slice(start, end)?.map((player, index) => 
                  <TeamMemberCard
                    teamMember={player}
                    onClick={handleClickOnPlayerCard}
                  />
                )}
              </div>
              <Input 
                placeholder="Desbloquea las tarjetas y escribe la frase oculta"
                onChange={handleInputChange}
                value={inputValue}
              />
              <Button 
                title="Validar"
                onClick={showNextChallenge}
              />
             </>}

            {currentChallengeId > challenges.length && <div className={styles.congratsContainer}>
                <h1 className={styles.title}>🏆</h1>
                <h1 className={styles.title}>¡Cule vacile!</h1>
                <h1 className={styles.title}>Son el equipo ganador</h1>
                <h1 className={styles.title}>Felicidades 😁 </h1>
                <span>la clave es “cule vacile"</span>
              </div>}
          </div>
          : <div className={styles.cardsContainer}>
              {teams.map(team => 
                <TeamCard 
                  key={team.id} 
                  team={team} 
                  onClick={handleClickTeamCard}
                />
              )}
            </div>}
              {isATeamSelected && <h6 className={styles.backButton} onClick={handleBack}>{"< Volver"}</h6>}
      </main>
    </div>
  )
}
