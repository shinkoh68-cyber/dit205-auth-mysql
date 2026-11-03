
"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setMessage("Account created successfully! You can now log in.");
      setForm({ fullname: "", email: "", password: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      background: "#0f172a",
      padding: 20
    }}>
      <form onSubmit={handleRegister} style={{
        width: "100%",
        maxWidth: 420,
        padding: 32,
        background: "#1e293b",
        color: "white",
        borderRadius: 16
      }}>
        <h1 style={{ marginBottom: 10 }}>Create Account</h1>
        <p style={{ color: "#cbd5e1", marginBottom: 24 }}>
          DIT205 MySQL Authentication
        </p>

        <label htmlFor="fullname">Full Name</label>
        <input
          id="fullname"
          required
          value={form.fullname}
          onChange={(e) =>
            setForm({ ...form, fullname: e.target.value })
          }
          placeholder="Your full name"
          style={inputStyle}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          placeholder="you@example.com"
          style={inputStyle}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          minLength={8}
          required
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          placeholder="At least 8 characters"
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 13,
            border: 0,
            borderRadius: 8,
            background: "#8b5cf6",
            color: "white",
            cursor: "pointer",
            marginTop: 12
          }}
        >
          {loading ? "Creating..." : "Register"}
        </button>

        {message && (
          <p role="status" style={{ color: "#86efac", marginTop: 16 }}>
            {message}
          </p>
        )}

        {error && (
          <p role="alert" style={{ color: "#fca5a5", marginTop: 16 }}>
            {error}
          </p>
        )}

        <p style={{ marginTop: 20, color: "#cbd5e1" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#c4b5fd" }}>
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: 12,
  marginTop: 8,
  marginBottom: 18,
  background: "#0f172a",
  color: "white",
  border: "1px solid #475569",
  borderRadius: 8
};
