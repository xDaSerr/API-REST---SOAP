import { conn } from "../../db.js";

export const ping = async (req, res) => {
  try {
    const [result] = await conn.query("SELECT 1 + 1 AS result");
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error en la conexión con la base de datos",
      error: error.message
    });
  }
};