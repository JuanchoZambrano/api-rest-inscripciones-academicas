import { Router } from "express";
import { Estudiante, estudiantes } from "../data/estudiantes";

const router = Router();

// las rutas van aquí
router.get("/", (req, res) => {

  // #swagger.description = "Filtro de bootcamp aplicado. Obtiene la lista completa de estudiantes si no se le pasa filtro de Bootcamp."

  const requestBootcamp = req.query.bootcamp;

  if (requestBootcamp) {
    const filterBootcamp = estudiantes.filter(
      (e) => String(e.bootcamp).toLowerCase() === String(requestBootcamp).toLowerCase(),
    );
    return res.status(200).json({
      ok: true,
      mensaje: `Filtro de Bootcamps`,
      data: filterBootcamp,
    });
  }
  return res.status(200).json({
    ok: true,
    mensaje: `Lista de estudiantes`,
    data: estudiantes,
  });
}); // Filtro de Bootcamp y lista general

router.get("/:id", (req, res) => {

  // #swagger.description = "Encuentra a estudiante por medio del filtro de ID."

  const requestedId = Number(req.params.id);
  const findingEstudiante = estudiantes.find((e) => e.id === requestedId);

  if (!findingEstudiante) {
    return res.status(404).json({
      ok: false,
      mensaje: `No es encontró un alumno de ID: ${requestedId}`,
    });
  }

  return res.status(200).json({
    ok: true,
    data: findingEstudiante,
  });
}); // Encontrar est. por ID

router.post("/", (req, res) => {

  // #swagger.description = "Agrega un estudiante con toda su informacion al final de la lista."

  const { nombre, email, bootcamp } = req.body;
  if (!email || email.trim() === "") {
    return res.status(400).json({
      ok: false,
      mensaje: `Hace falta el email del estudiante.`,
    });
  }

  let newEstudiante: Estudiante = {
    id:
      estudiantes.length > 0
        ? Math.max(...estudiantes.map((e) => e.id)) + 1
        : 1,
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
}); // Nuevo est.

router.put("/:id", (req, res) => {

  // #swagger.description = "Se modifica la informacion de un estudiante filtrado por su ID."

  const { nombre, email, bootcamp } = req.body;
  const findingId = Number(req.params.id);
  const foundEstudiante = estudiantes.findIndex((e) => e.id === findingId);

  if (foundEstudiante === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `Estudiante con ID: ${findingId} no encontrado.`,
    });
  }

  if (nombre) estudiantes[foundEstudiante].nombre = nombre;
  if (email) estudiantes[foundEstudiante].email = email;
  if (bootcamp) estudiantes[foundEstudiante].bootcamp = bootcamp;

  res.status(200).json({
    ok: true,
    mensaje: `Estudiante de ID: ${findingId} actualizado con exito.`,
    estudiante: estudiantes[foundEstudiante],
  });
}); // Modificar est. por ID

router.delete("/:id", (req, res) => {

  // #swagger.description = "Se elimina un estudiante por medio del filtro de su ID."

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
}); // Eliminar est por ID

export default router;
