import { useState } from "react";
import { Items } from "./items";
import React from "react";

export const Main = () => {
  const [gameProgress, setGameProgress] = useState(false);
  const [extractedObject, setExtractedObject] = useState(null);
  const tarkovItems = <Items />;

  const clickHandle = () => {
    setGameProgress(true);
    extractObject();
  };

  const extractObject = () => {
    let tarkovItemsChildren = React.Children.toArray(
      tarkovItems.props.children
    );
    let id = Math.floor(Math.random() * tarkovItemsChildren.length);
    console.log(id);

    let randomElement = tarkovItemsChildren[id];
    setExtractedObject(randomElement);

    tarkovItemsChildren.map((child, index) => {
      if (index === id) {
        setExtractedObject(child);
      }
    });
    React.Children.forEach(tarkovItemsChildren, (child, index) => {
      if (index === id) {
        setExtractedObject(child);
      }
    });
  };

  return !gameProgress ? (
    <>
      <button className="ButtonPlay" onClick={clickHandle}>
        PLAY
      </button>
      {}
      {extractedObject}
    </>
  ) : null;
};
