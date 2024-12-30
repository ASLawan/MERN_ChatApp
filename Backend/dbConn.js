import mongoose, { connect } from "mongoose";

const connString =
  process.env.MONGO_URI ||
  "mongodb+srv://Austin:nitsuA@cluster0.ik96d.mongodb.net/chat_app";

// console.log("Connection string:", process.env.MONGO_URI);
mongoose.connect(connString);

export const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected successfully to MongoDB");
});

db.on("error", () => {
  console.log("Failed to connect to MongoDB");
});
