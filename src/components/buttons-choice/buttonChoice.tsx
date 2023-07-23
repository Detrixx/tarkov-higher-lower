import React, { useEffect, useState } from "react";
import { Score } from "../score/score";

interface ButtonChoiceProps {
  previousObject: number;
  extractedObject: number;
  handlePlay: () => void;
  endGame: () => void;
  isLost: boolean;
}

const ButtonChoice: React.FC<ButtonChoiceProps> = ({
  previousObject,
  extractedObject,
  handlePlay,
  endGame,
  isLost,
}) => {
  // const [isLost, setIsLost] = useState(false);
  const [score, setScore] = useState(0);
  const [oldScore, setOldScore] = useState(0);

  const higherClick = () => {
    if (extractedObject >= previousObject) {
      setScore(score + 1);
      handlePlay();
    } else {
      endGame();
      setOldScore(score);
      setScore(0);
    }
  };
  const lowerClick = () => {
    if (extractedObject <= previousObject) {
      setScore(score + 1);
      handlePlay();
    } else {
      console.log("špatně");
      endGame();
      setOldScore(score);
      setScore(0);
    }
  };
  return (
    <>
      {isLost ? (
        <div>You lost your Score: {oldScore}</div>
      ) : (
        <>
          <Score score={score} />
          <button onClick={higherClick}>Higher</button>
          <button onClick={lowerClick}>Lower</button>
        </>
      )}
    </>
  );
};

export default ButtonChoice;
