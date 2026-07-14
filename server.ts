import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // Initialize Gemini API (Server-side only, secure, sets User-Agent for telemetry)
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Chat Endpoint for Khmer Law Hub AI assistant "Kosal"
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not set on the server. Please add your key in Settings > Secrets." 
        });
      }

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const systemInstruction = `You are Kosal (កុសល), the friendly, highly professional AI legal assistant for 'Khmer Law Hub' in Cambodia. Your goal is to help citizens, business owners, and legal professionals understand Cambodian laws (such as the Civil Code 2007, Criminal Code 2009, Labor Law 1997, and corporate/commercial regulations) and legal template options.

Follow these rules:
1. Speak in a balanced combination of Khmer (using respectful honorifics like បាទ/ចាស, លោក/លោកស្រី) and English depending on the language the user prompts in. Be bilingual where appropriate to aid understanding.
2. Focus strictly on Cambodian legal contexts. Mention relevant codes, articles, or regulations if applicable.
3. Provide helpful, structured explanations, breaking down complex clauses or legal jargon simply.
4. IMPORTANT: Always include a short, humble legal disclaimer at the bottom of your response in both English and Khmer. E.g.,
"---
សេចក្តីប្រកាសមិនទទួលខុសត្រូវ៖ ខ្ញុំជាជំនួយការច្បាប់ AI។ រាល់ចម្លើយរបស់ខ្ញុំគឺសម្រាប់ជាព័ត៌មានប៉ុណ្ណោះ និងមិនមែនជាការប្រឹក្សាច្បាប់ផ្លូវការឡើយ។ សូមពិគ្រោះជាមួយមេធាវីអាជីពនៅក្នុងបញ្ជីឈ្មោះមេធាវីរបស់យើងសម្រាប់ដំបូន្មានផ្លូវការ។
Disclaimer: I am an AI legal assistant. My responses are for informational purposes only and do not constitute official legal advice. Please consult with a professional attorney in our Lawyer Directory for formal legal counsel."
5. Keep your tone humble, authoritative yet accessible, respectful, and highly organized.`;

      // Map chat history to the Google GenAI format
      const contents = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ 
        error: error.message || "Failed to generate legal explanation. Please check server logs." 
      });
    }
  });

  // Vite middleware setup for development, serving index.html / dist static in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware loaded.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving static files from dist directory in production.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
