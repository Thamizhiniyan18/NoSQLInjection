import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleWare.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  console.log("Environment: Production");
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  console.log("Environment: Development");
  app.get("*", (req, res) =>
    res.sendFile("/", (req, res) => res.send("Server is UP!!!"))
  );
}

// Error MiddleWares
app.use(notFound);
app.use(errorHandler);
// Error MiddleWares

const appSERVER = app.listen(port, () =>
  console.log("Listening on port " + port)
);

async function closeGracefully(signal) {
  console.log(`*^!@4=> Received signal to terminate: ${signal}`);

  // await fastify.close();
  await appSERVER.close(() => console.log("HTTP server closed"));
  // await db.close() if we have a db connection in this app
  // await other things we should cleanup nicely
  process.kill(process.pid, signal);
}
process.once("SIGINT", closeGracefully);
process.once("SIGTERM", closeGracefully);
