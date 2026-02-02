import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const aiResponse = async(req,res)=>{

  const  codeSnippet  = req.body.codeSnippet
  const prompt = `You are an experienced code reviewer. Analyze code and provide practical feedback.
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
Think about edge cases

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
${codeSnippet}

`
  if(!codeSnippet){
    res.status(404)
    throw new Error('Enter the code')
  }
  console.log(codeSnippet)
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });
  console.log(response.text);
  res.status(200).json(response.text)
}

export default aiResponse