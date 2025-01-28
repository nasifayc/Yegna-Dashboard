import { createContext, useState, useContext, ReactNode } from "react";

interface ModalContextType {
  showSignIn: boolean;
  setShowSignIn: (state: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <ModalContext.Provider value={{ showSignIn, setShowSignIn }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
