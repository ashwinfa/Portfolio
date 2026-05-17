import { PROJECTS } from "../../pages/WorkPage";
import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <section style={{ padding: "120px var(--pad)", background: "var(--bg)", position: "relative", zIndex: 10 }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div className="text-label" style={{ marginBottom: 16 }}>Selected Work</div>
        <h2 className="text-section" style={{ color: "var(--white)" }}>
          Featured <span className="g-text-static">Projects</span>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 32, maxWidth: 1200, margin: "0 auto" }}>
        {PROJECTS.slice(0, 3).map((p) => (
          <Link key={p.id} to={`/project/${p.id}`} style={{ textDecoration: "none" }}>
            <div className="card project-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ overflow: "hidden", height: 260, borderRadius: "var(--radius-xl) var(--radius-xl) 0 0" }}>
                <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} className="project-card-img" />
              </div>
              <div style={{ padding: "32px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                  {p.tags.slice(0, 3).map((t) => <span key={t} className="project-tag">{t}</span>)}
                </div>
                <h3 style={{ fontFamily: "var(--font-head)", fontSize: 24, fontWeight: 700, color: "var(--white)", marginBottom: 12 }}>{p.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6, marginBottom: 24, flexGrow: 1 }}>{p.subtitle}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--white)" }}>View Case Study</span>
                  <div className="project-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
