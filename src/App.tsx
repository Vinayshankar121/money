import React from "react"; // You might need to install 'aos' and '@types/aos'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EventsPage from "./pages/EventsPage";
import GalleryPage from "./pages/GalleryPage";
import SponsorsPage from "./pages/SponsorsPage";
import HighlightsPage from "./pages/Highlights";
import AboutPage from "./pages/AboutPage";
import RegistrationPage from "./pages/RegistrationPage";
import EventDetail from "./pages/EventDetail";
import ProshowPage from "./pages/ProshowPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ui/ScrollToTop";
import TeamPage from "./pages/TeamPage";

const queryClient = new QueryClient();

/**
 * Root application component with React Query and routing configuration.
 * Provides global state management, notifications, and route definitions.
 * @component
 */
const App = () => {



  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="/highlights" element={<HighlightsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/proshow" element={<ProshowPage />} />
          <Route path="/team" element={<TeamPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
