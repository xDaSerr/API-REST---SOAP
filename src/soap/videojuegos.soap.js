import { conn } from "../../db.js";

export const videojuegosService = {
  VideojuegosService: {
    VideojuegosPort: {

      async GetVideojuegos() {
        try {
          const [rows] = await conn.query("SELECT * FROM videojuego");
          return {
            videojuegos: JSON.stringify(rows)
          };
        } catch (error) {
          return {
            videojuegos: JSON.stringify({
              error: "Error al obtener videojuegos",
              detalle: error.message
            })
          };
        }
      },

      async GetVideojuegoById(args) {
        try {
          const [rows] = await conn.query(
            "SELECT * FROM videojuego WHERE id = ?",
            [args.id]
          );

          return {
            videojuego: JSON.stringify(rows[0] || null)
          };
        } catch (error) {
          return {
            videojuego: JSON.stringify({
              error: "Error al obtener videojuego",
              detalle: error.message
            })
          };
        }
      },

      async CreateVideojuego(args) {
        try {
          const { titulo, genero, plataforma, precio } = args;

          const [result] = await conn.query(
            "INSERT INTO videojuego (titulo, genero, plataforma, precio) VALUES (?, ?, ?, ?)",
            [titulo, genero, plataforma, precio]
          );

          return {
            mensaje: `Videojuego creado correctamente con id ${result.insertId}`
          };
        } catch (error) {
          return {
            mensaje: `Error al crear videojuego: ${error.message}`
          };
        }
      },

      async UpdateVideojuego(args) {
  const { id, titulo, genero, plataforma, precio } = args;

  const [result] = await conn.query(
    `UPDATE videojuego
     SET titulo = IFNULL(?, titulo),
         genero = IFNULL(?, genero),
         plataforma = IFNULL(?, plataforma),
         precio = IFNULL(?, precio)
     WHERE id = ?`,
    [titulo, genero, plataforma, precio, id]
  );

  return { mensaje: "Videojuego actualizado" };
},

async DeleteVideojuego(args) {
  const [result] = await conn.query(
    "DELETE FROM videojuego WHERE id = ?",
    [args.id]
  );

  return { mensaje: "Videojuego eliminado" };
}

    }
  }
};