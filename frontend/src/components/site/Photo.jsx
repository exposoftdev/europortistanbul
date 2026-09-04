import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { CornerMarks } from "@/components/brand/Primitives";

export const Photo = ({ src, alt, label, className = "", ratio = "aspect-[4/5]", parallax = 60, tilt = false, mask = "left" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 20 }), sry = useSpring(ry, { stiffness: 120, damping: 20 });

  const onMove = (e) => {
    if (!tilt) return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const reset = () => { rx.set(0); ry.set(0); };
  const gradient = mask === "left" ? "linear-gradient(90deg, rgba(7,37,92,0.85) 0%, rgba(7,37,92,0.25) 45%, transparent 100%)" : "linear-gradient(0deg, rgba(7,37,92,0.9) 0%, rgba(7,37,92,0.2) 50%, transparent 100%)";

  return (
    <motion.figure
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={tilt ? { rotateX: srx, rotateY: sry, transformPerspective: 1200 } : undefined}
      className={`relative overflow-hidden rounded-lg border border-border/60 text-white ${ratio} ${className}`}
    >
      <motion.img src={src} alt={alt} style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover" loading="lazy" />
      <div className="absolute inset-0" style={{ background: gradient }} />
      <CornerMarks label={label} />
    </motion.figure>
  );
};
