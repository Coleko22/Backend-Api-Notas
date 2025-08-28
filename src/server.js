const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: "*" // 👈 Podés restringir a "https://tu-app.vercel.app"
}));
app.use(express.json());

app.get("/api/notes", (req, res) => {
  res.json([{ id: 1, title: "Ejemplo", content: "Hola Render" }]);
});

// Tu lógica de rutas POST, PUT, DELETE...

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});