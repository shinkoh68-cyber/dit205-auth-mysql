
import Link from "next/link";

export default function Home() {
  return (
    <main className="home-page">
      <nav className="home-nav">
        <div className="logo">
          <span className="logo-icon">✦</span>
          DIT205<span>Cloud</span>
        </div>

        <div className="nav-links">
          <Link href="/login">Login</Link>
          <Link href="/register" className="nav-register">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="home-hero">
        <div className="hero-badge">
          ✦ DIT205 • ASSIGNMENT 07
        </div>

        <h1>
          Welcome to My
          <br />
          <span>Digital World.</span>
        </h1>

        <p className="hero-description">
          A modern authentication web application
          powered by Next.js, MySQL, TiDB Cloud,
          and Vercel.
        </p>

        <div className="student-card">
          <div className="student-avatar">
            SK
          </div>

          <span className="student-label">
            DEVELOPED BY
          </span>

          <h2>Shin Ko Htut</h2>

          <p className="student-id">
            Student ID: 6807866
          </p>

          <p className="student-course">
            Digital Innovation Technology
            <br />
            Rangsit University
          </p>
        </div>

        <div className="hero-buttons">
          <Link href="/register" className="home-primary">
            Create Account →
          </Link>

          <Link href="/login" className="home-secondary">
            Sign In
          </Link>
        </div>
      </section>

      <section className="features-section">
        <div className="feature-heading">
          <span>PROJECT FEATURES</span>
          <h2>Built with Modern Technology</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Secure Authentication</h3>
            <p>
              User registration, encrypted passwords,
              JWT login sessions, and protected pages.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🗄️</div>
            <h3>Cloud Database</h3>
            <p>
              MySQL-compatible database hosted
              on TiDB Cloud.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Cloud Deployment</h3>
            <p>
              Next.js application deployed online
              using GitHub and Vercel.
            </p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>
          © 2026 Shin Ko Htut · 6807866
        </p>
        <p>
          DIT205 – Web Deploy on Cloud
        </p>
      </footer>
    </main>
  );
}
