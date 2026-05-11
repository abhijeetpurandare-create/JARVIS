import { createContext, useContext, useState, ReactNode } from 'react';

type LayoutType = 'modern' | 'classic';

interface LayoutContextValue {
  layout: LayoutType;
  toggleLayout: () => void;
}

const LayoutContext = createContext<LayoutContextValue>({
  layout: 'modern',
  toggleLayout: () => {},
});

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [layout, setLayout] = useState<LayoutType>(
    () => (localStorage.getItem('jarvis-layout') as LayoutType) || 'modern'
  );

  const toggleLayout = () => {
    const next = layout === 'modern' ? 'classic' : 'modern';
    setLayout(next);
    localStorage.setItem('jarvis-layout', next);
  };

  return (
    <LayoutContext.Provider value={{ layout, toggleLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};
