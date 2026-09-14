/**
 * CloudNexis AI Chatbot API Client
 *
 * Directs traffic through Vite dev server proxy to prevent CORS issues:
 * Development: /api/chat -> Vite proxy -> http://localhost:5000/api/chat
 * Production:  https://api.cloudnexis.in/api/chat
 * Override:    VITE_CHAT_API_URL or derived VITE_API_URL
 */

export function resolveChatEndpoint() {
  if (import.meta.env.VITE_CHAT_API_URL) {
    return import.meta.env.VITE_CHAT_API_URL;
  }

  if (import.meta.env.VITE_API_URL) {
    const clean = import.meta.env.VITE_API_URL.endsWith('/')
      ? import.meta.env.VITE_API_URL.slice(0, -1)
      : import.meta.env.VITE_API_URL;
    const rootApi = clean.replace(/\/admin\/?$/, '');
    return `${rootApi}/chat`;
  }

  // Development uses Vite proxy '/api/chat' to avoid CORS
  if (import.meta.env.DEV) {
    return "/api/chat";
  }

  return "https://api.cloudnexis.in/api/chat";
}

// Retrieve or generate a persistent thread ID for conversation memory
export function getOrCreateThreadId() {
  const STORAGE_KEY = "cloudnexis_chat_thread_id";
  try {
    let threadId = sessionStorage.getItem(STORAGE_KEY);
    if (!threadId) {
      threadId = "cnx_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 8);
      sessionStorage.setItem(STORAGE_KEY, threadId);
    }
    return threadId;
  } catch {
    return "cnx_" + Date.now().toString(36);
  }
}

/**
 * Sends a message to the CloudNexis AI backend.
 *
 * @param {string} userMessage - The message text entered by the user
 * @param {string} [threadId] - Session thread ID
 * @returns {Promise<string>} The assistant's response text
 */
export async function sendMessageToAI(userMessage, threadId = getOrCreateThreadId()) {
  const trimmed = userMessage?.trim();
  if (!trimmed) {
    throw new Error("Message cannot be empty.");
  }

  const endpoint = resolveChatEndpoint();
  const payload = {
    message: trimmed,
    question: trimmed,
    threadId,
  };

  if (import.meta.env.DEV) {
    console.log("[CloudNexis AI] Sending message:", {
      endpoint,
      method: "POST",
      payload,
    });
  }

  let response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (fetchErr) {
    console.error("[CloudNexis AI] Network/Fetch failure:", {
      endpoint,
      error: fetchErr.message,
      name: fetchErr.name,
      cause: fetchErr.cause,
    });
    throw new Error(
      `Network error connecting to ${endpoint}: ${fetchErr.message}. Ensure backend is active.`,
      { cause: fetchErr }
    );
  }

  // Handle non-2xx responses
  if (!response.ok) {
    let errorBody;
    try {
      errorBody = await response.json();
    } catch {
      try {
        errorBody = await response.text();
      } catch {
        errorBody = null;
      }
    }

    console.error("[CloudNexis AI] HTTP Error response:", {
      endpoint,
      status: response.status,
      statusText: response.statusText,
      body: errorBody,
    });

    if (response.status === 502) {
      throw new Error(
        "502 Bad Gateway: Vite proxy could not reach backend at http://localhost:5000. Please start the backend server on port 5000."
      );
    }

    if (response.status === 404) {
      throw new Error(
        `404 Not Found: Endpoint ${endpoint} was not found on the server.`
      );
    }

    const serverMsg =
      (typeof errorBody === "object" ? errorBody?.message || errorBody?.error : errorBody) ||
      `Server returned ${response.status} ${response.statusText}`;
    throw new Error(serverMsg);
  }

  // Parse JSON response
  let data;
  try {
    data = await response.json();
  } catch (jsonErr) {
    console.error("[CloudNexis AI] JSON parse error:", jsonErr);
    throw new Error("Backend response could not be parsed as JSON.", { cause: jsonErr });
  }

  if (import.meta.env.DEV) {
    console.log("[CloudNexis AI] Received response:", data);
  }

  const reply =
    data?.message ||
    data?.answer ||
    data?.response ||
    data?.reply ||
    data?.content ||
    data?.text ||
    data?.data?.message ||
    (typeof data === "string" ? data : null);

  if (reply) {
    return reply;
  }

  throw new Error("Received empty or unrecognized response format from backend.");
}
