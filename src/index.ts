import express from "express";

const app = express();
const PORT = 3000;

//MIDDLEWARE
app.use(express.json());

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];

app.get("/api/estudiantes", (req, res) => {
  return res.status(200).json({
    ok: true,
    mensaje: `Lista de estudiantes`,
    data: estudiantes,
  });
});

app.post("/api/estudiantes", (req, res) => {
  const { nombre, email, bootcamp } = req.body;
  if (!email || email.trim() === "") {
    return res.status(400).json({
      ok: false,
      mensaje: `Hace falta el email del estudiante.`,
    });
  }

  let newEstudiante: Estudiante = {
    id: estudiantes.length > 0 ? Math.max(...estudiantes.map((e) => e.id)) + 1 : 1,
    nombre,
    email,
    bootcamp,
  };

  estudiantes.push(newEstudiante);
  res.status(201).json({
    ok: true,
    mensaje: `Se ha creado el estudiante exitosamente.`,
    estudiante: newEstudiante,
  });
});

app.put("/api/estudiantes/:id", (req, res) => {
  const { nombre, email, bootcamp } = req.body;
  const findingId = Number(req.params.id);
  const foundEstudiante = estudiantes.findIndex((e) => e.id === findingId);

  if (foundEstudiante === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `Estudiante con ID: ${findingId} no encontrado.`,
    });
  }

  ((estudiantes[foundEstudiante].nombre = nombre),
    (estudiantes[foundEstudiante].email = email),
    (estudiantes[foundEstudiante].bootcamp = bootcamp));

  res.status(200).json({
    ok: true,
    mensaje: `Estudiante de ID: ${findingId} actualizado con exito.`,
    estudiante: estudiantes[foundEstudiante],
  });
});

app.delete("/api/estudiantes/:id", (req, res) => {
  const findingId = Number(req.params.id);
  const foundEstudiante = estudiantes.findIndex((e) => e.id === findingId);

  if (foundEstudiante === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `Estudiante con ID: ${findingId} no encontrado.`,
    });
  }

  estudiantes.splice(foundEstudiante, 1);

  res.status(200).json({
    ok: true,
    mensaje: `Estudiante de ID: ${findingId} eliminado con exito.`,
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "Servidor en línea",
    version: "1.0.0",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
