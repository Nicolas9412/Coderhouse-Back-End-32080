import { Application, config } from "./deps.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { router } from "./routes/index.ts";
import { logger } from "./middleware/logger.ts";
const { PORT } = config();
const app = new Application();
app.use(oakCors({ origin: "*" }));
app.use(logger);
app.use(router.routes());

console.log(`Server up on port ${PORT}`);

await app.listen({ port: Number(PORT) });
