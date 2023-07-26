import React from "react";

interface ScoreProps {
  score: number;
}

export const Score: React.FC<ScoreProps> = ({ score }) => {
  return <div key={score} className="Score animate__animated animate__bounceIn">Score: {score}</div>;
};
