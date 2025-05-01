import gsap from 'gsap';
import { useRef, useEffect } from 'react';

type ParticleBackgroundProps = {
    darkMode?: boolean;
    className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ darkMode }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const initParticles = () => {
        if (!containerRef.current) return;
        const particles = containerRef.current.querySelectorAll('.particle');

        // Créer un timeline principal
        const mainTl = gsap.timeline();

        // Masquer initialement toutes les particules
        gsap.set(particles, { 
            opacity: 0,
            visibility: "hidden" 
        });

        particles.forEach((particle, index) => {
            // Timeline individuel pour chaque particule
            const particleTl = gsap.timeline({ delay: index * 0.02 });

            // Configuration initiale
            gsap.set(particle, {
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left: Math.random() * window.innerWidth,
                top: Math.random() * window.innerHeight,
                visibility: "visible"
            });

            // Phase 1: Apparition
            particleTl.to(particle, {
                opacity: Math.random() * 0.5 + 0.1,
                duration: 0.3
            });

            // Phase 2: Animation de chute
            particleTl.to(particle, {
                y: window.innerHeight,
                duration: Math.random() * 10 + 10, 
                opacity: 0,
                repeat: -1,
                ease: 'none',
                onRepeat: () => {
                    gsap.set(particle, {
                        y: 0,
                        opacity: Math.random() * 0.5 + 0.1,
                    });
                }
            });

            // Ajouter le timeline de la particule au timeline principal
            mainTl.add(particleTl, index * 0.01);
        });
    };

    useEffect(() => {
        // Attendre que le rendu initial soit terminé
        const timer = setTimeout(() => {
            initParticles();
        }, 300);

        // Nettoyage
        return () => {
            clearTimeout(timer);
            if (containerRef.current) {
                const particles = containerRef.current.querySelectorAll('.particle');
                gsap.killTweensOf(particles);
            }
        };
    }, [darkMode]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {[...Array(100)].map((_, i) => (
                <div
                    key={i}
                    className={`particle absolute mix-blend-screen pointer-events-none ${
                        darkMode ? 'bg-blue-300' : 'bg-yellow-950'
                    }`}
                    style={{ opacity: 0 }}
                />
            ))}
        </div>
    );
};

export default ParticleBackground;