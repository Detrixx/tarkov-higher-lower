import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

type LeaderboardEntry = {
  id: string;
  name: string;
  score: number;
};

export const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaderBoard, setLeaderBoard] = useState<
    LeaderboardEntry[] | undefined
  >(undefined);
  const leaderBoardRef = collection(db, "leaderboard");
  useEffect(() => {
    const getLeaderBoard = async () => {
      const data = await getDocs(leaderBoardRef);
      setLeaderBoard(
        data.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as LeaderboardEntry)
        )
      );
    };

    getLeaderBoard();
  }, []);

  return (
    <>
    <div className="Leaderboard">
      <table className="data-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
        {leaderBoard
          ?.sort((a, b) => b.score - a.score)
          .map((entry, index) => (
            
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
              </tr>
          ))}
           </tbody>
      </table>
    
    </div>
      <button className="Button BBack" onClick={() => navigate("/")}>
      Back
    </button>
    </>
  );
};
