import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";

type LeaderboardEntry = {
  id: string;
  name: string;
  score: number;
};

export const Leaderboard = () => {
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
    <div>
      {leaderBoard?.map((entry) => (
        <div key={entry.id}>
          <p>Name: {entry.name}</p>
          <p>Score: {entry.score}</p>
        </div>
      ))}
    </div>
  );
};
