"use client";

import { createContext, useContext }
from "react";

const ThemeContext =
  createContext({
    darkMode: false,
  });

export function ERPThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ThemeContext.Provider
      value={{
        darkMode: false,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useERPTheme() {
  return useContext(ThemeContext);
}
