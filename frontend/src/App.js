import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/lib/theme";
import { ScrollManager } from "@/lib/scroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Exhibition from "@/pages/Exhibition";
import Exhibit from "@/pages/Exhibit";
import FormPage from "@/pages/FormPage";
import Visit from "@/pages/Visit";
import Exhibitors from "@/pages/Exhibitors";
import ExhibitorDetail from "@/pages/ExhibitorDetail";
import Programme from "@/pages/Programme";
import SessionDetail from "@/pages/SessionDetail";
import BosphorusSeries from "@/pages/BosphorusSeries";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Media from "@/pages/Media";
import Partners from "@/pages/Partners";
import Contact from "@/pages/Contact";
import BrandHub from "@/pages/BrandHub";
import Report from "@/pages/Report";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollManager />
        <div className="App grain">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exhibition" element={<Exhibition />} />
              <Route path="/exhibit" element={<Exhibit />} />
              <Route path="/exhibit/enquiry" element={<FormPage type="stand" />} />
              <Route path="/exhibit/sponsorship" element={<FormPage type="sponsorship" />} />
              <Route path="/visit" element={<Visit />} />
              <Route path="/visit/visa" element={<FormPage type="visa" />} />
              <Route path="/exhibitors" element={<Exhibitors />} />
              <Route path="/exhibitors/:slug" element={<ExhibitorDetail />} />
              <Route path="/programme" element={<Programme />} />
              <Route path="/programme/bosphorus-series" element={<BosphorusSeries />} />
              <Route path="/programme/:slug" element={<SessionDetail />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
              <Route path="/media" element={<Media />} />
              <Route path="/media/accreditation" element={<FormPage type="press" />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/brand" element={<BrandHub />} />
              <Route path="/report" element={<Report />} />
              <Route path="*" element={<NotFound />} />
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
