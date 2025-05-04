import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  darkMode?: boolean;
  isActive?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  darkMode = true,
}) => {

  const textColorMatch = className.match(/text-(\w+)-(\d+)/);
  const color = textColorMatch && textColorMatch[1]
  const textColorClass = textColorMatch && textColorMatch[0]
    ? textColorMatch[0]
    : (darkMode ? 'text-white/90' : 'text-black/90');

  const neonColor = textColorMatch
    ? `before:border-${textColorMatch[1]}-${textColorMatch[2]}/30 hover:before:border-${textColorMatch[1]}-${textColorMatch[2]}/50`
    : 'before:border-blue-300/30 hover:before:border-blue-300/50';

  return (
    <div
      className={`
        relative
        flex justify-center items-center
        m-0.5
        px-2
        pb-0.5
        text-xs
        font-medium
        rounded full
        ${darkMode ? `bg-${color}-900` : `bg-${color}-200`}
        border
        border-transparent
        before:absolute
        before:-inset-0.5
        before:rounded-full
        before:border-2
        before:animate-border-pulse
        transition-all
        duration-300
        ${textColorClass}
        ${neonColor}
      `}
    >
      {children}
    </div>
  );
};

export default Badge;