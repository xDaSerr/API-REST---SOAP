import http from "http";
import fs from "fs";
import soap from "soap";
import app from "./app.js";
import { PORT } from "./config.js";
import { videojuegosService } from "./src/soap/videojuegos.soap.js";

const server = http.createServer(app);

const wsdlXml = fs.readFileSync("./src/soap/videojuegos.wsdl", "utf8");

soap.listen(server, "/wsdl", videojuegosService, wsdlXml);

server.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
  console.log(`REST disponible en http://localhost:${PORT}/api`);
  console.log(`SOAP disponible en http://localhost:${PORT}/wsdl?wsdl`);
});