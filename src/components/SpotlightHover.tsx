import { useRef, useState, ReactNode } from 'react';

interface SpotlightHoverProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const SpotlightHover = ({ children, className = '', onClick, disabled }: SpotlightHoverProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Spotlight glow — wider, liquid feel */}
      {isHovered && !disabled && (
        <div
          className="absolute pointer-events-none rounded-full blur-[3px]"
          style={{
            width: 120,
            height: 120,
            left: pos.x - 60,
            top: pos.y - 60,
            background: 'radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 45%, transparent 70%)',
            transition: 'left 0.05s ease-out, top 0.05s ease-out',
          }}
        />
      )}
      {children}
    </div>
  );
};

export default SpotlightHover;
