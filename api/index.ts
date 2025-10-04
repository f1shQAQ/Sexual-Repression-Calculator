import { Hono } from "hono";
import { handle } from "@hono/node-server/vercel";
import { setupRoutes } from "../src/server/routes";

const app = new Hono().basePath("/api");

setupRoutes(app);

export default handle(app);

