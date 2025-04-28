import React, { useRef, useState } from 'react';
import Badge from '../badge/Badge';

type Project = {
  id: string | number;
  title: string[];
  date: string;
  stack: string[];
  info: string;
}

type ProjectProps = {
  project: Project;
  darkMode?: boolean;
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  scrollToProject: (projectId: number) => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
  showFocusIndicator?: boolean;
  className?: string;
}

const ProjectItem: React.FC<ProjectProps> = ({ project, darkMode, isActive, onClick, scrollToProject }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const autoScrollTimerRef = useRef<number | null>(null);

  // Gérer le hover et les timers
  const handleMouseEnter = () => {
    setHovered(true);

    if (isActive) {
      timerRef.current = window.setTimeout(() => {
        setShowDetails(true);
      }, 300);
    }
    // Si ce n'est pas le projet actif, configurer le timer pour le défilement automatique
    else {
      autoScrollTimerRef.current = window.setTimeout(() => {
        scrollToProject(Number(project?.id));
      }, 800);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setShowDetails(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current);
    }
  };

  if (!project) {
    return null;
  }

  return (
    <div
      data-id={project.id}
      className={`project-item w-fit mx-auto mb-16 cursor-pointer snap-center transition-all duration-500 ${hovered && isActive ? '-translate-x-2.5' : ''
        } ${isActive ? 'scale-105' : 'scale-95'
        }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="mb-2">
        {project.title.map((line, index) => (
          <h2 className='text-6xl/14 font-normal tracking-tighter' key={index}>{line}</h2>
        ))}
      </div>

      <p className="project-date !ml-1 text-sm">
        {project.date}
      </p>

      <div className="!ml-1 !mt-2 text-sm">
        <ul className='flex flex-wrap gap-1 max-w-2xs'>
          {project.stack.map((tag, index) => (
            <li key={index}>
              <Badge className={`text-${darkMode ? 'blue' : 'yellow'}-300/90`} darkMode={darkMode}>{tag}</Badge>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${showDetails && isActive ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'
          }`}
      >
        <p className="project-info !ml-1 text-sm mb-2">
          {project.info}
        </p>
      </div>
    </div>
  );
};

export default ProjectItem;