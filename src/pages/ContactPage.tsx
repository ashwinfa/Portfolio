import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EarthCanvas, StarsCanvas } from "../components/canvas";

const SOCIAL = [
  { label: "GitHub", href: "https://github.com/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: "Twitter", href: "https://twitter.com/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.632L18.244 2.25zM17.083 19.77h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg> },
];

const ContactPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-hero > *", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", delay: 0.1,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="page" style={{ background: "var(--bg)", paddingTop: 90, position: "relative", minHeight: "100vh" }}>

      {/* Stars throughout */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <StarsCanvas />
      </div>

      {/* Orbs */}
      <div className="orb orb-v" style={{ width: 600, height: 600, bottom: 0, left: -200, opacity: 0.1, position: "fixed" }} />
      <div className="orb orb-c" style={{ width: 400, height: 400, top: "30%", right: -100, opacity: 0.08, position: "fixed" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── HEADER ─────────────────────────────────── */}
        <section ref={heroRef} style={{ padding: "60px var(--pad) 80px" }}>
          <div className="contact-hero">
            <div className="text-label" style={{ marginBottom: 20 }}>Get In Touch</div>
            <h1 className="text-display" style={{ color: "var(--white)", marginBottom: 16, maxWidth: 600 }}>
              Let's build something{" "}
              <span className="g-text">together</span>
            </h1>
            <p className="text-body" style={{ maxWidth: 520 }}>
              Have a project in mind? Whether it's a full redesign, a new product, or just a quick question —
              I'd love to hear from you. I typically respond within 24 hours.
            </p>
          </div>
        </section>

        {/* ── MAIN CONTENT ─────────────────────────── */}
        <section style={{ padding: "0 var(--pad) 100px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>

            {/* Form */}
            <div>
              <div
                className="card"
                style={{
                  padding: "48px 44px",
                  background: "rgba(255,255,255,0.025)",
                }}
              >
                {sent ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ fontSize: 48, marginBottom: 20 }}>✉️</div>
                    <h3 style={{ fontFamily: "var(--font-head)", fontSize: 24, color: "var(--white)", marginBottom: 12 }}>Message Sent!</h3>
                    <p className="text-body">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => setSent(false)}
                      className="btn btn-ghost"
                      style={{ marginTop: 24 }}
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Social row */}
                    <div style={{ display: "flex", gap: 12, marginBottom: 36, alignItems: "center" }}>
                      {SOCIAL.map((s) => (
                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social" title={s.label}>
                          {s.icon}
                        </a>
                      ))}
                      <span style={{ color: "var(--muted)", fontSize: 13, marginLeft: 8 }}>or fill the form</span>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      {[
                        { key: "name",    label: "Your Name",    type: "text",  placeholder: "Ashwin Kumar" },
                        { key: "email",   label: "Email Address", type: "email", placeholder: "hello@yoursite.com" },
                      ].map((f) => (
                        <div key={f.key}>
                          <label className="form-label">{f.label}</label>
                          <input
                            type={f.type}
                            placeholder={f.placeholder}
                            required
                            value={form[f.key as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                            className="form-field"
                          />
                        </div>
                      ))}
                      <div>
                        <label className="form-label">Message</label>
                        <textarea
                          placeholder="Tell me about your project..."
                          required
                          rows={6}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="form-field"
                          style={{ resize: "none" }}
                        />
                      </div>

                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        <span>{loading ? "Sending..." : "Send Message"}</span>
                        {!loading && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Right side — Earth + info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* 3D Earth */}
              <div style={{ height: 360, borderRadius: "var(--radius-2xl)", overflow: "hidden", border: "1px solid var(--border)" }}>
                <EarthCanvas />
              </div>

              {/* Info cards */}
              {[
                { icon: "✉", label: "Email", value: "ashwin@gmail.com" },
                { icon: "📍", label: "Location", value: "India — Available Remotely" },
                { icon: "⚡", label: "Availability", value: "Open to Freelance & Full-time" },
              ].map((info) => (
                <div key={info.label} className="card" style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                      background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(0,229,255,0.1))",
                      border: "1px solid rgba(124,58,237,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18,
                    }}
                  >{info.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>{info.label}</div>
                    <div style={{ color: "var(--white)", fontSize: 14, fontWeight: 500, marginTop: 3 }}>{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @media(max-width:768px){
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns:1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
