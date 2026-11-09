import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/visits").then((r) => r.json()).then(setData);
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 32 }}>
      <h1>React + nginx + Node + Postgres + Redis</h1>
      <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
    </div>
  );
}