import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BallCanvas, StarsCanvas } from "../components/canvas";

gsap.registerPlugin(ScrollTrigger);

// ── Data ────────────────────────────────────────────────────────
const SKILLS = ["React.js", "TypeScript", "Node.js", "Three.js", "Next.js", "MongoDB", "GSAP", "Tailwind CSS", "REST APIs", "Git", "Figma", "Docker"];
const SERVICES = [
  {
    num: "01",
    title: "UI / UX Development",
    desc: "Pixel-perfect interfaces with smooth animations and intuitive flows that delight users and boost engagement.",
    icon: "◈",
  },
  {
    num: "02",
    title: "React Development",
    desc: "High-performance React 18 applications with clean architecture, reusable component systems, and modern state management.",
    icon: "⚛",
  },
  {
    num: "03",
    title: "Full Stack Development",
    desc: "End-to-end solutions from database design and REST API creation to seamless frontend integration.",
    icon: "⬡",
  },
  {
    num: "04",
    title: "Performance Optimization",
    desc: "Auditing and optimizing web apps for Core Web Vitals, Lighthouse scores, and real-world speed.",
    icon: "◎",
  },
];
const EXPERIENCE = [
  {
    role: "Frontend Developer Intern",
    company: "Tech Startup",
    period: "Jan 2023 – Jun 2023",
    points: ["Built responsive React.js UIs from Figma with pixel-perfect accuracy", "Implemented reusable component libraries, cutting dev time by 30%", "Integrated REST APIs with Redux Toolkit state management"],
  },
  {
    role: "React Developer",
    company: "Freelance",
    period: "Jul 2023 – Dec 2023",
    points: ["Delivered 5+ client websites with React 18 and Next.js", "Built 3D interactive experiences using Three.js and React Three Fiber", "Achieved 90+ Lighthouse scores across all projects"],
  },
  {
    role: "Full Stack Web Developer",
    company: "Personal & Open Source",
    period: "Jan 2024 – Present",
    points: ["Building full-stack apps with React, Node.js, and MongoDB", "Creating premium portfolio sites with 3D animations and GSAP", "Contributing to open source and mentoring junior devs"],
  },
];

const Wave = ({ flip = false, color = "var(--bg)" }: { flip?: boolean; color?: string }) => (
  <div style={{ position: "absolute", [flip ? "top" : "bottom"]: -1, left: 0, right: 0, lineHeight: 0, zIndex: 2, transform: flip ? "rotate(180deg)" : undefined }}>
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 80 }}>
      <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill={color} />
    </svg>
  </div>
);

const AboutPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(".about-hero-content > *", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: heroRef.current, start: "top 80%" },
      });
      // Service cards
      gsap.fromTo(".service-card-item", { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: servicesRef.current, start: "top 75%" },
      });
      // Timeline
      gsap.fromTo(".exp-item", { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, stagger: 0.2, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: expRef.current, start: "top 75%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="page" >

      {/* ── BIO HERO (REDESIGNED) ─────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          padding: "150px var(--pad) 120px",
          position: "relative",
          overflow: "hidden",
          background: "radial-gradient(circle at 80% 20%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(circle at 10% 80%, rgba(0,229,255,0.1) 0%, transparent 60%)"
        }}
      >
        {/* Futuristic Grid Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 80%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Ambient Glowing Orbs */}
        <div className="orb orb-v" style={{ width: 600, height: 600, top: -100, left: -200, opacity: 0.15 }} />
        <div className="orb orb-c" style={{ width: 500, height: 500, bottom: -100, right: -100, opacity: 0.12 }} />

        <div className="about-hero-content" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "60px", alignItems: "center", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Left Panel */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 50,
                background: "rgba(124,58,237,0.1)",
                border: "1px solid rgba(124,58,237,0.2)",
                marginBottom: 24,
              }}
            >
              <span className="text-label" style={{ margin: 0, fontSize: 11, letterSpacing: "0.15em", color: "var(--cyan)" }}>✦ About Ashwin</span>
            </div>

            <h1 className="text-hero" style={{ fontSize: "clamp(48px, 6vw, 84px)", color: "var(--white)", marginBottom: 28, lineHeight: 1.05 }}>
              Architect of <br />
              <span className="g-text" style={{ filter: "drop-shadow(0 0 20px rgba(168,85,247,0.3))" }}>Digital Art</span>
            </h1>

            <p className="text-body" style={{ marginBottom: 20, maxWidth: 600, fontSize: 18, color: "rgba(240,238,255,0.9)" }}>
              I'm a creative developer who bridges the gap between premium design aesthetics and highly performant architecture. I build high-fidelity interactive interfaces, custom 3D web spaces, and robust full-stack applications.
            </p>

            <p className="text-body" style={{ marginBottom: 32, maxWidth: 600, color: "var(--muted)", lineHeight: 1.8 }}>
              Obsessed with micro-interactions, smooth scrolling dynamics, and rich rendering pipelines. I treat code as a canvas to craft memorable digital stories that leave clients and users completely wowed.
            </p>

            {/* Quick Metrics */}
            <div style={{ display: "flex", gap: 32, marginBottom: 40, flexWrap: "wrap" }}>
              {[
                { val: "2+", label: "Years Exp" },
                { val: "15+", label: "Completed Projects" },
                { val: "100%", label: "Client Satisfaction" }
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span className="g-text-static" style={{ fontSize: 28, fontFamily: "var(--font-head)", fontWeight: 700 }}>{m.val}</span>
                  <span style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.label}</span>
                </div>
              ))}
            </div>

            {/* Skill pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {SKILLS.map((s) => <span key={s} className="skill-pill" style={{ fontSize: 12, padding: "8px 16px" }}>{s}</span>)}
            </div>
          </div>

          {/* Right Panel — Interactive Premium Profile Card */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="card"
              style={{
                width: "100%",
                maxWidth: 360,
                borderRadius: "var(--radius-xl)",
                padding: "36px",
                background: "linear-gradient(145deg, rgba(6,4,15,0.7) 0%, rgba(20,10,40,0.4) 100%)",
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 30px rgba(124,58,237,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 24,
                position: "relative",
              }}
            >
              {/* Profile Ring / Avatar */}
              <div
                style={{
                  position: "relative",
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  padding: 4,
                  background: "linear-gradient(135deg, var(--accent), var(--cyan))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 40px rgba(124,58,237,0.3)"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: "var(--bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 48,
                    fontFamily: "var(--font-head)",
                    fontWeight: 700,
                    color: "#white",
                  }}
                >
                  <span className="g-text-static">A</span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div style={{ textAlign: "center" }}>
                <h3 style={{ fontFamily: "var(--font-head)", fontSize: 26, fontWeight: 700, color: "var(--white)", margin: 0 }}>
                  Ashwin
                </h3>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 6 }}>
                  <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>Creative Developer</span>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
                  <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>India</span>
                </div>
              </div>

              {/* Radar Status Badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 20px",
                  borderRadius: 50,
                  background: "rgba(168,85,247,0.06)",
                  border: "1px solid rgba(168,85,247,0.15)",
                }}
              >
                <span style={{ position: "relative", display: "flex", height: 8, width: 8 }}>
                  <span style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: "#00e5ff", opacity: 0.75, animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
                  <span style={{ position: "relative", display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#00e5ff" }} />
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--white)", letterSpacing: "0.04em" }}>AVAILABLE FOR HIRE</span>
              </div>

              {/* Interactive R3F Ball Canvas */}
              <div style={{ width: 100, height: 100, marginTop: 8 }}>
                <BallCanvas icon="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" />
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes ping {
            75%, 100% {
              transform: scale(2.2);
              opacity: 0;
            }
          }
        `}</style>
      </section>

      {/* ── SERVICES ──────────────────────────────────────── */}
      <section
        ref={servicesRef}
        style={{ position: "relative", padding: "100px var(--pad)", background: "var(--bg-2)", overflow: "hidden" }}
      >
        <Wave flip color="var(--bg)" />
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="text-label" style={{ marginBottom: 16 }}>What I Offer</div>
          <h2 className="text-section" style={{ color: "var(--white)" }}>
            My <span className="g-text-static">Services</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {SERVICES.map((s) => (
            <div key={s.num} className="card service-card-item" style={{ padding: "40px 32px" }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", color: "var(--accent-2)", marginBottom: 12 }}>{s.num}</div>
              <h3 style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 700, color: "var(--white)", marginBottom: 12 }}>{s.title}</h3>
              <p className="text-body" >{s.desc}</p>
            </div>
          ))}
        </div>
        <Wave color="var(--bg)" />
      </section>

      {/* ── EXPERIENCE TIMELINE ────────────────────────── */}
      <section ref={expRef} style={{ padding: "100px var(--pad)" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="text-label" style={{ marginBottom: 16 }}>Journey</div>
          <h2 className="text-section" style={{ color: "var(--white)" }}>
            Work <span className="g-text-static">Experience</span>
          </h2>
        </div>
        <div style={{ position: "relative", paddingLeft: 40 }}>
          <div className="timeline-line" />
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="exp-item" style={{ position: "relative" }}>
                <div className="timeline-dot" style={{ top: 6 }} />
                <div className="card" style={{ padding: "32px 36px", marginLeft: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 700, color: "var(--white)" }}>{e.role}</h3>
                      <div className="g-text-static" style={{ fontWeight: 600, marginTop: 4 }}>{e.company}</div>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--muted)", padding: "6px 14px", borderRadius: 50, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", whiteSpace: "nowrap" }}>
                      {e.period}
                    </div>
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {e.points.map((p, j) => (
                      <li key={j} style={{ display: "flex", gap: 12, color: "var(--muted)", lineHeight: 1.6 }}>
                        <span style={{ color: "var(--accent-2)", flexShrink: 0, marginTop: 2 }}>▸</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ position: "relative", height: 160 }}>
        <StarsCanvas />
      </div>

      <style>{`
        @media(max-width:768px){
          .about-hero-content{grid-template-columns:1fr !important;}
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
