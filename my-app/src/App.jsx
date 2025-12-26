import { useState } from "react";

function App() {
  const [product, setProduct] = useState("");
  const [country, setCountry] = useState("");
  const [experience, setExperience] = useState("beginner");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitExportCheck = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        "https://giuliana-cellarless-leonel.ngrok-free.dev/api/export-check",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product, country, experience }),
        }
      );

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Backend not reachable");
    }

    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f8", padding: "40px" }}>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginBottom: "5px" }}>Export AI Agent</h1>
        <p style={{ color: "#666", marginBottom: "30px" }}>
          Intelligent export readiness & compliance guidance
        </p>

        <div style={{ display: "grid", gap: "15px" }}>
          <input
            placeholder="Product you want to export"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Destination country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={inputStyle}
          />

          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            style={inputStyle}
          >
            <option value="beginner">Beginner exporter</option>
            <option value="intermediate">Intermediate exporter</option>
            <option value="expert">Experienced exporter</option>
          </select>

          <button
            onClick={submitExportCheck}
            disabled={loading}
            style={{
              padding: "12px",
              background: "#0b5ed7",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {loading ? "Analysing..." : "Analyse Export Readiness"}
          </button>
        </div>

        {result && (
          <div style={{ marginTop: "40px" }}>
            <Section title="Required Documents" items={result.documents} />
            <Section title="Warnings" items={result.warnings} />
            <Section title="Recommended Next Steps" items={result.nextSteps} />
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const Section = ({ title, items }) => (
  <div style={{ marginBottom: "25px" }}>
    <h3>{title}</h3>
    <ul>
      {items?.length ? (
        items.map((item, i) => <li key={i}>{item}</li>)
      ) : (
        <li>None</li>
      )}
    </ul>
  </div>
);

export default App;
