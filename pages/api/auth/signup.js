import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "./auth";

async function handler(req, res) {
  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    !password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const hashedPassword = hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: password,
  });

  res.status(201).json({ message: "Created user!" });
}

export default handler;
