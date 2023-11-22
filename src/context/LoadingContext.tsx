import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the context shape
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Create the context with a default value
const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

// Context Provider Component Props Type
interface LoadingProviderProps {
  children: ReactNode;
}

// Context Provider Component
export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook for using the loading context
export const useLoading = () => useContext(LoadingContext);
