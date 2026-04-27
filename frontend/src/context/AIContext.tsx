import { createContext, useContext, useState, ReactNode } from "react";

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AIProject {
  images: File[];
  theme: string;
  product: string;
  generatedImages: string[];
  selectedImageIndex: number;
  delivery: "email" | "physical";
  customer: CustomerInfo;
}

interface AIContextType {
  project: AIProject;
  setImages: (images: File[]) => void;
  setTheme: (theme: string) => void;
  setProduct: (product: string) => void;
  setGeneratedImages: (urls: string[]) => void;
  setSelectedImageIndex: (index: number) => void;
  setDelivery: (mode: "email" | "physical") => void;
  setCustomer: (info: CustomerInfo) => void;
  reset: () => void;
}

const defaultProject: AIProject = {
  images: [],
  theme: "",
  product: "",
  generatedImages: [],
  selectedImageIndex: 0,
  delivery: "email",
  customer: { firstName: "", lastName: "", email: "", phone: "" },
};

const AIContext = createContext<AIContextType | null>(null);

export function AIProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<AIProject>(defaultProject);

  const setImages = (images: File[]) => setProject((p) => ({ ...p, images }));
  const setTheme = (theme: string) => setProject((p) => ({ ...p, theme }));
  const setProduct = (product: string) => setProject((p) => ({ ...p, product }));
  const setGeneratedImages = (generatedImages: string[]) => setProject((p) => ({ ...p, generatedImages }));
  const setSelectedImageIndex = (selectedImageIndex: number) => setProject((p) => ({ ...p, selectedImageIndex }));
  const setDelivery = (delivery: "email" | "physical") => setProject((p) => ({ ...p, delivery }));
  const setCustomer = (customer: CustomerInfo) => setProject((p) => ({ ...p, customer }));
  const reset = () => setProject(defaultProject);

  return (
    <AIContext.Provider
      value={{ project, setImages, setTheme, setProduct, setGeneratedImages, setSelectedImageIndex, setDelivery, setCustomer, reset }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const ctx = useContext(AIContext);
  if (!ctx) throw new Error("useAI must be used inside AIProvider");
  return ctx;
}
