

import { Server } from "http";
import app from "./app";
import { envVars } from "./app/config/env";
import mongoose from "mongoose";
let server: Server;

const startServer = async () => {
  try {
   await mongoose.connect(envVars.DATABASE_URL)
    console.log("✅ Connected to the database!");

    server = app.listen(envVars.PORT, () => {
      console.log(`🚀 Server is running on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.error("❌ Error while starting the server:", error);
    process.exit(1);
  }
};

(async () => {
  await startServer();
})();

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  console.log(`${signal} signal received. Shutting down gracefully...`);

  if (server) {
    server.close(() => {
      console.log("🛑 Server closed.");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// Signal and error handlers
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  gracefulShutdown("unhandledRejection");
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  gracefulShutdown("uncaughtException");
});
