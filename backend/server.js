import http from "node:http";
import { handleChat } from "./chat.js";

const PORT = Number(process.env.PORT) || 5000;

// Check if running under Bun
if (typeof Bun !== "undefined" && Bun.serve) {
  Bun.serve({
    port: PORT,
    async fetch(req) {
      const url = new URL(req.url);

      // CORS Preflight
      if (req.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
          },
        });
      }

      // Health / root check
      if (url.pathname === "/" || url.pathname === "/health" || url.pathname === "/api/health") {
        return Response.json(
          { status: "ok", service: "CloudNexis AI Backend", port: PORT },
          { headers: { "Access-Control-Allow-Origin": "*" } }
        );
      }

      // Chat endpoint: /api/chat or /chat
      if ((url.pathname === "/api/chat" || url.pathname === "/chat") && req.method === "POST") {
        try {
          const body = await req.json();
          const question = (body.message || body.question || "").trim();

          if (!question) {
            return Response.json(
              { error: "Message or question is required" },
              { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
            );
          }

          console.log(`[CloudNexis Backend] Received question: "${question}"`);
          const reply = await handleChat(question);
          console.log(`[CloudNexis Backend] Sending response (${reply.length} chars)`);

          return Response.json(
            {
              message: reply,
              answer: reply,
              response: reply,
            },
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
              },
            }
          );
        } catch (err) {
          console.error("[CloudNexis Backend] Error processing chat:", err);
          return Response.json(
            { error: err.message || "Failed to process chat query" },
            { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
          );
        }
      }

      return new Response("Not Found", {
        status: 404,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    },
  });

  console.log(`CloudNexis AI Backend running on http://localhost:${PORT} via Bun`);
} else {
  // Node.js fallback
  const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

    if (url.pathname === "/" || url.pathname === "/health" || url.pathname === "/api/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", service: "CloudNexis AI Backend", port: PORT }));
      return;
    }

    if ((url.pathname === "/api/chat" || url.pathname === "/chat") && req.method === "POST") {
      let bodyData = "";
      req.on("data", (chunk) => {
        bodyData += chunk;
      });

      req.on("end", async () => {
        try {
          const body = JSON.parse(bodyData || "{}");
          const question = (body.message || body.question || "").trim();

          if (!question) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Message or question is required" }));
            return;
          }

          console.log(`[CloudNexis Backend] Received question: "${question}"`);
          const reply = await handleChat(question);
          console.log(`[CloudNexis Backend] Sending response (${reply.length} chars)`);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: reply, answer: reply, response: reply }));
        } catch (err) {
          console.error("[CloudNexis Backend] Error processing chat:", err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: err.message || "Failed to process chat query" }));
        }
      });
      return;
    }

    res.writeHead(404);
    res.end("Not Found");
  });

  server.listen(PORT, () => {
    console.log(`CloudNexis AI Backend running on http://localhost:${PORT} via Node`);
  });
}
