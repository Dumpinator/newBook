import { useEffect, useRef, useState } from 'react';
import './App.css';
import ProjectItem from './folder/Folder';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [showFocusIndicator, setShowFocusIndicator] = useState(false);
  const scrollContainerRef = useRef(null);
  const focusIndicatorRef = useRef(null);

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

      let closestId = null;
      let closestDistance = Infinity;
      const projectsVisibility = {};

      const projectElements = scrollContainerRef.current.querySelectorAll('.project-item');
      projectElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - containerCenter);
        const id = parseInt(element.dataset.id);

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
          element.style.opacity = "1";
          element.style.pointerEvents = "auto";
        } else if (numId === closestId - 1 || numId === closestId + 1) {
          // Projets adjacents - 50% d'opacité
          element.style.opacity = "0.5";
          element.style.pointerEvents = "auto";
        } else {
          // Tous les autres projets - invisibles et non interactifs
          element.style.opacity = "0";
          element.style.pointerEvents = "none";
        }
      });
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      setTimeout(handleScroll, 100);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToProject = (id) => {
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

      setTimeout(() => {
        setShowFocusIndicator(true);
        setTimeout(() => {
          setShowFocusIndicator(false);
        }, 1000);
      }, 500);
    }
  };

  return (
    <div className={`flex min-h-[100vh] w-full relative ${darkMode ? 'dark-theme' : 'light-theme'}`}>

      <div className="min-w-[30%] !p-4 h-[100vh] flex flex-col justify-between">

        <div className="mb-3">
          <h1 className={`text-4xl font-semibold tracking-tighter mb-2`}>Jonathan de BOISVILLIERS</h1>
          <p className={`text-xl font-semibold ${darkMode ? 'dark-theme' : 'light-theme'}`}>Developer Fullstack JavaScript</p>
        </div>

        <nav className="grow flex flex-col justify-center">
          <ul className='list-none'>
            <li className="mb-5">
              <a className="text-base transition-colors duration-200" href="#home">Home</a>
            </li>
            <li className="mb-5">
              <a className="no-underline text-base transition-colors duration-200" href="#info">Info</a>
            </li>
            <li className="mb-5">
              <a className="no-underline text-base transition-colors duration-200" href="#contact">Contact</a>
            </li>
            <li className="mb-5">
              <a className="no-underline text-base transition-colors duration-200" href="#faq">FAQ</a>
            </li>
            <li className="mb-5">
              <a className="no-underline text-base transition-colors duration-200" href="#copycat">Copycat</a>
            </li>
          </ul>
        </nav>

        <div className="copyright text-xs mb-4">
          © Jonathan
        </div>
      </div>

      <div className={`w-full ml-[30%] flex flex-col p-4 items-end bg-amber-950`}>
        {/* Indicateurs visuels pour les zones d'entrée/sortie */}
        <div className="w-full flex flex-col relative h-[96vh]">
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
            <div className="h-[40vh]"></div>

            {projects.map(project => (
              <ProjectItem
                key={project.id}
                project={project}
                darkMode={darkMode}
                isActive={project.id === activeProjectId}
                onClick={() => scrollToProject(project.id)}
                scrollToProject={scrollToProject}
              />
            ))}

            <div className="h-[40vh]"></div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>

      <div className="flex flex-col text-xs items-end fixed bottom-8 right-8">
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
    </div>
  )
}

export default App