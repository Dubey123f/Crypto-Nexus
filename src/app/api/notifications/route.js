import { Server } from "ws";

let wss; // Store WebSocket server

export async function GET(req) {
  if (!wss) {
    wss = new Server({ noServer: true });

    // WebSocket connection handler
    wss.on("connection", (ws) => {
      console.log("Client connected to WebSocket");

      // Send random crypto prices every 5 seconds
      setInterval(() => {
        const data = {
          type: "price_alert",
          bitcoin: { usd: Math.random() * 50000 + 20000 },
          ethereum: { usd: Math.random() * 4000 + 1000 },
        };
        ws.send(JSON.stringify(data));
      }, 5000);
    });

    console.log("WebSocket server initialized.");
  }

  return new Response("WebSocket server running.");
}

