import Groq from "groq-sdk";
import readline from "node:readline/promises";
import { fileURLToPath } from "node:url";
import { vectorStore } from "./prepare.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Core AI/RAG query handler for CloudNexis.
 * Single source of truth for RAG retrieval and Groq LLM completion.
 *
 * @param {string} question - The query string
 * @returns {Promise<string>} The generated AI answer
 */
export async function handleChat(question) {
  const relevantChunks = await vectorStore.similaritySearch(question, 3);
  const context = relevantChunks.map((chunk) => chunk.pageContent).join("\n\n");

  const systemPrompt = `You are the official AI assistant for CloudNexis. Answer the user's questions using only the provided context.
Do not make up information. If the answer is not available in the context, say you don't have that information.
Be clear, helpful, and concise.`;

  const userQuery = `Question:${question}
Relevant Question:${context}
Answer: `;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userQuery,
      },
    ],
    model: "openai/gpt-oss-20b",
  });

  return chatCompletion.choices[0]?.message?.content || "I apologize, but I could not generate a response.";
}

/**
 * Terminal CLI chatbot interface.
 */
export async function chat() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    while (true) {
      let question;
      try {
        question = await rl.question("You: ");
      } catch {
        break;
      }
      if (question === null || question === undefined || question.trim() === "/bye") {
        break;
      }
      if (!question.trim()) {
        continue;
      }
      const reply = await handleChat(question);
      console.log(`Assistant: ${reply}\n`);
    }
  } finally {
    rl.close();
  }
}

// Only auto-run terminal CLI if this file is executed directly (not when imported)
const isDirectlyExecuted =
  Boolean(typeof Bun !== "undefined" && import.meta.main) ||
  (Boolean(process.argv[1]) && fileURLToPath(import.meta.url) === process.argv[1]);

if (isDirectlyExecuted) {
  chat();
}
