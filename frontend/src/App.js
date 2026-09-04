import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/lib/theme";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Home from "@/pages/Home";
import BrandHub from "@/pages/BrandHub";
import Report from "@/pages/Report";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App grain">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/brand" element={<BrandHub />} />
              <Route path="/report" element={<Report />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="bottom-right" toastOptions={{ className: "font-sans" }} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
