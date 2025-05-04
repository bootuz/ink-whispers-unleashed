
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import Index from "./pages/Index";
import Poems from "./pages/Poems";
import Poem from "./pages/Poem";
import NotFound from "./pages/NotFound";
import Authors from "./pages/Authors";
import Author from "./pages/Author";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Ensure fonts are loaded
  useEffect(() => {
    // Add a class to the document to indicate fonts are ready
    document.documentElement.classList.add('fonts-loaded');
    
    // Force font loading by creating a temporary element
    const loader = document.createElement('div');
    loader.style.fontFamily = 'Marck Script';
    loader.style.opacity = '0';
    loader.innerText = 'Font Preloader';
    document.body.appendChild(loader);
    
    // Clean up
    return () => {
      document.body.removeChild(loader);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <div className="pb-10">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/poems" element={<Poems />} />
              <Route path="/poem/:id" element={<Poem />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/author/:id" element={<Author />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
