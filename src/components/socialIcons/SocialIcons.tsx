import React, { useState } from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

interface SocialIconsProps {
  darkMode: boolean;
}

const SocialIcons: React.FC<SocialIconsProps> = ({ darkMode }) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const email = 'j.deboisvilliers@gmail.com';

  const handleEmailCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  const iconClass = `w-6 h-6 cursor-pointer ${darkMode 
    ? 'text-white/80 hover:text-green-300' 
    : 'text-black/50 hover:text-blue-500'} transition-colors duration-300`;

  return (
    <div className="flex justify-center space-x-4 mt-2">
      {/* LinkedIn */}
      <a 
        href="https://www.linkedin.com/in/jdeboisvilliers/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:scale-110 transition-transform"
      >
        <Linkedin className={iconClass} size={12} />
      </a>

      {/* GitHub */}
      <a 
        href="https://github.com/Dumpinator" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:scale-110 transition-transform"
      >
        <Github className={iconClass} size={12} />
      </a>

      {/* Email */}
      <button 
        onClick={handleEmailCopy}
        className="hover:scale-110 transition-transform relative"
      >
        <Mail className={iconClass} size={12} />
        {emailCopied && (
            <span 
            className={`absolute -top-8 left-1/2 -translate-x-1/2 
            ${darkMode ? 'bg-green-600' : 'bg-blue-600'} 
            text-white text-xs px-2 py-1 rounded`}
          >
            Copié !
          </span>
        )}
      </button>
    </div>
  );
};

export default SocialIcons;