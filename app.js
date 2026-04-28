import express from "express";
import indexRoutes from "./src/routes/index.routes.js";
import videojuegosRoutes from "./src/routes/videojuegos.routes.js";

const app = express();

app.use(express.json());

app.use("/api", indexRoutes);
app.use("/api", videojuegosRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint no encontrado"
  });
});

export default app;