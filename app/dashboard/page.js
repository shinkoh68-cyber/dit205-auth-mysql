
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

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
      fullname: payload.fullname,
      email: payload.email,
    };
  } catch {
    redirect("/login");
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      padding: 40
    }}>
      <div style={{
        maxWidth: 700,
        margin: "70px auto",
        background: "#1e293b",
        padding: 35,
        borderRadius: 16
      }}>
        <h1>Welcome to Dashboard! 🎉</h1>

        <p style={{ marginTop: 20 }}>
          You have successfully logged in.
        </p>

        <p><strong>Name:</strong> {user.fullname}</p>
        <p><strong>Email:</strong> {user.email}</p>

        <div style={{ marginTop: 30 }}>
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
