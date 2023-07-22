import { useState, useEffect } from "react";
interface ItemsIn {
  id: number;
  name: string;
  shortName: string;
  iconLink: string;
  avg24hPrice: number;
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
        iconLink
      avg24hPrice
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
      avg24hPrice: item.avg24hPrice,
      wikiLink: item.wikiLink,
  }
  });
  return extractedData;

  // return (
  //   <div>
  //     {data?.map((item) =>
  //       item.avg24hPrice != 0 ? (
  //         <div key={item.id}>
  //           <h2>{item.name}</h2>
  //           <p>{item.shortName}</p>
  //           <p>{item.avg24hPrice}</p>
  //           <p>{item.id}</p>
  //           <img src={`https://assets.tarkov.dev/${item.id}-512.webp`} />
  //         </div>
  //       ) : null
  //     )}
  //   </div>
  // );
};
