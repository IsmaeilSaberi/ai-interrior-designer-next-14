import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./config/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://content%20generator%20saas_owner:3aeV1tzpIgDs@ep-orange-sea-a2qqwsws.eu-central-1.aws.neon.tech/ai-interrior-designer?sslmode=require",
  },
});
