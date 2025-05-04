import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated, SpringValue } from '@react-spring/web';

type CustomSpanProps = React.ComponentProps<typeof animated.span> & {
    style?: {
        whiteSpace?: string;
        opacity?: SpringValue<number>;
    };
};

const DecryptedText: React.FC<CustomSpanProps & {
    text?: string;
    duration?: number;
    characters?: string;
    className?: string;
    parentClassName?: string;
    direction?: 'left-to-right' | 'right-to-left' | 'random';
}> = ({
    text = '',
    duration = 2000,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,./<>?',
    className = '',
    parentClassName = '',
    direction = 'left-to-right',
}) => {
        // Diviser le texte en mots plutôt qu'en caractères individuels
        const words = text.split(' ');
        const charsByWord = words.map(word => word.split(''));

        // État pour suivre quels mots sont déchiffrés
        const [decryptedWords, setDecryptedWords] = useState(Array(words.length).fill(false));

        // État pour stocker le texte affiché pour chaque mot
        const [currentWords, setCurrentWords] = useState(words.map(word =>
            Array(word.length).fill('').map(() => getRandomChar())
        ));

        const animationRef = useRef<number | null>(null);
        const startTimeRef = useRef<number | null>(null);

        // Animation spring pour le conteneur
        const props = useSpring({
            from: { opacity: 0 },
            to: { opacity: 1 },
            config: { duration: 500 }
        });

        function getRandomChar() {
            return characters.charAt(Math.floor(Math.random() * characters.length));
        }

        // Déterminer l'ordre de révélation des mots
        const getDecryptionOrder = () => {
            const indices = words.map((_, i) => i);

            if (direction === 'right-to-left') {
                return indices.reverse();
            } else if (direction === 'random') {
                return indices.sort(() => Math.random() - 0.5);
            }

            // Par défaut: left-to-right
            return indices;
        };

        const wordDecryptionOrder = useRef(getDecryptionOrder()).current;

        // Fonction principale d'animation
        const animate = (timestamp: number) => {
            if (startTimeRef.current === null) startTimeRef.current = timestamp;
            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);

            // Déterminer combien de mots devraient être déchiffrés à ce stade
            const totalWords = wordDecryptionOrder.length;
            const wordsToDecrypt = Math.floor(progress * totalWords * 1.2); // 1.2 pour créer un chevauchement

            // Mettre à jour les mots déchiffrés
            const newDecryptedWords = [...decryptedWords];
            for (let i = 0; i < wordsToDecrypt && i < wordDecryptionOrder.length; i++) {
                const wordIndex = wordDecryptionOrder[i];
                newDecryptedWords[wordIndex] = true;
            }
            setDecryptedWords(newDecryptedWords);

            // Mettre à jour le texte affiché pour chaque mot
            setCurrentWords(prev => {
                return prev.map((chars, wordIndex) => {
                    // Si le mot est déchiffré, retourner les caractères originaux
                    if (newDecryptedWords[wordIndex]) {
                        return charsByWord[wordIndex];
                    }

                    // Sinon, caractères aléatoires
                    return chars.map(() => getRandomChar());
                });
            });

            // Continuer l'animation si elle n'est pas terminée
            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                // S'assurer que tous les mots sont déchiffrés à la fin
                setDecryptedWords(Array(words.length).fill(true));
                setCurrentWords([...charsByWord]);
            }
        };

        // Démarrer l'animation au montage
        useEffect(() => {
            animationRef.current = requestAnimationFrame(animate);
            return () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            };
        }, []);

        return (
            <animated.span
                {...({
                    className: `decrypted-text-container ${parentClassName}`,
                    style: {
                        ...props,
                        whiteSpace: 'normal'
                    }
                } as any)}
            >
                {currentWords.map((chars, wordIndex) => (
                    <React.Fragment key={wordIndex}>
                        <span
                            className={`word ${decryptedWords[wordIndex] ? className : ''}`}
                            style={{
                                display: 'inline-block',
                                fontFamily: 'monospace',
                                transition: 'color 0.2s',
                                marginRight: '0.25em' // Espacement entre les mots
                            }}
                        >
                            {chars.map((char, charIndex) => (
                                <span
                                    key={`${wordIndex}-${charIndex}`}
                                    style={{
                                        display: 'inline-block'
                                    }}
                                >
                                    {char}
                                </span>
                            ))}
                        </span>
                    </React.Fragment>
                ))}
            </animated.span>
        );
    };

export default DecryptedText;