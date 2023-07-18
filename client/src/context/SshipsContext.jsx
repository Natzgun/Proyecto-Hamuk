import { createContext, useState, useContext } from "react";
import { createBecaRequest, getBecasRequest } from "../api/sships";

export const ScholarshipContext = createContext();
export const useSships = () => {
  const context = useContext(ScholarshipContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export function SshipProvider({ children }) {
  const [becas, setBeca] = useState([]);

  const createBeca = async (beca) => {
    const res = await createBecaRequest(beca);
    console.log(res)
  }

  const getBecas = async () => {
    try {
      const res = await getBecasRequest();
      setBeca(res.data);
      console.log(res);      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ScholarshipContext.Provider value={{
      becas,
      createBeca,
      getBecas,
    }}>
      {children}
    </ScholarshipContext.Provider>
  );
}