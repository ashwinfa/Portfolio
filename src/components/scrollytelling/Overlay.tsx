import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: 0% scroll
  const section1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const section1Y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2: 30% scroll
  const section2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const section2Y = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);

  // Section 3: 60% scroll
  const section3Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const section3Y = useTransform(scrollYProgress, [0.5, 0.8], [50, -50]);

  // Section 4: 90% scroll (End)
  const section4Opacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
  const section4Y = useTransform(scrollYProgress, [0.8, 1], [50, 0]);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }}>
      {/* Section 1 */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: section1Opacity,
          y: section1Y,
          textAlign: "center",
        }}
      >
        <h1 className="text-hero" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
          Ashwin. <br />
          <span className="g-text">Creative Developer.</span>
        </h1>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingLeft: "10vw",
          opacity: section2Opacity,
          y: section2Y,
        }}
      >
        <h2 className="text-display" style={{ maxWidth: "600px", textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
          I build <span className="g-text-static">digital experiences</span> that leave a mark.
        </h2>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingRight: "10vw",
          opacity: section3Opacity,
          y: section3Y,
          textAlign: "right",
        }}
      >
        <h2 className="text-display" style={{ maxWidth: "600px", textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
          Bridging the gap between <br />
          <span className="g-text">design and engineering.</span>
        </h2>
      </motion.div>

      {/* Section 4 */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: section4Opacity,
          y: section4Y,
          textAlign: "center",
        }}
      >
        <h2 className="text-display" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
          Scroll to explore my <span className="g-text-static">Work.</span>
        </h2>
        <div style={{ marginTop: 24 }}>
          <div style={{ width: 28, height: 48, border: "1.5px solid rgba(168,85,247,0.4)", borderRadius: 20, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 5, margin: "0 auto" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "linear-gradient(135deg, #a855f7, #00e5ff)", animation: "scroll-dot 1.6s ease-in-out infinite" }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
