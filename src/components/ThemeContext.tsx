import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeColors {
  background: string;
  sidebar: string;
  card: string;
  cardAlt: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  input: string;
  button: string;
  border: string;
}

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false); // Default to light mode

  const toggleTheme = (): void => {
    setIsDark(!isDark);
  };

  const theme: ThemeContextType = {
    isDark,
    toggleTheme,
    colors: isDark ? {
      background: 'bg-gray-900',
      sidebar: 'bg-[#1e213a]',
      card: 'bg-gray-800',
      cardAlt: 'bg-gray-800/50',
      text: 'text-white',
      textSecondary: 'text-gray-400',
      textMuted: 'text-gray-500',
      input: 'bg-gray-700',
      button: 'bg-gray-900',
      border: 'border-gray-700'
    } : {
      background: 'bg-white',
      sidebar: 'bg-white',
      card: 'bg-white',
      cardAlt: 'bg-white',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textMuted: 'text-gray-500',
      input: 'bg-gray-50',
      button: 'bg-white',
      border: 'border-gray-200'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};