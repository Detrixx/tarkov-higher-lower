import { useEffect, useState } from "react";
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
  const [greenSquare, setGreenSquare] = useState("Hide");
  const [redSquare, setRedSquare] = useState("Hide");
  const [previousObject, setPreviousObject] = useState<TarkovItemObject | null>(
    null
  );
  const [showPrice, setShowPrice] = useState(false);
  const [extractedObject, setExtractedObject] =
    useState<TarkovItemObject | null>(null);

  const tarkovItems = Items();
  const formatPriceWithSpaces = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (gameProgress) {
      timeoutId = setTimeout(() => {}, 1000);
    }

    return () => {
      clearTimeout(timeoutId); // Cleanup to avoid memory leaks
    };
  }, [gameProgress]);

  const handlePlay = () => {
    if (!gameProgress) {
      setIsLost(false);
      extractObject();
      setGameProgress(true);
    }
    gameProgress && setShowPrice(true);
    setTimeout(() => {
      setGreenSquare("Hide");
      setShowPrice(false);
      setIsLost(false);
      extractObject();
      setGameProgress(true);
    }, 1500);
    gameProgress && setGreenSquare("");
  };

  const endGame = () => {
    setShowPrice(true);
    setTimeout(() => {
      setRedSquare("Hide");
      setGameProgress(false);
      setIsLost(true);
      setShowPrice(false);
    }, 1500);
    setRedSquare("");
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
    <>
      {gameProgress && extractedObject && (
        <>
          <div
            className={`square squareRed ${redSquare} animate__animated animate__fadeIn`}
          >
            ❌
          </div>
          <div
            className={`square squareGreen ${greenSquare} animate__animated animate__fadeIn`}
          >
            ✔
          </div>
          <div
            key={extractedObject.avg24hPrice}
            className="circle animate__animated animate__zoomInRight"
          >
            <span className="vs-text animate__animated animate__zoomInRight">
              VS
            </span>
          </div>
        </>
      )}
      <div className="container">
        <div className="Button-container">
          {!gameProgress && !isLost && (
            <>
              <div className="MainText">Tarkov Higher Lower Game</div>
              <div className="SecondaryText">
                Try to guess the average prices from the Tarkov flea market for
                the last 24 hours.
              </div>
            </>
          )}
          {!gameProgress && (
            <div className="ButtonPlayP">
              <button className="ButtonPlay Button" onClick={handlePlay}>
                PLAY
              </button>
            </div>
          )}

          {previousObject && extractedObject && (
            <ButtonChoice
              previousObject={previousObject.avg24hPrice}
              extractedObject={extractedObject.avg24hPrice}
              handlePlay={handlePlay}
              endGame={endGame}
              isLost={isLost}
              showPrice={showPrice}
            />
          )}
        </div>

        {extractedObject && gameProgress && (
          <div
            key={extractedObject.id}
            className="Item animate__animated animate__fadeInRightBig"
          >
            <div className="Text">
              <h2 className="TextJmeno">{extractedObject.name}</h2>
              {showPrice && (
                <p className="Price animate__animated animate__fadeIn">
                  {formatPriceWithSpaces(extractedObject.avg24hPrice)} ₽
                </p>
              )}
              <a
                href={extractedObject.wikiLink}
                target="_blank"
                className="Wiki"
              >
                wiki
              </a>
            </div>

            <img
              key={extractedObject.id}
              className="ImgItem animate__animated animate__zoomInUp"
              src={`https://assets.tarkov.dev/${extractedObject.id}-512.webp`}
              alt={extractedObject.name}
            />
          </div>
        )}
        {previousObject && gameProgress && (
          <div
            key={previousObject.id}
            className="Item animate__animated animate__bounceInRight"
          >
            <div className="Text">
              <h2 className="TextJmeno">{previousObject.name}</h2>
              <p className="Price animate__animated animate__fadeIn">
                {formatPriceWithSpaces(previousObject.avg24hPrice)} ₽
              </p>
              <a
                href={previousObject.wikiLink}
                target="_blank"
                className="Wiki"
              >
                wiki
              </a>
            </div>
            <img
              key={previousObject.id}
              className="ImgItem animate__animated animate__zoomInUp"
              src={`https://assets.tarkov.dev/${previousObject.id}-512.webp`}
              alt={previousObject.name}
            />
          </div>
        )}
      </div>
    </>
  );
};
