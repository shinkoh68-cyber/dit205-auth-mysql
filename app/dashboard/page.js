
import { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

async function DashboardContent() {
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
      fullname: String(payload.fullname || "User"),
      email: String(payload.email || ""),
    };
  } catch {
    redirect("/login");
  }

  const initials = user.fullname
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <span className="dashboard-label">
          YOUR PERSONAL DASHBOARD
        </span>

        <h1>
          Welcome back, <span>{user.fullname}!</span>
        </h1>

        <p>
          You have successfully signed in to your
          cloud account.
        </p>
      </div>

      <section className="dashboard-profile">
        <div className="dashboard-avatar">
          {initials}
        </div>

        <div className="dashboard-profile-info">
          <span>ACCOUNT INFORMATION</span>
          <h2>{user.fullname}</h2>
          <p>{user.email}</p>
          <div className="dashboard-status">
            <span className="status-dot" />
            Authenticated Session
          </div>
        </div>
      </section>

      <section className="dashboard-features">
        <div className="dashboard-feature">
          <div className="dashboard-feature-icon">🔐</div>
          <h3>Secure Login</h3>
          <p>
            Authentication protected by JWT and
            HTTP-only cookies.
          </p>
        </div>

        <div className="dashboard-feature">
          <div className="dashboard-feature-icon">🗄️</div>
          <h3>Cloud Database</h3>
          <p>
            Account information stored securely
            using TiDB Cloud.
          </p>
        </div>

        <div className="dashboard-feature">
          <div className="dashboard-feature-icon">🚀</div>
          <h3>Cloud Hosting</h3>
          <p>
            Application deployed to the web
            using Vercel.
          </p>
        </div>
      </section>

      <div className="dashboard-bottom">
        <div>
          <h3>Account Actions</h3>
          <p>Sign out when you finish your session.</p>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="dashboard-page">
      <nav className="dashboard-nav">
        <Link href="/" className="auth-logo">
          ✦ DIT205<span>Cloud</span>
        </Link>
        <span>Student Project · 6807866</span>
      </nav>

      <Suspense
        fallback={
          <div className="dashboard-container">
            <p>Checking your login session...</p>
          </div>
        }
      >
        <DashboardContent />
      </Suspense>

      <footer className="dashboard-footer">
        © 2026 Shin Ko Htut · DIT205 Assignment 07
      </footer>
    </main>
  );
}
