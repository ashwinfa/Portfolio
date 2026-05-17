import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ComputersCanvas, StarsCanvas } from "../components/canvas";
import { PROJECTS } from "./WorkPage";
import { testimonials } from "../constants";

gsap.registerPlugin(ScrollTrigger);

// ── Data ──────────────────────────────────────────────────────
const ROLES = ["Web Developer", "React Specialist", "UI Craftsman", "Full Stack Dev"];
const STATS = [
  { value: 15, suffix: "+", label: "Projects Done" },
  { value: 10, suffix: "+", label: "Technologies" },
  { value: 2, suffix: "+", label: "Years Exp" },
  { value: 100, suffix: "%", label: "Satisfaction" },
];
const TECHS = [
  { name: "React.js", icon: "⚛️" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Three.js", icon: "🌐" },
  { name: "Node.js", icon: "🟢" },
  { name: "MongoDB", icon: "🍃" },
  { name: "GSAP", icon: "💚" },
  { name: "Next.js", icon: "▲" },
  { name: "Tailwind", icon: "💨" },
  { name: "Figma", icon: "🎨" },
  { name: "Git", icon: "🐙" },
];
const SERVICES = [
  {
    num: "01",
    title: "UI / UX Development",
    desc: "Pixel-perfect interfaces with smooth animations and intuitive flows.",
    icon: "◈",
  },
  {
    num: "02",
    title: "React Development",
    desc: "High-performance React 18 applications with clean architecture.",
    icon: "⚛",
  },
  {
    num: "03",
    title: "Full Stack Development",
    desc: "End-to-end solutions from database design to frontend integration.",
    icon: "⬡",
  },
  {
    num: "04",
    title: "Performance Optimization",
    desc: "Auditing and optimizing web apps for real-world speed.",
    icon: "◎",
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Web Developer",
    company: "Personal & Open Source",
    period: "Jan 2024 – Present",
  },
  {
    role: "React Developer",
    company: "Freelance",
    period: "Jul 2023 – Dec 2023",
  },
];

// ── Typewriter hook ────────────────────────────────────────────
function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const curr = words[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && text.length < curr.length) {
      t = setTimeout(() => setText(curr.slice(0, text.length + 1)), 90);
    } else if (!del && text.length === curr.length) {
      t = setTimeout(() => setDel(true), 1800);
    } else if (del && text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), 45);
    } else {
      setDel(false);
      setIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [text, del, idx, words]);

  return text;
}

// ── Count-up hook ───────────────────────────────────────────────
function useCountUp(target: number, active: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const dur = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, active]);
  return n;
}

// ── Wave SVG ────────────────────────────────────────────────────
const Wave = ({ flip = false, color = "#06040f" }: { flip?: boolean; color?: string }) => (
  <div
    style={{
      position: "absolute",
      [flip ? "top" : "bottom"]: -1,
      left: 0, right: 0,
      lineHeight: 0,
      zIndex: 2,
      transform: flip ? "rotate(180deg)" : undefined,
    }}
  >
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 80 }}>
      <path
        d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
        fill={color}
      />
    </svg>
  </div>
);

