import { createContext, useContext, useState } from "react";
const DataContext = createContext<Data | undefined>(undefined);

interface Data {
  data: number;
  setData: (value: number) => void;
  searchTerm: string;
  setSearch: (value: string) => void;
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [num, setnum] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const setData = (value: number) => {
    setnum(value);
  };
  const setSearch = (value: string) => {
    setSearchTerm(value);
  };
  return (
    <DataContext.Provider value={{ data: num, setData, searchTerm, setSearch }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
