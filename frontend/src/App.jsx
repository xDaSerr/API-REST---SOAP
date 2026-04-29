import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./App.css";

const API = "http://localhost:3000/api/videojuegos";

function App() {
  const [videojuegos, setVideojuegos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    precio: ""
  });

const RAWG_KEY = "438865eb4fc04e1e878716ba307cf235";

const cargarVideojuegos = async () => {
  const res = await axios.get(API);

  const juegosConImagen = await Promise.all(
    res.data.map(async (juego) => {
      try {
        const rawg = await axios.get("https://api.rawg.io/api/games", {
          params: {
            key: RAWG_KEY,
            search: juego.titulo,
            page_size: 1
          }
        });

        const resultado = rawg.data.results?.[0];

        console.log("Juego:", juego.titulo);
        console.log("Imagen RAWG:", resultado?.background_image);

        return {
          ...juego,
          imagen: resultado?.background_image || null
        };
      } catch (error) {
        console.error("Error RAWG:", error);

        return {
          ...juego,
          imagen: null
        };
      }
    })
  );

  setVideojuegos(juegosConImagen);
};

  useEffect(() => {
    cargarVideojuegos();
  }, []);

  const guardarVideojuego = async (e) => {
    e.preventDefault();

    const data = {
      titulo: form.titulo,
      genero: form.genero,
      plataforma: form.plataforma,
      precio: Number(form.precio)
    };

    if (editandoId) {
      await axios.put(`${API}/${editandoId}`, data);
      setEditandoId(null);
    } else {
      await axios.post(API, data);
    }

    setForm({
      titulo: "",
      genero: "",
      plataforma: "",
      precio: ""
    });

    cargarVideojuegos();
  };

  const editarVideojuego = (juego) => {
    setEditandoId(juego.id);

    setForm({
      titulo: juego.titulo,
      genero: juego.genero,
      plataforma: juego.plataforma,
      precio: juego.precio
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);

    setForm({
      titulo: "",
      genero: "",
      plataforma: "",
      precio: ""
    });
  };

  const eliminarVideojuego = async (id) => {
    await axios.delete(`${API}/${id}`);
    cargarVideojuegos();
  };

  return (
    <main className="app">
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          GameVault
        </motion.h1>

    
      </section>

      <section className="panel">
        <form className="form" onSubmit={guardarVideojuego}>
          <input
            placeholder="Título del videojuego"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          />

          <input
            placeholder="Género"
            value={form.genero}
            onChange={(e) => setForm({ ...form, genero: e.target.value })}
          />

          <input
            placeholder="Plataforma"
            value={form.plataforma}
            onChange={(e) => setForm({ ...form, plataforma: e.target.value })}
          />

          <input
            placeholder="Precio"
            type="number"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
          />

          <button type="submit">
            {editandoId ? "Guardar cambios" : "Agregar juego"}
          </button>

          {editandoId && (
            <button type="button" className="cancelar" onClick={cancelarEdicion}>
              Cancelar
            </button>
          )}
        </form>
      </section>

      <section className="grid">
  {videojuegos.map((juego, index) => (
    <motion.div
      className="card"
      key={juego.id}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="card-glow"></div>

      {/* 🔥 IMAGEN AUTOMÁTICA */}
    <div className="imagen-contenedor">
  <img
    className="imagen"
    src={
      juego.imagen ||
      `https://placehold.co/400x300/111827/ffffff?text=${encodeURIComponent(juego.titulo)}`
    }
    alt={juego.titulo}
  />
</div>


      <h2>{juego.titulo}</h2>
      <span>{juego.genero}</span>

      <p>Plataforma: {juego.plataforma}</p>
      <strong>${Number(juego.precio).toFixed(2)}</strong>

      <div className="acciones">
        <button className="editar" onClick={() => editarVideojuego(juego)}>
          Editar
        </button>

        <button
          className="delete"
          onClick={() => eliminarVideojuego(juego.id)}
        >
          Eliminar
        </button>
      </div>
    </motion.div>
  ))}
</section>
    </main>
  );
}

export default App;