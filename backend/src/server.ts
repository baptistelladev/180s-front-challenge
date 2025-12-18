import { app } from "./app";
import { serve } from "@hono/node-server";

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

serve({ fetch: app.fetch, port: PORT });
// eslint-disable-next-line no-console
console.log(`[server] API iniciada em http://localhost:${PORT}`);