// ── Stat Card ───────────────────────────────────────────────────
const StatCard = ({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) => {
  const n = useCountUp(value, active);
  return (
    <div className="card" style={{ padding: "32px 24px", textAlign: "center", flex: "1 1 160px" }}>
      <div className="stat-num">{n}{suffix}</div>
      <div style={{ color: "var(--muted)", fontSize: 13, fontWeight: 500, marginTop: 8, letterSpacing: "0.04em" }}>
        {label}
      </div>
    </div>
  );
};

// ── Main Page ───────────────────────────────────────────────────
const HomePage = () => {
  const role = useTypewriter(ROLES);
  const heroRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(headRef.current, { opacity: 0, y: 60, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power4.out" })
        .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.4");

      // Services scroll trigger
      if (servicesRef.current) {
        gsap.fromTo(".service-card-item", { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: servicesRef.current, start: "top 75%" },
        });
      }

      // Social scroll trigger
      if (socialRef.current) {
        gsap.fromTo(".social-iframe-card", { opacity: 0, y: 40, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: socialRef.current, start: "top 80%" },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  // Stats intersection
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page" style={{ background: "var(--bg)" }}>

      {/* ── HERO ─────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }}
      >
        {/* 3D Canvas */}
        <div style={{ position: "absolute", inset: 0 }}>
          <ComputersCanvas />
        </div>

        {/* Orbs */}
        <div className="orb orb-v" style={{ width: 700, height: 700, top: -200, left: -200, opacity: 0.12 }} />
        <div className="orb orb-c" style={{ width: 400, height: 400, bottom: 0, right: -100, opacity: 0.08 }} />

        {/* Content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 var(--pad)",
            paddingTop: 90,
            maxWidth: "55%",
            zIndex: 1,
          }}
        >
          <div className="text-label" style={{ marginBottom: 20 }}>✦ Portfolio 2024</div>

          <h1 ref={headRef} className="text-hero" style={{ opacity: 0 }}>
            Hi, I'm{" "}
            <span className="g-text">Ashwin</span>
          </h1>

          <div ref={subRef} style={{ marginTop: 16, opacity: 0 }}>
            <div style={{ fontSize: "clamp(20px, 2.5vw, 36px)", fontFamily: "var(--font-body)", fontWeight: 500, color: "rgba(240,238,255,0.85)", display: "flex", alignItems: "center", minHeight: 46 }}>
              {role}<span className="cursor" />
            </div>
            <p className="text-body" style={{ maxWidth: 480, marginTop: 16 }}>
              I craft immersive digital experiences from cinematic 3D interfaces to blazing-fast web apps that leave a lasting impression.
            </p>
          </div>

          <div ref={ctaRef} style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap", opacity: 0 }}>
            <Link to="/work" className="btn btn-primary">
              <span>View My Work</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link to="/contact" className="btn btn-ghost">Get In Touch</Link>
          </div>

          {/* Social row */}
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            {[
              { href: "https://github.com/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>, label: "GitHub" },
              { href: "https://linkedin.com/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>, label: "LinkedIn" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social" title={s.label}>{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 2 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 28, height: 48, border: "1.5px solid rgba(168,85,247,0.4)", borderRadius: 20, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 5 }}>
            <div
              style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg, #a855f7, #00e5ff)", animation: "scroll-dot 1.6s ease-in-out infinite" }}
            />
          </div>
        </div>

        <Wave color="var(--bg)" />
        <style>{`
          @keyframes scroll-dot{0%,100%{transform:translateY(0)}50%{transform:translateY(24px)}}
          @media(max-width:768px){ .text-hero{font-size:clamp(40px,10vw,60px)} div[style*="maxWidth: 55%"]{max-width:100% !important} }
        `}</style>
      </section>

      {/* ── STATS ─────────────────────────────────────── */}
      <section style={{ padding: "80px var(--pad)" }}>
        <div ref={statsRef} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {STATS.map((s) => <StatCard key={s.label} {...s} active={statsVisible} />)}
        </div>
      </section>

      {/* ── SERVICES (NEW SECTION ON HOME) ─────────────── */}
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
              <h3 style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 700, color: "var(--white)", marginBottom: 12 }}>{s.title}</h3>
              <p className="text-body" >{s.desc}</p>
            </div>
          ))}
        </div>
        <Wave color="var(--bg)" />
      </section>

      {/* ── QUICK EXPERIENCE (NEW SECTION ON HOME) ─────── */}
      <section style={{ padding: "100px var(--pad)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "60px", alignItems: "center" }}>
          <div style={{ flex: "1 1 400px" }}>
            <div className="text-label" style={{ marginBottom: 16 }}>Journey</div>
            <h2 className="text-section" style={{ color: "var(--white)", marginBottom: 24 }}>
              Recent <span className="g-text-static">Experience</span>
            </h2>
            <p className="text-body" style={{ marginBottom: 32 }}>
              A brief look at my recent professional journey. For a comprehensive overview, head over to my about page.
            </p>
            <Link to="/about" className="btn btn-ghost">View Full Resume</Link>
          </div>

          <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: 24 }}>
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="card" style={{ padding: "28px 32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 700, color: "var(--white)" }}>{e.role}</h3>
                    <div className="g-text-static" style={{ fontWeight: 600, marginTop: 4 }}>{e.company}</div>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)", padding: "4px 12px", borderRadius: 50, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}>
                    {e.period}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS (NEW SECTION ON HOME) ────── */}
      <section
        style={{
          position: "relative",
          padding: "100px var(--pad)",
          background: "var(--bg-2)",
          overflow: "hidden",
        }}
      >
        <Wave flip color="var(--bg)" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 56 }}>
          <div>
            <div className="text-label" style={{ marginBottom: 16 }}>Portfolio</div>
            <h2 className="text-section" style={{ color: "var(--white)" }}>Featured <span className="g-text">Projects</span></h2>
          </div>
          <Link to="/work" className="btn btn-ghost" style={{ padding: "10px 24px" }}>View All Projects</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
          {PROJECTS.slice(0, 2).map((p) => (
            <Link key={p.id} to={`/project/${p.id}`} style={{ textDecoration: "none" }}>
              <div className="card" style={{ overflow: "hidden", cursor: "pointer", height: "100%" }}>
                <div style={{ overflow: "hidden", height: 260, borderRadius: "var(--radius-xl) var(--radius-xl) 0 0" }}>
                  <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)" }} className="card-img" />
                </div>
                <div style={{ padding: "28px 32px 32px" }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                    {p.tags.slice(0, 3).map((t) => <span key={t} className="project-tag">{t}</span>)}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-head)", fontSize: 24, fontWeight: 700, color: "var(--white)", marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6 }}>{p.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Wave color="var(--bg)" />
      </section>

      {/* ── MY PHILOSOPHY (NEW SECTION ON HOME) ────────── */}
      <section style={{ padding: "120px var(--pad)", textAlign: "center", background: "var(--bg)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="text-label" style={{ marginBottom: 24 }}>Philosophy</div>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 500, lineHeight: 1.3, color: "var(--white)", marginBottom: 40 }}>
            "Good design is obvious. Great design is <span style={{ fontStyle: "italic", color: "var(--accent-2)" }}>transparent</span>. I build interfaces that feel effortless, powered by robust architecture."
          </h2>
          <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, var(--accent), var(--cyan))", margin: "0 auto" }} />
        </div>
      </section>

      {/* ── TECH MARQUEE ──────────────────────────────── */}
      <section
        style={{
          position: "relative",
          padding: "80px 0",
          background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 50%, var(--bg) 100%)",
          overflow: "hidden",
        }}
      >
        <Wave flip color="var(--bg)" />
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="text-label">Tech Stack</div>
        </div>

        <div className="marquee-outer" style={{ padding: "8px 0" }}>
          <div className="marquee-inner">
            {[...TECHS, ...TECHS, ...TECHS].map((t, i) => (
              <div key={i} className="chip">
                <span style={{ fontSize: 18 }}>{t.icon}</span>
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <div className="marquee-outer" style={{ padding: "8px 0" }}>
            <div className="marquee-inner" style={{ animationDirection: "reverse", animationDuration: "25s" }}>
              {[...TECHS.slice(5), ...TECHS, ...TECHS.slice(0, 5)].map((t, i) => (
                <div key={i} className="chip">
                  <span style={{ fontSize: 18 }}>{t.icon}</span>
                  <span>{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Wave color="var(--bg)" />
      </section>

      {/* ── SOCIAL IFRAMES (NEW SECTION ON HOME) ──────── */}
      <section ref={socialRef} style={{ padding: "100px var(--pad)", background: "var(--bg)" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="text-label" style={{ marginBottom: 16 }}>Connect</div>
          <h2 className="text-section" style={{ color: "var(--white)" }}>
            Around the <span className="g-text-static">Web</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
          {/* LinkedIn Iframe Card */}
          <div className="card social-iframe-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: "#0077b5", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-head)", fontSize: 20, color: "var(--white)" }}>LinkedIn</h3>
            </div>
            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", background: "rgba(0,0,0,0.2)", flexGrow: 1, minHeight: 300 }}>
              {/* Replace src with your actual LinkedIn badge iframe URL if needed, using a placeholder for now */}
              <iframe
                title="LinkedIn Feed Placeholder"
                src="about:blank"
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: "none", minHeight: 300 }}
              />
              {/* Note: LinkedIn doesn't easily allow full feed embeds via simple iframes without specific widgets. This acts as a responsive container for any widget script or iframe you provide. */}
              <div style={{ position: "absolute", inset: "70px 24px 24px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", textAlign: "center", pointerEvents: "none" }}>
                [Insert LinkedIn Embed Code / Iframe here]
              </div>
            </div>
          </div>

          {/* Instagram Iframe Card */}
          <div className="card social-iframe-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-head)", fontSize: 20, color: "var(--white)" }}>Instagram</h3>
            </div>
            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", background: "rgba(0,0,0,0.2)", flexGrow: 1, minHeight: 300 }}>
              {/* Instagram placeholder container */}
              <iframe
                title="Instagram Feed Placeholder"
                src="about:blank"
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: "none", minHeight: 300 }}
              />
              <div style={{ position: "absolute", inset: "70px 24px 24px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", textAlign: "center", pointerEvents: "none" }}>
                [Insert Instagram Embed Code / Iframe here]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (NEW SECTION ON HOME) ────────── */}
      <section style={{ padding: "100px var(--pad)", background: "var(--bg-2)", position: "relative", overflow: "hidden" }}>
        <Wave flip color="var(--bg)" />
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="text-label" style={{ marginBottom: 16 }}>Feedback</div>
          <h2 className="text-section" style={{ color: "var(--white)" }}>
            Client <span className="g-text-static">Testimonials</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {testimonials.map((t, i) => (
            <div key={i} className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24, justifyContent: "space-between" }}>
              <p className="text-body" style={{ fontStyle: "italic", color: "var(--white)" }}>"{t.testimonial}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <img src={t.image} alt={t.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <h4 style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 700, color: "var(--white)" }}>{t.name}</h4>
                  <p style={{ fontSize: 13, color: "var(--muted)" }}>{t.designation} at {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Wave color="var(--bg)" />
      </section>

      {/* ── MINI CTA ──────────────────────────────────── */}
      <section style={{ padding: "100px var(--pad)", textAlign: "center" }}>
        <div className="text-label" style={{ marginBottom: 20 }}>Ready to build something?</div>
        <h2 className="text-display" style={{ color: "var(--white)", marginBottom: 32 }}>
          Let's create something{" "}
          <span className="g-text">extraordinary</span>
        </h2>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/work" className="btn btn-primary"><span>See My Work</span></Link>
          <Link to="/contact" className="btn btn-ghost">Start a Project</Link>
        </div>
      </section>

      {/* Stars BG at bottom */}
      <div style={{ position: "relative", height: 200 }}>
        <StarsCanvas />
      </div>
    </div>
  );
};

export default HomePage;
