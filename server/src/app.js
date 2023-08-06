import express from "express";
import cors from "cors";
import morgan from "morgan"; // Con esto vigilamos las peticiones que llegan al servidor
import cookieParser from "cookie-parser"; // Para poder leer las cookies
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import becasRoutes from "./routes/becas.routes.js"
import { FRONTEND_URL } from "./config.js";

const app = express();
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
})); // Esto me permite comunicar
// Morgan dev para que nos muestre las peticiones
app.use(morgan('dev'));
// Midleware para convertir request bady en JSON
app.use(express.json());
app.use(cookieParser());
app.use('/api',authRoutes);
app.use('/api', taskRoutes);
app.use('/api', becasRoutes);
app.use('/', (req, res) => {
  res.json("Hello World! from vercel");
});
export default app;
