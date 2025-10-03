// server.js (ES module version)
import express from "express";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import OpenAI from "openai";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// OpenAI setup (optional)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy-key",
});

// Generate Invoice PDF
app.post("/generate-invoice", async (req, res) => {
  console.log("Received request:", req.body);
  const { sellerName, buyerName, items } = req.body;
  
  if (!items || !Array.isArray(items)) {
    return res.status(400).send("Items array is required");
  }
  
  const itemsArr = items;

  // Assign HS codes (fallback: "123456")
  for (let item of itemsArr) {
    try {
      // You can uncomment this block to use real OpenAI API
      /*
      const prompt = `Suggest the correct HS (Harmonized System) code for this product: "${item.description}". Only give me the 6-digit code.`;
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      });
      item.hsCode = response.choices[0].message.content.trim();
      */
      item.hsCode = "123456"; // fallback code
    } catch {
      item.hsCode = "N/A";
    }
  }

  // Create PDF
  const doc = new PDFDocument({ margin: 50 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
  doc.pipe(res);

  // Add company logo if exists
  const logoPath = path.join(__dirname, "logo.png");
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 50, 20, { width: 100 });
  }

  // Title and seller/buyer info
  doc.fontSize(20).text("Commercial Invoice", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Seller: ${sellerName}`);
  doc.text(`Buyer: ${buyerName}`);
  doc.moveDown();
  doc.text("Items:", { underline: true });

  // Items table
  let total = 0;
  itemsArr.forEach((it, i) => {
    const qty = Number(it.qty || 0);
    const unit = Number(it.unitPrice || 0);
    const lineTotal = qty * unit;
    total += lineTotal;

    doc.text(
      `${i + 1}. ${it.description} — Qty: ${qty} — Unit: $${unit.toFixed(
        2
      )} — Total: $${lineTotal.toFixed(2)} — HS Code: ${it.hsCode}`
    );
  });

  doc.moveDown();
  doc.fontSize(14).text(`Grand Total: $${total.toFixed(2)}`, { align: "right" });

  doc.end();
});

// Start server
const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Backend server running on port ${PORT}`));
