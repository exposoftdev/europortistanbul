import axios from "axios";

export const api = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URL}/api` });

export const REGISTER_URL = "https://europort.expoffs.com";

export const SITE = {
  dates: "4–6 November 2026",
  venue: "Yenikapı Expo Center, Istanbul",
  coordinates: "41°00'N 28°57'E",
  theme: "Two Continents. One Course.",
  cta: "Set course for Istanbul.",
  eventStart: "2026-11-04T10:00:00+03:00",
  phone: "+90 216 000 00 00",
  email: "info@europort.com.tr",
};

export const IMG = {
  drydock: "https://images.unsplash.com/photo-1602575051429-c502cac0d3e8",
  istanbul: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200",
  galata: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b",
  port: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3",
  ship: "https://images.unsplash.com/photo-1578575437130-527eed3abbec",
  yacht: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166",
  mosque: "https://images.unsplash.com/photo-1527838832700-5059252407fa",
  bosphorus: "/img/bosphorus-ferry.jpg",
  cranes: "/img/tuzla-shipyard.jpg",
  vessel: "/img/vessel-dusk.jpg",
  aerial: "/img/aerial-harbour.jpg",
};

export const img = (key, w = 1600) => (IMG[key].startsWith("/") ? IMG[key] : `${IMG[key]}?auto=format&fit=crop&w=${w}&q=70`);
