import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarsCanvas } from "../components/canvas";

gsap.registerPlugin(ScrollTrigger);

// ── Project Data ─────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: "3d-portfolio",
    title: "3D Portfolio",
    subtitle: "Immersive developer portfolio with Three.js",
    description: "A cinematic, interactive 3D portfolio built with React 18, Three.js and GSAP. Features immersive animations, glassmorphism UI, and a full multi-page experience with smooth page transitions.",
    tags: ["React", "Three.js", "GSAP", "TypeScript"],
    color: "#7c3aed",
    year: "2024",
    role: "Design & Development",
    github: "https://github.com/",
    live: "https://ashwin.dev",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
  },
  {
    id: "task-canvas",
    title: "Task Canvas",
    subtitle: "Full-stack Kanban task management app",
    description: "A full-stack task management application with drag-and-drop Kanban boards, cloud image storage via Cloudinary, PostgreSQL persistence, and real-time collaboration features. Deployed on Render.",
    tags: ["React", "Node.js", "PostgreSQL", "Cloudinary"],
    color: "#00e5ff",
    year: "2024",
    role: "Full Stack Development",
    github: "https://github.com/",
    live: "https://taskcanvas.app",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Store",
    subtitle: "Custom Shopify storefront with animations",
    description: "A high-performance e-commerce storefront with custom Shopify Liquid sections, animated product carousels, responsive checkout flow, and 90+ Lighthouse scores optimized for conversions.",
    tags: ["Shopify", "Liquid", "JavaScript", "CSS"],
    color: "#a855f7",
    year: "2023",
    role: "Frontend Development",
    github: "https://github.com/",
    live: "https://store.ashwin.dev",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
  },
];

const Wave = ({ flip = false, color = "var(--bg)" }: { flip?: boolean; color?: string }) => (
  <div style={{ position: "absolute", [flip ? "top" : "bottom"]: -1, left: 0, right: 0, lineHeight: 0, zIndex: 2, transform: flip ? "rotate(180deg)" : undefined }}>
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 80 }}>
      <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill={color} />
    </svg>
  </div>
);

// ── GSAP Horizontal Drag Slider ──────────────────────────────────
const ProjectSlider = () => {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging = true;
    startX = e.pageX - trackRef.current.offsetLeft;
    scrollLeft = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };
  const onMouseUp = () => {
    isDragging = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".project-slide", { opacity: 0, scale: 0.92 }, {
        opacity: 1, scale: 1, stagger: 0.15, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sliderRef.current, start: "top 80%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sliderRef}>
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          display: "flex",
          gap: 24,
          overflowX: "auto",
          paddingBottom: 20,
          cursor: "grab",
          scrollbarWidth: "none",
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
        }}
      >
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            className="project-card project-slide"
            style={{ minWidth: "min(480px, 85vw)", flex: "0 0 auto" }}
            onClick={() => navigate(`/project/${p.id}`)}
          >
            <div style={{ overflow: "hidden", borderRadius: "var(--radius-2xl) var(--radius-2xl) 0 0", position: "relative" }}>
              <img src={p.image} alt={p.title} className="project-card-img" style={{ height: 280 }} />
              {/* Year badge */}
              <div style={{
                position: "absolute", top: 20, left: 20,
                padding: "6px 14px", borderRadius: 50, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
                background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)",
              }}>{p.year}</div>
              {/* Color tag */}
              <div style={{
                position: "absolute", bottom: 20, left: 20,
                width: 10, height: 10, borderRadius: "50%", background: p.color,
                boxShadow: `0 0 16px ${p.color}`,
              }} />
            </div>
            <div className="project-card-body">
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                {p.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-head)", fontSize: 24, fontWeight: 700, color: "var(--white)", lineHeight: 1.2 }}>{p.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 6 }}>{p.subtitle}</p>
                </div>
                <div className="project-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
};

// ── Main Work Page ───────────────────────────────────────────────
const WorkPage = () => {
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".work-head > *", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="page" style={{ background: "var(--bg)", paddingTop: 90 }}>

      {/* ── HEADER ─────────────────────────────────── */}
      <section ref={headRef} style={{ padding: "80px var(--pad) 60px" }}>
        <div className="work-head">
          <div className="text-label" style={{ marginBottom: 20 }}>Selected Work</div>
          <h1 className="text-display" style={{ color: "var(--white)", marginBottom: 20 }}>
            Projects that{" "}
            <span className="g-text">matter</span>
          </h1>
          <p className="text-body" style={{ maxWidth: 560, marginBottom: 8 }}>
            Drag to explore → each card opens a full project deep-dive with design process, tech stack, and results.
          </p>
          <p style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.08em" }}>DRAG OR CLICK TO EXPLORE</p>
        </div>
      </section>

      {/* ── GSAP DRAG SLIDER ─────────────────────── */}
      <section style={{ paddingBottom: 80, overflow: "hidden" }}>
        <ProjectSlider />
      </section>

      {/* ── GRID VIEW ────────────────────────────── */}
      <section
        style={{
          position: "relative",
          padding: "80px var(--pad)",
          background: "var(--bg-2)",
          overflow: "hidden",
        }}
      >
        <Wave flip color="var(--bg)" />
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="text-label" style={{ marginBottom: 16 }}>All Projects</div>
          <h2 className="text-section" style={{ color: "var(--white)" }}>Complete Works</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
          {PROJECTS.map((p) => (
            <Link key={p.id} to={`/project/${p.id}`} style={{ textDecoration: "none" }}>
              <div className="card" style={{ overflow: "hidden", cursor: "pointer" }}>
                <div style={{ overflow: "hidden", height: 220, borderRadius: "var(--radius-xl) var(--radius-xl) 0 0" }}>
                  <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)" }} className="card-img" />
                </div>
                <div style={{ padding: "24px 28px 28px" }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                    {p.tags.slice(0, 3).map((t) => <span key={t} className="project-tag">{t}</span>)}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 700, color: "var(--white)", marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>{p.subtitle}</p>
                  <div style={{ marginTop: 20, color: "var(--accent-2)", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                    View Case Study
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Wave color="var(--bg)" />
      </section>

      <div style={{ position: "relative", height: 160 }}>
        <StarsCanvas />
      </div>

      <style>{`.card-img:hover{transform:scale(1.06)}`}</style>
    </div>
  );
};

export default WorkPage;
