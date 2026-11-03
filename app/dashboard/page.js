
import { Suspense } from "react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

// Verify login session
async function DashboardContent() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  // Redirect if not logged in
  if (!token || !process.env.JWT_SECRET) {
    redirect("/login");
  }

  let user;

  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET
    );

    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    user = {
      fullname: String(payload.fullname || "User"),
      email: String(payload.email || ""),
    };
  } catch {
    redirect("/login");
  }

  return (
    <div style={styles.card}>
      <h1>Welcome to Dashboard! 🎉</h1>

      <p style={styles.message}>
        You have successfully logged in.
      </p>

      <p>
        <strong>Name:</strong> {user.fullname}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <div style={{ marginTop: 30 }}>
        <LogoutButton />
      </div>
    </div>
  );
}

// Dashboard page
export default function DashboardPage() {
  return (
    <main style={styles.main}>
      <Suspense
        fallback={
          <div style={styles.card}>
            <h2>Loading dashboard...</h2>
            <p>Checking your login session.</p>
          </div>
        }
      >
        <DashboardContent />
      </Suspense>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#ffffff",
    padding: 40,
  },

  card: {
    maxWidth: 700,
    margin: "70px auto",
    background: "#1e293b",
    padding: 35,
    borderRadius: 16,
  },

  message: {
    marginTop: 20,
    marginBottom: 20,
    color: "#cbd5e1",
  },
};
