const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

export const captureUtm = () => {
  const p = new URLSearchParams(window.location.search);
  const found = Object.fromEntries(KEYS.filter((k) => p.get(k)).map((k) => [k, p.get(k)]));
  if (Object.keys(found).length) sessionStorage.setItem("ep-utm", JSON.stringify(found));
  if (!sessionStorage.getItem("ep-landing")) sessionStorage.setItem("ep-landing", window.location.pathname);
  if (!sessionStorage.getItem("ep-referrer")) sessionStorage.setItem("ep-referrer", document.referrer || "direct");
};

export const getUtm = () => {
  const utm = JSON.parse(sessionStorage.getItem("ep-utm") || "{}");
  return { ...utm, landing_page: sessionStorage.getItem("ep-landing") || "", referrer: sessionStorage.getItem("ep-referrer") || "" };
};

export const track = (event, params = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, theme: document.documentElement.classList.contains("dark") ? "dark" : "light", page_path: window.location.pathname, ...params });
};

export const withUtm = (url, content) => {
  const u = new URL(url);
  const utm = getUtm();
  KEYS.forEach((k) => utm[k] && u.searchParams.set(k, utm[k]));
  if (!u.searchParams.get("utm_source")) u.searchParams.set("utm_source", "europort-istanbul-site");
  if (!u.searchParams.get("utm_medium")) u.searchParams.set("utm_medium", "referral");
  if (content) u.searchParams.set("utm_content", content);
  return u.toString();
};
