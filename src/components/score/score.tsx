import React from "react";

interface ScoreProps {
  score: number;
}

export const Score: React.FC<ScoreProps> = ({ score }) => {
  return <div className="Score">Score: {score}</div>;
};
