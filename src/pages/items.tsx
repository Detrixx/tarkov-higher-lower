import { useState, useEffect } from "react";
interface ItemsIn {
  id: number;
  name: string;
  shortName: string;
  inconLink: string;
  avg24hPrice: number;
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
    }
}`,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log("data returned:", data.data.items);
        setData(data.data.items);
      });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data?.map((item) =>
        item.avg24hPrice != 0 ? (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.shortName}</p>
            <p>{item.avg24hPrice}</p>
            <p>{item.id}</p>
            {/* Render other item properties as needed */}
          </div>
        ) : null
      )}
    </div>
  );
};
