
import pool from "../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { fullname, email, password } = await request.json();

    if (
      typeof fullname !== "string" ||
      !fullname.trim() ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof password !== "string" ||
      password.length < 8
    ) {
      return Response.json(
        { error: "Enter a valid name, email and password (8+ characters)." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [normalizedEmail]
    );

    if (existing.length > 0) {
      return Response.json(
        { error: "This email is already registered." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await pool.query(
      "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
      [fullname.trim(), normalizedEmail, hashedPassword]
    );

    return Response.json(
      {
        message: "Registration successful!",
        userId: result.insertId
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return Response.json(
        { error: "This email is already registered." },
        { status: 409 }
      );
    }

    return Response.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
