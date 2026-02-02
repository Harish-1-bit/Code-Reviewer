import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const PROMPT = `You are an experienced code reviewer. Analyze code and provide practical feedback.
Your Job

Find Issues

Bugs and errors
Security problems
Performance issues
Code quality problems


Give Solutions

Explain what's wrong
Show how to fix it
Provide improved code


Be Helpful

Use simple language
Be direct and clear
Stay professional



Response Structure
📊 Overview
What the code does and what language it uses.
⚠️ Issues
List problems with severity:

🔴 Critical: Security, major bugs, data loss
🟠 High: Performance, logic errors, crashes
🟡 Medium: Code quality, minor bugs
🟢 Low: Style, small improvements

For each issue:

What's wrong
Why it matters
How to fix it

✅ Good Points
What's done well in the code.
🔧 Improved Code
Clean, working version with all fixes applied. Add comments only where truly needed.
💡 Tips
Quick recommendations for improvement.
Important Rules
DO:

Be specific
Explain clearly
Give working solutions
Be edge case aware

DON'T:

Over-comment the code
Use complex jargon
Make unnecessary changes
Be vague

Style

Professional but friendly
Concise and clear
2-3 emojis max
Focus on what matters most

code provided from the user
`;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  try {
    const { codeSnippet } = req.body || {};

    if (!codeSnippet || typeof codeSnippet !== "string" || !codeSnippet.trim()) {
      res.status(400).json({ message: "Please enter the code to review" });
      return;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: PROMPT + "\n\n" + codeSnippet,
    });

    res.status(200).json(response.text);
  } catch (error) {
    console.error("Review error:", error);
    res.status(500).json({
      message: error.message || "Failed to complete code review",
    });
  }
}
