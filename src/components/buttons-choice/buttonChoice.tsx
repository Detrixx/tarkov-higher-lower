import React, { useEffect, useState } from "react";
import { Score } from "../score/score";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

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
  const [newName, setNewName] = useState("");

  const navigate= useNavigate();
  const leaderBoardRef = collection(db, "leaderboard");
  
  const saveScore = async () => {
    if (newName.trim() === "") {
      alert("Name is required");
      return;
    }
    const querySnapshot = await getDocs(
      query(leaderBoardRef, where('name', '==', newName),where('score','>=',oldScore))
    );
    if (querySnapshot.size > 0) {
      console.log('Name already exists in leaderboard. A score je větší ');
      return;
    }
    const querySnapshot2 = await getDocs(
      query(leaderBoardRef, where('name', '==', newName))
    );

    if (querySnapshot2.size > 0) {
      const documentIdToUpdate = querySnapshot2.docs[0].id;
      const userDoc = doc(db,"leaderboard",documentIdToUpdate)
      const newFields = {score: oldScore}
      await updateDoc(userDoc,newFields);
      console.log('Name already exists in leaderboard. ');
      navigate("/leaderboard");
      return;
    }

    await addDoc(leaderBoardRef, { name: newName, score: oldScore });
    navigate("/leaderboard");
  

  };
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
      endGame();
      setOldScore(score);
      setScore(0);
    }
  };

  return (
    <>
      {isLost ? (
        <>
          <div className="Lost">
            <div className="LText">You scored:</div>
            <br />
            <div className="LScore">{oldScore}</div>
          </div>
          <div className="AddToLeaderboard">
          <input
              placeholder="Name..."
              onChange={(event) => {
                setNewName(event.target.value);
              }}
            ></input>
            <button className="Button" onClick={saveScore}>
              SAVE SCORE
            </button>
            
          </div>
        </>
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
