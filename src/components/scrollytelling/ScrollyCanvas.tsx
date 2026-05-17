import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 120; // 0 to 119
const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/sequence/frame_${paddedIndex}_delay-0.066s.webp`;
};

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isFixed, setIsFixed] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Track scroll progress to toggle position between fixed (during scrollytelling)
  // and absolute bottom (after scrollytelling finishes so it scrolls up naturally).
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.999) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    // Preload images
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = (index: number) => {
      const frameIdx = Math.round(index);
      const img = images[frameIdx];
      if (!img || !ctx) return;

      // Object-fit: cover logic
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(frameIndex.get());
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial draw

    // Subscribe to frameIndex changes
    const unsubscribe = frameIndex.on("change", (latest) => {
      drawFrame(latest);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      unsubscribe();
    };
  }, [imagesLoaded, frameIndex, images]);

  return (
    <div ref={containerRef} style={{ height: "500vh", position: "relative", background: "#121212" }}>
      <div
        style={{
          position: isFixed ? "fixed" : "absolute",
          top: isFixed ? 0 : "auto",
          bottom: isFixed ? "auto" : 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {!imagesLoaded && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, background: "#121212" }}>
            <div className="canvas-loader" />
          </div>
        )}
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
        {/* Dark overlay to make text more readable */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,4,15,0.7) 0%, rgba(6,4,15,0.2) 100%)", pointerEvents: "none" }} />
        
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
