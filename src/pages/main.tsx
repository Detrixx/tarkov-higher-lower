import { useState } from "react";
import { Items } from "./items";
import React from "react";

export const Main = () => {
  const [gameProgress, setGameProgress] = useState(false);
  const [extractedObject, setExtractedObject] = useState<{
    id: number;
    name: string;
    shortName: string;
    avg24hPrice: number;
    wikiLink: string;
  } | null>(null);

  const tarkovItems = Items();

  const clickHandle = () => {
    setGameProgress(true);
    extractObject();
  };

  const extractObject = () => {
    if (tarkovItems && tarkovItems.length > 0) {
      let id;
      do {
        id = Math.floor(Math.random() * tarkovItems.length);
      } while (!(tarkovItems[id].avg24hPrice > 0));
      setExtractedObject(tarkovItems[id]);
    }
  };

  return (
    <>
      <button className="ButtonPlay" onClick={clickHandle}>
        PLAY
      </button>

      {extractedObject && (
        <div>
          <h2>Jmeno {extractedObject.name}</h2>
          <p>Short name: {extractedObject.shortName}</p>
          <p>Avg 24h {extractedObject.avg24hPrice}</p>
          <p>ID: {extractedObject.id}</p>
          <a href={extractedObject.wikiLink}>wiki</a>
          <img
            src={`https://assets.tarkov.dev/${extractedObject.id}-512.webp`}
            //alt={extractedObject.name}
          />
        </div>
      )}
    </>
  );
};
