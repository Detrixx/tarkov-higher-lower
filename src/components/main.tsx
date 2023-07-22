import { useState } from "react";
import { Items } from "./items";
import React from "react";

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
  const [previousObject, setPreviousObject] = useState<TarkovItemObject | null>(
    null
  );

  const [extractedObject, setExtractedObject] =
    useState<TarkovItemObject | null>(null);

  const tarkovItems = Items();

  const clickHandle = () => {
    extractObject();
    setGameProgress(true);
  };

  const randomId = () => {
    let id;
    if (tarkovItems && tarkovItems.length > 0) {
      do {
        id = Math.floor(Math.random() * tarkovItems.length);
      } while (!(tarkovItems[id].avg24hPrice > 0) && id != oldId);
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
            alt={extractedObject.name}
          />
        </div>
      )}
      {previousObject && (
        <div>
          <h2>Jmeno {previousObject.name}</h2>
          <p>Short name: {previousObject.shortName}</p>
          <p>Avg 24h {previousObject.avg24hPrice}</p>
          <p>ID: {previousObject.id}</p>
          <a href={previousObject.wikiLink}>wiki</a>
          <img
            src={`https://assets.tarkov.dev/${previousObject.id}-512.webp`}
            alt={previousObject.name}
          />
        </div>
      )}
    </>
  );
};