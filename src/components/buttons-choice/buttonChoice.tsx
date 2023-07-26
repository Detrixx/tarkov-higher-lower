import React, { useEffect, useState } from "react";
import { Score } from "../score/score";

interface ButtonChoiceProps {
  previousObject: number;
  extractedObject: number;
  handlePlay: () => void;
  endGame: () => void;
  isLost: boolean;
  showPrice: boolean;
}

const ButtonChoice: React.FC<ButtonChoiceProps> = ({
  previousObject,
  extractedObject,
  handlePlay,
  endGame,
  isLost,
  showPrice,
}) => {
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
        <div className="Lost">
        <div className="LText">You scored:</div><br/>
        <div className="LScore">{oldScore}</div>
        </div>
      ) : (
        <>
          <Score score={score} />
          <div className="ButtonGame animate__animated animate__fadeInRightBig">
            <button
              onClick={higherClick}
              style={{ display: showPrice ? "none" : "flex" }}
              className="Button"
            >
              Higher ᐃ
            </button>
            <button
              onClick={lowerClick}
              style={{ display: showPrice ? "none" : "flex" }}
              className="Button"
            >
              Lower ᐁ
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ButtonChoice;
