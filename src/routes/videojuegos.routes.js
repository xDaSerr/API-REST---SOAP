import { Router } from "express";
import {
  getVideojuegos,
  getVideojuego,
  postVideojuego,
  putVideojuego,
  deleteVideojuego
} from "../controllers/videojuegos.controllers.js";

const router = Router();

router.get("/videojuegos", getVideojuegos);
router.get("/videojuegos/:id", getVideojuego);
router.post("/videojuegos", postVideojuego);
router.put("/videojuegos/:id", putVideojuego);
router.patch("/videojuegos/:id", putVideojuego);
router.delete("/videojuegos/:id", deleteVideojuego);

export default router;