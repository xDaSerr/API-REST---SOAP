import { Router } from "express";
import { ping } from "../controllers/index.controllers.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "API de videojuegos funcionando correctamente"
  });
});

router.get("/ping", ping);

export default router;