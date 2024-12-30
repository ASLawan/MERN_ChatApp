import { app } from "./app.js";
import dotenv from "dotenv";
import { db } from "./dbConn.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  console.log(`Server running on ${HOST}: ${PORT}`);
});