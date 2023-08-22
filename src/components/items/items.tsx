import { useState, useEffect } from "react";
interface ItemsIn {
  id: number;
  name: string;
  shortName: string;
  iconLink: string;
  avg24hPrice: number;
  lastLowPrice: number;
  wikiLink: string;
}

export const Items = () => {
  const [data, setData] = useState<ItemsIn[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://api.tarkov.dev/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `{
    items {
        id
        name
        shortName
        types
        iconLink
      avg24hPrice
      lastLowPrice
      wikiLink
    }
}`,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setData(data.data.items);
      });
  };

  if (!data) {
    return null;
  }

  const extractedData = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      shortName: item.shortName,
      //avg24hPrice: item.avg24hPrice,
      avg24hPrice: item.lastLowPrice,
      wikiLink: item.wikiLink,
  }
  });
  return extractedData;

};
