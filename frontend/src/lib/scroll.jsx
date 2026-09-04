import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { captureUtm, track } from "./track";

let lenis = null;
export const getLenis = () => lenis;

export const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.95 });
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); lenis = null; };
  }, []);

  useEffect(() => {
    captureUtm();
    if (!first.current) track("page_view");
    first.current = false;
    const target = hash ? document.querySelector(hash) : null;
    const go = () => {
      if (target) (lenis ? lenis.scrollTo(target, { offset: -90 }) : target.scrollIntoView());
      else (lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0));
    };
    const t = setTimeout(go, hash ? 250 : 0);
    return () => clearTimeout(t);
  }, [pathname, hash]);

  return null;
};
