import app from "./src/app.js";
import { connectDB } from "./src/db.js";
import { PORT } from "./src/config.js";

connectDB();
app.listen(PORT);
console.log("Server on port", PORT);