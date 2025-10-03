import { useState } from "react";
import "./App.css";

function App() {
  const [mode, setMode] = useState("json"); // 'json' or 'text'
  const [sellerName, setSellerName] = useState("ACME Exporters");
  const [buyerName, setBuyerName] = useState("Global Import Ltd");
  const [itemsJSON, setItemsJSON] = useState(
    '[{"description":"Widget A","qty":2,"unitPrice":10},{"description":"Widget B","qty":1,"unitPrice":25}]'
  );
  const [plainText, setPlainText] = useState("");

  const generatePDF = async () => {
    let items = [];

    if (mode === "json") {
      try {
        items = JSON.parse(itemsJSON);
      } catch (err) {
        alert("Invalid JSON");
        return;
      }
    } else {
      // Parse plain text into items
      // Example input format:
      // 1. Widget A — Qty: 2 — Unit: 10
      const lines = plainText.split("\n").filter((line) => line.trim() !== "");
      for (let line of lines) {
        const match = line.match(/(.*)— Qty: (\d+) — Unit: (\d+\.?\d*)/);
        if (match) {
          items.push({
            description: match[1].trim(),
            qty: Number(match[2]),
            unitPrice: Number(match[3]),
          });
        }
      }
    }

    // Send request to backend
    try {
      const response = await fetch("/generate-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sellerName, buyerName, items }),
      });

      if (!response.ok) {
        alert("Failed to generate PDF");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error(err);
      alert("Error generating PDF");
    }
  };

  return (
    <div className="App">
      <h1>AI Invoice Generator</h1>

      <div>
        <label>
          <input
            type="radio"
            value="json"
            checked={mode === "json"}
            onChange={() => setMode("json")}
          />
          JSON Input
        </label>
        <label style={{ marginLeft: "20px" }}>
          <input
            type="radio"
            value="text"
            checked={mode === "text"}
            onChange={() => setMode("text")}
          />
          Plain Text Input
        </label>
      </div>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Seller name"
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Buyer name"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        {mode === "json" ? (
          <textarea
            rows={6}
            cols={50}
            value={itemsJSON}
            onChange={(e) => setItemsJSON(e.target.value)}
          />
        ) : (
          <textarea
            rows={6}
            cols={50}
            placeholder="1. Widget A — Qty: 2 — Unit: 10"
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
          />
        )}
      </div>

      <button style={{ marginTop: "20px" }} onClick={generatePDF}>
        Generate PDF
      </button>
    </div>
  );
}

export default App;
