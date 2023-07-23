import { useState } from "react";
import { Items } from "../items/items";
import React from "react";
import ButtonChoice from "../buttons-choice/buttonChoice";

interface TarkovItemObject {
  id: number;
  name: string;
  shortName: string;
  avg24hPrice: number;
  wikiLink: string;
}

export const Main = () => {
  const [gameProgress, setGameProgress] = useState(false);
  const [oldId, setOldId] = useState(0);
  const [isLost, setIsLost] = useState(false);
  const [previousObject, setPreviousObject] = useState<TarkovItemObject | null>(
    null
  );
  const [extractedObject, setExtractedObject] =
    useState<TarkovItemObject | null>(null);

  const tarkovItems = Items();

  const handlePlay = () => {
    setIsLost(false);
    extractObject();
    setGameProgress(true);
  };
  const endGame = () => {
    setGameProgress(false);
    setIsLost(true);
  };

  const randomId = () => {
    let id;
    if (tarkovItems && tarkovItems.length > 0) {
      do {
        id = Math.floor(Math.random() * tarkovItems.length);
      } while (!(tarkovItems[id].avg24hPrice > 0) && id !== oldId);
      return id;
    }
  };
  const tmpId = randomId();
  const newId = randomId();

  const extractObject = () => {
    if (tarkovItems && tarkovItems.length > 0) {
      gameProgress
        ? oldId && setPreviousObject(tarkovItems[oldId])
        : tmpId && setPreviousObject(tarkovItems[tmpId]);

      newId && setExtractedObject(tarkovItems[newId]);
      newId && setOldId(newId);
    }
  };

  return (
    <div className="container">
      {!gameProgress && (
        <button className="ButtonPlay" onClick={handlePlay}>
          PLAY
        </button>
      )}
      {previousObject && extractedObject && (
        <ButtonChoice
          previousObject={previousObject.avg24hPrice}
          extractedObject={extractedObject.avg24hPrice}
          handlePlay={handlePlay}
          endGame={endGame}
          isLost={isLost}
        />
      )}

      {extractedObject && gameProgress && (
        <div className="Item">
          <div className="Text">
            <h2>Jmeno {extractedObject.name}</h2>
            <p>Short name: {extractedObject.shortName}</p>
            <p>Avg 24h {extractedObject.avg24hPrice}</p>
            <p>ID: {extractedObject.id}</p>
            <a href={extractedObject.wikiLink}>wiki</a>
          </div>
          <img
            className="ImgItem"
            src={`https://assets.tarkov.dev/${extractedObject.id}-512.webp`}
            alt={extractedObject.name}
          />
        </div>
      )}
      {previousObject && gameProgress && (
        <div className="Item">
          <div className="Text">
            <h2>Jmeno {previousObject.name}</h2>
            <p>Short name: {previousObject.shortName}</p>
            <p>Avg 24h {previousObject.avg24hPrice}</p>
            <p>ID: {previousObject.id}</p>
            <a href={previousObject.wikiLink}>wiki</a>
          </div>
          <img
            className="ImgItem"
            src={`https://assets.tarkov.dev/${previousObject.id}-512.webp`}
            alt={previousObject.name}
          />
        </div>
      )}
    </div>
  );
};
