import express from "express";
import estudiantesRouter from './routes/estudiantes';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT ?? 3000;

//MIDDLEWARE
app.use(cors());

app.use(express.json());

app.use('/api/students', estudiantesRouter);

app.get("/api/status", (req, res) => {
  res.json({
    status: "Servidor en línea",
    version: "1.0.0",
  });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
