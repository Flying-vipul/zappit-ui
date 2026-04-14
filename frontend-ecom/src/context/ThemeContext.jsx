import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(
        () => localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark((prev) => !prev);

    const muiTheme = useMemo(() => 
        createTheme({
            palette: {
                mode: isDark ? 'dark' : 'light',
                primary: {
                    main: '#6366f1', // Zappit indigo
                    light: '#818cf8',
                    dark: '#4f46e5',
                },
                secondary: {
                    main: '#8b5cf6', // Zappit violet
                    light: '#a78bfa',
                    dark: '#7c3aed',
                },
                ...(isDark && {
                    background: {
                        default: '#0a0a1a',
                        paper: '#111827',
                    },
                }),
                ...(!isDark && {
                    background: {
                        default: '#ffffff',
                        paper: '#ffffff',
                    },
                }),
            },
            typography: {
                fontFamily: '"Poppins", "Inter", sans-serif',
            },
            shape: {
                borderRadius: 12,
            },
            components: {
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            backgroundImage: 'none',
                        },
                    },
                },
            },
        }), [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            <MuiThemeProvider theme={muiTheme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
