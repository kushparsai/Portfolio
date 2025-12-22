import { useState, useEffect } from 'react';
import { Preloader } from './Preloader';
import { Navigation } from './Navigation';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ProjectsSection } from './ProjectsSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';

export const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set dark theme
    document.documentElement.classList.add('dark');
    
    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      {isLoading && <Preloader onComplete={handleLoadingComplete} />}
      
      {!isLoading && (
        <>
          <Navigation />
          <main>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};