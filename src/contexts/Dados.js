import { createContext, useState } from "react";

export const DadosContext = createContext();
DadosContext.displayName = 'Dados';

export default function DadosProvider({ children }) {
    const [dados, setDados] = useState([]);

    return(
        <DadosContext.Provider
            value={{dados, setDados}}>
                {children}
            </DadosContext.Provider>
    )
}



