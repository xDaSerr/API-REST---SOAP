import { conn } from "../../db.js";

export const getVideojuegos = async (req, res) => {
  try {
    const [rows] = await conn.query("SELECT * FROM videojuego");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los videojuegos",
      error: error.message
    });
  }
};

export const getVideojuego = async (req, res) => {
  try {
    const [rows] = await conn.query(
      "SELECT * FROM videojuego WHERE id = ?",
      [req.params.id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({
        message: "Videojuego no encontrado"
      });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el videojuego",
      error: error.message
    });
  }
};

export const postVideojuego = async (req, res) => {
  try {
    const { titulo, genero, plataforma, precio } = req.body;

    const [result] = await conn.query(
      "INSERT INTO videojuego(titulo, genero, plataforma, precio) VALUES (?, ?, ?, ?)",
      [titulo, genero, plataforma, precio]
    );

    res.json({
      id: result.insertId,
      titulo,
      genero,
      plataforma,
      precio
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el videojuego",
      error: error.message
    });
  }
};

export const putVideojuego = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, genero, plataforma, precio } = req.body;

    const [result] = await conn.query(
      `UPDATE videojuego
       SET titulo = IFNULL(?, titulo),
           genero = IFNULL(?, genero),
           plataforma = IFNULL(?, plataforma),
           precio = IFNULL(?, precio)
       WHERE id = ?`,
      [titulo, genero, plataforma, precio, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Videojuego no encontrado"
      });
    }

    const [rows] = await conn.query(
      "SELECT * FROM videojuego WHERE id = ?",
      [id]
    );

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el videojuego",
      error: error.message
    });
  }
};

export const deleteVideojuego = async (req, res) => {
  try {
    const [result] = await conn.query(
      "DELETE FROM videojuego WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Videojuego no encontrado"
      });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el videojuego",
      error: error.message
    });
  }
};