import { useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "./WorkPage";

gsap.registerPlugin(ScrollTrigger);

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const project = PROJECTS.find((p) => p.id === id);

  useEffect(() => {
    if (!project) return;
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(".detail-hero-content > *", { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", delay: 0.1,
      });
      // Content reveal
      gsap.fromTo(".detail-block", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
      });
    });
    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", background: "var(--bg)", gap: 20 }}>
        <h2 style={{ fontFamily: "var(--font-head)", fontSize: 32, color: "var(--white)" }}>Project not found</h2>
        <Link to="/work" className="btn btn-primary"><span>Back to Work</span></Link>
      </div>
    );
  }

  const nextProject = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];

  return (
    <div className="page" style={{ background: "var(--bg)", paddingTop: 80 }}>

      {/* ── BACK BUTTON ──────────────────────────────── */}
      <div style={{ padding: "20px var(--pad)" }}>
        <button
          onClick={() => navigate("/work")}
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)",
            borderRadius: 50, padding: "10px 20px", color: "var(--muted)", fontSize: 14, fontWeight: 500,
            cursor: "pointer", transition: "all 0.3s", fontFamily: "var(--font-body)",
          }}
          onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(168,85,247,0.4)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--white)"; }}
          onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Back to Work
        </button>
      </div>

      {/* ── HERO ─────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          padding: "40px var(--pad) 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Color orb from project */}
        <div
          className="orb"
          style={{
            width: 600, height: 600, top: -200, right: -200,
            background: `radial-gradient(circle, ${project.color}33, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />

        <div className="detail-hero-content" style={{ position: "relative", zIndex: 1, maxWidth: "80%" }}>
          {/* Meta row */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
            {project.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
          </div>

          <h1 className="text-hero" style={{ color: "var(--white)", marginBottom: 16 }}>
            {project.title}
          </h1>
          <p className="text-body" style={{ maxWidth: 600, fontSize: 18, marginBottom: 40, color: "rgba(240,238,255,0.7)" }}>
            {project.subtitle}
          </p>

          {/* Info cards */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 40 }}>
            {[
              { label: "Year", value: project.year },
              { label: "Role", value: project.role },
              { label: "Stack", value: project.tags.join(", ") },
            ].map((info) => (
              <div
                key={info.label}
                className="card"
                style={{ padding: "16px 24px", flex: "1 1 160px" }}
              >
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 6 }}>{info.label}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--white)" }}>{info.value}</div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <span>Live Demo</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              Source Code
            </a>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ───────────────────────────────── */}
      <div style={{ padding: "0 var(--pad)", marginBottom: 80 }}>
        <div style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", border: "1px solid var(--border)" }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: "100%", aspectRatio: "16/7", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>

      {/* ── CONTENT ──────────────────────────────────── */}
      <section ref={contentRef} style={{ padding: "0 var(--pad) 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 40, alignItems: "start" }}>

          {/* Main content — blog style */}
          <div>
            <div className="detail-block card" style={{ padding: "48px 52px", marginBottom: 24 }}>
              <div className="text-label" style={{ marginBottom: 16 }}>Overview</div>
              <p className="text-body" style={{ fontSize: 17, lineHeight: 1.8 }}>{project.description}</p>
            </div>

            <div className="detail-block card" style={{ padding: "48px 52px", marginBottom: 24 }}>
              <div className="text-label" style={{ marginBottom: 16 }}>The Challenge</div>
              <p className="text-body" style={{ fontSize: 16, lineHeight: 1.8 }}>
                The core challenge was creating an experience that felt alive — not just a static showcase,
                but something that immerses the visitor. This required careful orchestration of 3D rendering,
                smooth transitions, and performance optimization to maintain 60fps across all devices.
              </p>
            </div>

            <div className="detail-block card" style={{ padding: "48px 52px" }}>
              <div className="text-label" style={{ marginBottom: 24 }}>Key Features</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "Cinematic GSAP animations with ScrollTrigger and timeline sequences",
                  "Three.js 3D canvas with custom lighting and orbit controls",
                  "Glassmorphism UI with dynamic gradient borders",
                  "Multi-page routing with animated page transitions",
                  "Fully responsive down to 320px mobile devices",
                ].map((f, i) => (
                  <li key={i} style={{ display: "flex", gap: 14, color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>
                    <span
                      style={{
                        width: 24, height: 24, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                        background: "linear-gradient(135deg, var(--accent), var(--cyan))",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700, color: "white",
                      }}
                    >{i + 1}</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="detail-block card" style={{ padding: "32px 28px" }}>
              <div className="text-label" style={{ marginBottom: 20 }}>Tech Stack</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {project.tags.map((t) => (
                  <span key={t} className="skill-pill" style={{ fontSize: 13 }}>{t}</span>
                ))}
              </div>
            </div>

            <div className="detail-block card" style={{ padding: "32px 28px" }}>
              <div className="text-label" style={{ marginBottom: 20 }}>Results</div>
              {[
                { n: "90+", l: "Lighthouse Score" },
                { n: "<1s", l: "First Contentful Paint" },
                { n: "60fps", l: "Animation Performance" },
              ].map((r) => (
                <div key={r.l} style={{ marginBottom: 20 }}>
                  <div className="g-text-static" style={{ fontFamily: "var(--font-head)", fontSize: 28, fontWeight: 700 }}>{r.n}</div>
                  <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>{r.l}</div>
                </div>
              ))}
            </div>

            <div className="detail-block" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textAlign: "center", justifyContent: "center" }}>
                <span>View Live</span>
              </a>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ textAlign: "center", justifyContent: "center" }}>
                GitHub Repo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT PROJECT ─────────────────────────────── */}
      <section style={{ padding: "0 var(--pad) 80px" }}>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 60, textAlign: "center" }}>
          <div className="text-label" style={{ marginBottom: 16 }}>Next Project</div>
          <Link
            to={`/project/${nextProject.id}`}
            style={{ textDecoration: "none", display: "inline-block" }}
          >
            <h2
              className="text-display"
              style={{
                color: "var(--white)",
                transition: "all 0.3s",
                display: "inline-block",
              }}
              onMouseOver={(e) => { (e.currentTarget as HTMLHeadingElement).style.color = "var(--accent-2)"; }}
              onMouseOut={(e) => { (e.currentTarget as HTMLHeadingElement).style.color = "var(--white)"; }}
            >
              {nextProject.title} →
            </h2>
          </Link>
        </div>
      </section>

      <style>{`
        @media(max-width:768px){
          section>div[style*="grid-template-columns: 2fr"] { grid-template-columns:1fr !important; }
          .detail-hero-content { max-width: 100% !important; }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetailPage;
