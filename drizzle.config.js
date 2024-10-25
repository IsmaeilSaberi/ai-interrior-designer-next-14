import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./config/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "",
  },
});
