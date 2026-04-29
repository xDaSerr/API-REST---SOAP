import soap from "soap";

const url = "http://localhost:3000/wsdl?wsdl";

export const getVideojuegos = async (req, res) => {
  try {
    const client = await soap.createClientAsync(url);

    const [result] = await client.GetVideojuegosAsync({});

    const data = JSON.parse(result.videojuegos);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener videojuegos desde SOAP",
      error: error.message
    });
  }
};

export const getVideojuego = async (req, res) => {
  try {
    const client = await soap.createClientAsync(url);

    const [result] = await client.GetVideojuegoByIdAsync({
      id: req.params.id
    });

    const data = JSON.parse(result.videojuego);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener videojuego desde SOAP",
      error: error.message
    });
  }
};

export const postVideojuego = async (req, res) => {
  try {
    const client = await soap.createClientAsync(url);

    const { titulo, genero, plataforma, precio } = req.body;

    const [result] = await client.CreateVideojuegoAsync({
      titulo,
      genero,
      plataforma,
      precio
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear videojuego con SOAP",
      error: error.message
    });
  }
};

export const putVideojuego = async (req, res) => {
  try {
    const client = await soap.createClientAsync(url);

    const { id } = req.params;
    const { titulo, genero, plataforma, precio } = req.body;

    const [result] = await client.UpdateVideojuegoAsync({
      id,
      titulo,
      genero,
      plataforma,
      precio
    });

    res.json(result);

  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar videojuego con SOAP",
      error: error.message
    });
  }
};

export const deleteVideojuego = async (req, res) => {
  try {
    const client = await soap.createClientAsync(url);

    const { id } = req.params;

    const [result] = await client.DeleteVideojuegoAsync({ id });

    res.json(result);

  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar videojuego con SOAP",
      error: error.message
    });
  }
};