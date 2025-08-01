// src/context/AuthContext.tsx
"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

/**
 * Defines the shape of the data that will be available through the AuthContext.
 */
interface AuthContextType {
  isAuthenticated: boolean; // Is the user currently logged in?
  login: (token: string) => void; // Function to handle user login.
  logout: () => void; // Function to handle user logout.
  isLoading: boolean; // Is the authentication status currently being checked?
}

// Create the context with an initial undefined value.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * The AuthProvider component is a wrapper that provides authentication state
 * and functions to all child components.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State to hold whether the user is authenticated or not.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State to track the initial loading process of checking the auth token.
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // This effect runs once when the application first loads.
  // It checks for an existing token in localStorage to maintain the user's session.
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
    // Finished the initial check, so set loading to false.
    setIsLoading(false);
  }, []); // The empty dependency array ensures this runs only once on mount.

  /**
   * Handles the login process.
   * @param token The JWT received from the backend upon successful login.
   */
  const login = (token: string) => {
    localStorage.setItem("authToken", token); // Store the token in the browser.
    setIsAuthenticated(true); // Update the global state.
    router.push("/"); // Redirect the user to the home page.
  };

  /**
   * Handles the logout process.
   */
  const logout = () => {
    localStorage.removeItem("authToken"); // Remove the token from the browser.
    setIsAuthenticated(false); // Update the global state.
    router.push("/login"); // Redirect the user to the login page.
  };

  // Provide the state and functions to all children of this provider.
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * A custom hook for easily accessing the AuthContext from any component.
 * It also handles the error case where the hook is used outside of an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
