import { useState } from "react";
import { Items } from "./items";

export const Main = () => {
  const [gameProgress, setgameProgress] = useState(false);
  const tarkovItems = <Items />;

  const clickHandle = () => {
    setgameProgress(true);
  };
  return !gameProgress ? (
    <>
      <button className="ButtonPlay" onClick={clickHandle}>
        PLAY
      </button>
      <Items />
    </>
  ) : null;
};
