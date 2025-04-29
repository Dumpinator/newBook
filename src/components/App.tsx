import { useEffect, useRef, useState } from 'react';
import './App.css';
import ProjectItem from './folder/Folder';
import ParticleBackground from './particulesBackground/ParticleBackground .tsx';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [showFocusIndicator, setShowFocusIndicator] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const focusIndicatorRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Vérifier immédiatement
    checkIfMobile();

    // Ajouter un écouteur pour vérifier lors du redimensionnement
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: ["FASST"],
      date: "Oct 2024 - Mars 2025",
      info: 'Sales path and Dashboard for AMUNDI distributors',
      stack: ['React', 'Node', 'GraphQL', 'Ramda', 'Tailwind', 'Radix-UI', 'Gitlab']
    },
    {
      id: 2,
      title: ["PATHFINDER"],
      date: "Jun - Nov 2024",
      info: 'Graph Visualization Tool for BNP Paribas',
      stack: ['React', 'React Router', 'D3.JS', 'TypeScript', 'Vite', 'Zustand', 'Gitlab']
    },
    {
      id: 3,
      title: ["LOAD AO"],
      date: "Oct 2023 - Fev 2025",
      info: 'Tool Managment for Sogeti',
      stack: ['React', 'TypeScript', 'MUI', 'TanStack', 'Puppeteer', 'Node', 'AzureDevOps']
    },
    {
      id: 4,
      title: ["ABLA"],
      date: " Mar 2023 - Dec 2024",
      info: 'AI transcription for repository Design',
      stack: ['React', 'React-DnD', 'Chart.JS', 'Chakra-UI', 'Github']
    }
  ];

  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const containerRect = scrollContainerRef.current.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      let closestId: number | null = null;
      let closestDistance = Infinity;
      const projectsVisibility: Record<number, { distance: number; element: Element }> = {};

      const projectElements = scrollContainerRef.current.querySelectorAll('.project-item');

      projectElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - containerCenter);
        const id = parseInt((element as HTMLElement).dataset.id || '0');

        projectsVisibility[id] = { distance, element };

        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = id;
        }
      });

      setActiveProjectId(closestId);

      Object.entries(projectsVisibility).forEach(([id, { element }]) => {
        const numId = parseInt(id);

        if (numId === closestId) {
          // Projet actif - 100% d'opacité
          (element as HTMLElement).style.opacity = "1";
          (element as HTMLElement).style.pointerEvents = "auto";
        } else if (closestId !== null && (numId === closestId - 1 || numId === closestId + 1)) {
          // Projets adjacents - 50% d'opacité
          (element as HTMLElement).style.opacity = "0.5";
          (element as HTMLElement).style.pointerEvents = "auto";
        } else {
          // Tous les autres projets - invisibles et non interactifs
          (element as HTMLElement).style.opacity = "0";
          (element as HTMLElement).style.pointerEvents = "none";
        }
      });
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Force running the handleScroll immediately and after a short delay
      handleScroll();
      setTimeout(handleScroll, 500);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToProject = (id: number) => {

    if (isMobile) {
      setActiveProjectId(id);
      return;
    }

    const element = document.querySelector(`.project-item[data-id="${id}"]`);
    if (element && scrollContainerRef.current) {
      const containerRect = scrollContainerRef.current.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      const scrollTop = scrollContainerRef.current.scrollTop + elementRect.top -
        containerRect.top - (containerRect.height / 2) + (elementRect.height / 2);

      scrollContainerRef.current.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });

      // Force update activeProjectId après scroll
      setTimeout(() => {
        setActiveProjectId(id);
        setShowFocusIndicator(true);
        setTimeout(() => {
          setShowFocusIndicator(false);
        }, 1000);
      }, 500);
    }
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-[100vh] w-full relative ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Section gauche - Présentation */}
      <div className="w-full md:w-1/2 h-screen flex items-center">
        <div className="flex flex-col w-full px-6 sm:px-12">
          {/* Section photo + texte avec responsive */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
            <div className="rounded-full overflow-hidden w-24 h-24 border-2 border-blue-300/50 shadow-lg flex-shrink-0 mb-4 sm:mb-0">
              <img
                src="/profil.jpg"
                alt="Jonathan de BOISVILLIERS"
                className="w-full h-full object-cover scale-x-[-1]"
              />
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-4xl font-bold tracking-tighter mb-1">
                <span className={`${darkMode ? 'text-green-400' : 'text-green-600'}`}>JONATHAN</span>
                <br />
                <span className="text-white">de BOISVILLIERS</span>
              </h1>

              <p className={`text-xl font-medium ${darkMode ? 'text-white/80' : 'text-black/80'}`}>
                Developer Fullstack JavaScript
              </p>
            </div>
          </div>

          <p className="text-base mb-8 opacity-75 max-w-md text-center sm:text-left">
            Plus de 3 ans d'expérience dans la création de solutions web
            performantes, évolutives et réactives.
          </p>

          {/* Stats avec flex-wrap */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-8 sm:gap-12 mb-8">
            <div className="text-center sm:text-left">
              <p className={`text-4xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>5+</p>
              <p className="text-sm opacity-75">Years of Experience</p>
            </div>
            <div className="text-center sm:text-left">
              <p className={`text-4xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>12+</p>
              <p className="text-sm opacity-75">Completed Projects</p>
            </div>
            <div className="text-center sm:text-left">
              <p className={`text-4xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>10k+</p>
              <p className="text-sm opacity-75">Downed Coffees</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section droite - Projets */}
      <div className="w-full md:w-1/2 h-screen relative">
        {/* Sur mobile: Vue de tous les projets sans défilement, avec un simple padding */}
        {isMobile ? (
          <div className="w-full py-8 px-4 flex flex-col gap-12">
            {projects.map(project => (
              <ProjectItem
                key={project.id}
                project={project}
                darkMode={darkMode}
                isActive={project.id === activeProjectId}
                onClick={() => setActiveProjectId(Number(project.id))}
                scrollToProject={scrollToProject}
              />
            ))}
          </div>
        ) : (
          // Sur desktop: Vue avec défilement
          <div className="w-full h-full flex flex-col relative">
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"></div>

            {showFocusIndicator && (
              <div
                ref={focusIndicatorRef}
                className={`absolute left-1/2 top-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full 
                ${darkMode ? 'bg-blue-500/30' : 'bg-yellow-500/30'} 
                z-50 pointer-events-none animate-pulse`}
                style={{
                  boxShadow: `0 0 20px 10px ${darkMode ? 'rgba(59, 130, 246, 0.4)' : 'rgba(234, 179, 8, 0.4)'}`
                }}
              ></div>
            )}

            <div
              ref={scrollContainerRef}
              className="pt-2 h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
              style={{ scrollPaddingTop: 'calc(50vh - 100px)', scrollPaddingBottom: 'calc(50vh - 100px)' }}
            >
              <div className="h-[30vh]"></div>

              {projects.map(project => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  darkMode={darkMode}
                  isActive={project.id === activeProjectId}
                  onClick={() => scrollToProject(Number(project.id))}
                  scrollToProject={scrollToProject}
                />
              ))}

              <div className="h-[30vh]"></div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>
          </div>
        )}
      </div>

      {/* Copyright flottant */}
      <div className="fixed bottom-8 left-8 text-xs opacity-60 z-20">
        © Jonathan
      </div>

      {/* Boutons de thème */}
      <div className="flex flex-col text-xs items-end fixed bottom-8 right-8 z-20">
        <button
          className={`${!darkMode ? 'text-black/40 hover:text-black' : 'text-white/40 hover:text-white'} 
            bg-none border-none 
            cursor-pointer 
            !py-[0.3rem] !px-0 
            text-right 
            font-inherit 
            transition-colors duration-200 
            [writing-mode:vertical-lr]
            rotate-180 
            !mb-4
          `}
          onClick={() => setDarkMode(true)}
        >
          DARK
        </button>
        <button
          className={`${!darkMode ? 'text-black/40 hover:text-black' : 'text-white/40 hover:text-white'} 
            bg-none border-none 
            cursor-pointer 
            !py-[0.3rem] !px-0 
            text-right 
            font-inherit 
            transition-colors duration-200 
            [writing-mode:vertical-lr]
            rotate-180 
            !mb-4
          `}
          onClick={() => setDarkMode(false)}
        >
          LIGHT
        </button>
      </div>
      <ParticleBackground darkMode={darkMode} />
    </div>
  )
}

export default App