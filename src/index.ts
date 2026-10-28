import express from "express";
import estudiantesRouter from './routes/estudiantes';

const app = express();
const PORT = 3000;

//MIDDLEWARE
app.use(express.json());

app.use('/api/estudiantes',estudiantesRouter);

app.get("/api/status", (req, res) => {
  res.json({
    status: "Servidor en línea",
    version: "1.0.0",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
