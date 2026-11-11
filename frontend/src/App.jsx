import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/visits")
      .then((r) => {
        if (!r.ok) throw new Error(`API error ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  const stack = ["React", "nginx", "Node", "Postgres", "Redis"];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        fontFamily: "system-ui, sans-serif",
        color: "#e2e8f0",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#1e293b",
          border: "1px solid #334155",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 24 }}>Stack Demo</h1>
        <p style={{ color: "#94a3b8", marginTop: 4 }}>
          Deployed via GitHub Actions (v3)
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "16px 0" }}>
          {stack.map((s) => (
            <span
              key={s}
              style={{
                background: "#334155",
                borderRadius: 999,
                padding: "4px 12px",
                fontSize: 13,
              }}
            >
              {s}
            </span>
          ))}
        </div>

        <div
          style={{
            background: "#0f172a",
            borderRadius: 12,
            padding: 16,
            fontFamily: "monospace",
            fontSize: 14,
            color: error ? "#f87171" : "#4ade80",
            overflowX: "auto",
          }}
        >
          {error
            ? error
            : data
            ? <pre style={{ margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
            : "Loading..."}
        </div>
      </div>
    </div>
  );
}